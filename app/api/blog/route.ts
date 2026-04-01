import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const OVERRIDES_FILE = path.join(process.cwd(), 'data', 'blog-overrides.json');

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';

const FALLBACK_POSTS = [
    {
        id: 1, title: '차수학 엄궁 캠퍼스 개별 관리 프로그램 안내',
        url: 'https://blog.naver.com/snaker8', category: '학원 소식',
        date: '2026.03.20', views: '1,000+', isHot: true,
        image: FALLBACK_IMAGE, author: '차수학 원장'
    },
    {
        id: 2, title: '2026학년도 수능 수학 출제 경향 분석',
        url: 'https://blog.naver.com/snaker8', category: '입시정보',
        date: '2026.03.15', views: '500+', isHot: false,
        image: FALLBACK_IMAGE, author: '차수학 원장'
    },
];

export async function GET() {
    try {
        // Fetch Overrides first
        let overrides: any = {};
        try {
            const overridesData = await fs.readFile(OVERRIDES_FILE, 'utf-8');
            overrides = JSON.parse(overridesData);
        } catch (e) {
            // No overrides yet
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('https://rss.blog.naver.com/snaker8.xml', {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status}`);
        }

        const xmlText = await response.text();

        // Simple XML parsing using Regex
        const items: any[] = [];
        const itemMatches = xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g);

        for (const match of itemMatches) {
            const itemXml = match[1];

            const title = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ||
                itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1];

            const link = itemXml.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/)?.[1] ||
                itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1];

            const category = itemXml.match(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/)?.[1] ||
                itemXml.match(/<category>([\s\S]*?)<\/category>/)?.[1];

            const pubDateStr = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];
            const description = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ||
                itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1];

            const url = link?.trim() || '';
            const override = overrides[url];

            if (override?.isHidden) continue;

            // Extract image from description and proxy it
            const imageMatch = description?.match(/<img[^>]+src="([^"]+)"/);
            let image = FALLBACK_IMAGE;
            if (imageMatch && imageMatch[1]) {
                const originalUrl = imageMatch[1];
                // Proxy Naver images to avoid referrer blocking
                if (originalUrl.includes('pstatic.net') || originalUrl.includes('naver.net') || originalUrl.includes('blogfiles')) {
                    image = `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
                } else {
                    image = originalUrl;
                }
            }

            // Format date
            let formattedDate = '';
            if (pubDateStr) {
                const date = new Date(pubDateStr);
                formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
            }

            items.push({
                id: items.length + 1,
                title: (override?.title || title?.trim()),
                url: url,
                category: override?.category || category || '입시정보',
                date: formattedDate,
                views: '1,000+',
                isHot: items.length === 0,
                image: image,
                author: '차수학 원장'
            });
        }

        if (items.length === 0) {
            console.warn('RSS parsed but no items found, returning fallback');
            return NextResponse.json(FALLBACK_POSTS);
        }

        return NextResponse.json(items.slice(0, 10));
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        // Return fallback posts instead of error
        return NextResponse.json(FALLBACK_POSTS);
    }
}

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const OVERRIDES_FILE = path.join(process.cwd(), 'data', 'blog-overrides.json');

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

        const response = await fetch('https://rss.blog.naver.com/snaker8.xml', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch RSS');
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

            // Extract image from description
            const imageMatch = description?.match(/<img src="([\s\S]*?)"/);
            const image = imageMatch ? imageMatch[1] : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';

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
                category: override?.category || category || '입학정보',
                date: formattedDate,
                views: '1,000+',
                isHot: items.length === 0,
                image: image,
                author: '차수학 원장'
            });
        }

        return NextResponse.json(items.slice(0, 10));
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to sync blog' }, { status: 500 });
    }
}

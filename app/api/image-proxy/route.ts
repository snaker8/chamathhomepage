import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
        return new NextResponse('Missing url parameter', { status: 400 });
    }

    try {
        const imageResponse = await fetch(url, {
            headers: {
                'Referer': 'https://blog.naver.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        if (!imageResponse.ok) {
            throw new Error(`Image fetch failed: ${imageResponse.status}`);
        }

        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        const buffer = await imageResponse.arrayBuffer();

        return new NextResponse(Buffer.from(buffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
        });
    } catch (error) {
        // Return a 1x1 transparent pixel as fallback
        const pixel = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            'base64'
        );
        return new NextResponse(pixel, {
            headers: { 'Content-Type': 'image/png' },
        });
    }
}

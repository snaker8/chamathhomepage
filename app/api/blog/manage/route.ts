import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const OVERRIDES_FILE = path.join(DATA_DIR, 'blog-overrides.json');

async function ensureDataFile() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        try {
            await fs.access(OVERRIDES_FILE);
        } catch {
            await fs.writeFile(OVERRIDES_FILE, JSON.stringify({}, null, 2));
        }
    } catch (error) {
        console.error('Error ensuring data file:', error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, title, category, isHidden } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        await ensureDataFile();

        const data = await fs.readFile(OVERRIDES_FILE, 'utf-8');
        const overrides = JSON.parse(data);

        overrides[url] = {
            title,
            category,
            isHidden,
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(OVERRIDES_FILE, JSON.stringify(overrides, null, 2));

        return NextResponse.json({ success: true, overrides: overrides[url] });
    } catch (error) {
        console.error('Update Override Error:', error);
        return NextResponse.json({ error: 'Failed to update override' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await ensureDataFile();
        const data = await fs.readFile(OVERRIDES_FILE, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({});
    }
}

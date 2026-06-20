import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // process.cwd() in Next.js points to the root of the next project (app directory)
    const filePath = path.join(process.cwd(), '..', 'data', 'ozon', 'reviews_and_questions.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading reviews_and_questions.json:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}

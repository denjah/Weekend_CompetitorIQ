import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), '..', 'data', 'ozon', 'insights.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({}, { status: 200 });
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading insights.json:', error);
    return NextResponse.json({}, { status: 500 });
  }
}

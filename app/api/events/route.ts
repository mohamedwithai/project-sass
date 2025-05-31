import { NextResponse } from 'next/server';
import { getUniqueEvents } from '@/lib/googleSheets';

export async function GET() {
  try {
    const events = await getUniqueEvents();
    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error in GET /api/events:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch events',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
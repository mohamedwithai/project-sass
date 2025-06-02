import { NextResponse } from 'next/server';
import { getUniqueDonarTypes } from '@/lib/googleSheets';

export async function GET() {
  try {
    const types = await getUniqueDonarTypes();
    return NextResponse.json(types);
  } catch (error: any) {
    console.error('Error in GET /api/donar-types:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch donar types',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
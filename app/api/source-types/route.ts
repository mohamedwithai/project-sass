import { NextResponse } from 'next/server';
import { getUniqueSourceTypes } from '@/lib/googleSheets';

export async function GET() {
  try {
    const types = await getUniqueSourceTypes();
    return NextResponse.json(types);
  } catch (error: any) {
    console.error('Error in GET /api/source-types:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch source types',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { getUniqueAccountTypes } from '@/lib/googleSheets';

export async function GET() {
  try {
    const types = await getUniqueAccountTypes();
    return NextResponse.json(types);
  } catch (error: any) {
    console.error('Error in GET /api/account-types:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch account types',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
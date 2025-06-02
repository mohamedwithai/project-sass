import { NextResponse } from 'next/server';
import { getUniqueAccountCategories } from '@/lib/googleSheets';

export async function GET() {
  try {
    const categories = await getUniqueAccountCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error in GET /api/account-categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch account categories',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
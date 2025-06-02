import { NextResponse } from 'next/server';
import { getUniqueLedgerCategories } from '@/lib/googleSheets';

export async function GET() {
  try {
    const categories = await getUniqueLedgerCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error in GET /api/ledger-categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch ledger categories',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
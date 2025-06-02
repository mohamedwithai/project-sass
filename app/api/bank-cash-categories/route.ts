import { NextResponse } from 'next/server';
import { getUniqueBankCashCategories } from '@/lib/googleSheets';

export async function GET() {
  try {
    const categories = await getUniqueBankCashCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error in GET /api/bank-cash-categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch bank/cash categories',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { getReceipts, addReceipt, updateReceipt, deleteReceipt } from '@/lib/googleSheets';

// GET /api/receipts
export async function GET() {
  try {
    const receipts = await getReceipts();
    if (!receipts || !Array.isArray(receipts)) {
      throw new Error('Invalid response format from Google Sheets');
    }
    return NextResponse.json(receipts);
  } catch (error: any) {
    console.error('Error in GET /api/receipts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch receipts',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// POST /api/receipts
export async function POST(request: Request) {
  try {
    const receipt = await request.json();
    
    // Validate required fields
    const requiredFields = ['date', 'bankCashCategory', 'accountCategory', 'amount'];
    const missingFields = requiredFields.filter(field => !receipt[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          fields: missingFields 
        },
        { status: 400 }
      );
    }

    const newReceipt = await addReceipt(receipt);
    return NextResponse.json(newReceipt);
  } catch (error: any) {
    console.error('Error in POST /api/receipts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to add receipt',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// PUT /api/receipts/:id
export async function PUT(request: Request) {
  try {
    const { slNo, ...receipt } = await request.json();
    
    if (!slNo) {
      return NextResponse.json(
        { error: 'Receipt ID (slNo) is required' },
        { status: 400 }
      );
    }

    const updatedReceipt = await updateReceipt(slNo, receipt);
    return NextResponse.json(updatedReceipt);
  } catch (error: any) {
    console.error('Error in PUT /api/receipts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update receipt',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/receipts/:id
export async function DELETE(request: Request) {
  try {
    const { slNo } = await request.json();
    
    if (!slNo) {
      return NextResponse.json(
        { error: 'Receipt ID (slNo) is required' },
        { status: 400 }
      );
    }

    await deleteReceipt(slNo);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in DELETE /api/receipts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete receipt',
        details: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
} 
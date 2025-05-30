import { google } from 'googleapis';

if (!process.env.GOOGLE_CLIENT_EMAIL || 
    !process.env.GOOGLE_PRIVATE_KEY || 
    !process.env.GOOGLE_PRIVATE_KEY_ID ||
    !process.env.GOOGLE_SHEET_ID) {
  throw new Error('Required Google Sheets environment variables are missing');
}

// Configure Google Sheets Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID || '',
    client_id: '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_CLIENT_EMAIL)}`,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Function to get all receipts
export async function getReceipts() {
  try {
    const range = 'Receipts!A2:K'; // Assuming headers are in row 1
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    const rows = response.data.values || [];
    return rows.map((row) => ({
      slNo: parseInt(row[0]) || 0,
      date: row[1] || '',
      bankCashCategory: row[2] || '',
      accountCategory: row[3] || '',
      ledgerCategory: row[4] || '',
      Account_Type: row[5] || '',
      events: row[6] || '',
      donar: row[7] || '',
      description: row[8] || '',
      source: row[9] || '',
      amount: row[10] ? row[10].toString() : '0.00',
    }));
  } catch (error) {
    console.error('Error fetching receipts:', error);
    throw error;
  }
}

// Function to add a new receipt
export async function addReceipt(receipt: {
  date: string;
  bankCashCategory: string;
  accountCategory: string;
  ledgerCategory: string;
  Account_Type: string;
  events: string;
  donar: string;
  description: string;
  source: string;
  amount: string;
}) {
  try {
    const range = 'Receipts!A:K';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Receipts!A:A',
    });

    // Calculate next Sl No
    const lastRow = response.data.values?.length || 1;
    const slNo = lastRow;

    const values = [
      [
        slNo,
        receipt.date,
        receipt.bankCashCategory,
        receipt.accountCategory,
        receipt.ledgerCategory,
        receipt.Account_Type,
        receipt.events,
        receipt.donar,
        receipt.description,
        receipt.source,
        parseFloat(receipt.amount || '0').toFixed(2),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return { ...receipt, slNo };
  } catch (error) {
    console.error('Error adding receipt:', error);
    throw error;
  }
}

// Function to update a receipt
export async function updateReceipt(
  slNo: number,
  receipt: {
    date: string;
    bankCashCategory: string;
    accountCategory: string;
    ledgerCategory: string;
    Account_Type: string;
    events: string;
    donar: string;
    description: string;
    source: string;
    amount: string;
  }
) {
  try {
    const row = slNo + 1; // Add 1 to account for header row
    const range = `Receipts!A${row}:K${row}`;

    const values = [
      [
        slNo,
        receipt.date,
        receipt.bankCashCategory,
        receipt.accountCategory,
        receipt.ledgerCategory,
        receipt.Account_Type,
        receipt.events,
        receipt.donar,
        receipt.description,
        receipt.source,
        receipt.amount,
      ],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return { ...receipt, slNo };
  } catch (error) {
    console.error('Error updating receipt:', error);
    throw error;
  }
}

// Function to delete a receipt
export async function deleteReceipt(slNo: number) {
  try {
    const row = slNo + 1; // Add 1 to account for header row
    const range = `Receipts!A${row}:K${row}`;

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range,
    });

    // Optionally, you might want to reorder the remaining rows to maintain sequential slNo
    return true;
  } catch (error) {
    console.error('Error deleting receipt:', error);
    throw error;
  }
} 
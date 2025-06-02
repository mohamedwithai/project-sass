import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

// Helper function to read settings
async function readSettings() {
  try {
    const data = await fs.readFile(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    throw error;
  }
}

// Helper function to write settings
async function writeSettings(settings: any) {
  try {
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing settings:', error);
    throw error;
  }
}

// GET endpoint to fetch all settings
export async function GET() {
  try {
    const settings = await readSettings();
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch settings', details: error?.message },
      { status: 500 }
    );
  }
}

// POST endpoint to update settings
export async function POST(request: Request) {
  try {
    const newSettings = await request.json();
    await writeSettings(newSettings);
    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update settings', details: error?.message },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update specific category
export async function PATCH(request: Request) {
  try {
    const { category, options } = await request.json();
    const settings = await readSettings();
    
    if (!(category in settings)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    settings[category] = options;
    await writeSettings(settings);
    
    return NextResponse.json({ message: 'Category updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update category', details: error?.message },
      { status: 500 }
    );
  }
} 
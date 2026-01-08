import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Google Apps Script URL
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbw4We2ZjXEY1raav_VXx-4PP3RoPTmdABvjocDYUs4gY6ZjfqlKY-RpF3rNZw5QqKOx/exec';

    // Send to Google Apps Script
    const googleScriptResponse = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testType: 'priority_circle',
        ...data
      })
    });

    const result = await googleScriptResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Data submitted successfully',
      googleScriptResult: result
    });

  } catch (error) {
    console.error('Error in priority-circle API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

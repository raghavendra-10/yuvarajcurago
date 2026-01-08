import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Google Apps Script URL
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyfRm78TCMp4bKW31ZHD-LKnwjUEeUS88paX_zyvx5QE8rGx-hEym3sXjhyS3fIDXCr/exec';

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

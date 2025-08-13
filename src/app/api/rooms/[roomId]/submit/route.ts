// File: app/api/rooms/[roomId]/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getRoomData } from '../../../../events/mindmaze/utils/roomData';

interface SubmissionRequest {
  code: string;
  language: string;
  stdin?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomId = params.roomId;
    console.log('Submit for room ID:', roomId); // Debug log
    
    const roomData = getRoomData(roomId);
    
    if (!roomData) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    const body: SubmissionRequest = await request.json();
    const { code, language } = body;

    // Prepare Piston API request
    const pistonRequest = {
      language: language,
      version: '*',
      files: [
        {
          name: 'main',
          content: code
        }
      ],
      stdin: roomData.testInput,
      compile_timeout: 10000,
      run_timeout: 5000,
      compile_memory_limit: -1,
      run_memory_limit: -1
    };

    // Call Piston API
    const pistonResponse = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pistonRequest)
    });

    if (!pistonResponse.ok) {
      throw new Error('Piston API request failed');
    }

    const pistonResult = await pistonResponse.json();

    // Check if execution was successful
    if (pistonResult.run.stderr) {
      return NextResponse.json({
        success: false,
        error: pistonResult.run.stderr,
        stdout: pistonResult.run.stdout || '',
        verdict: 'Runtime Error'
      });
    }

    // Compare output with expected output
    const userOutput = pistonResult.run.stdout?.trim() || '';
    const expectedOutput = roomData.expectedOutput.trim();
    
    const isCorrect = userOutput === expectedOutput;

    return NextResponse.json({
      success: true,
      verdict: isCorrect ? 'Accepted' : 'Wrong Answer',
      userOutput,
      expectedOutput,
      executionTime: pistonResult.run.runtime || 0,
      isCorrect,
      testsPassed: isCorrect ? 'All' : '0/' + roomData.testInput.split('\n').filter(line => line.trim()).length
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Submission processing failed' },
      { status: 500 }
    );
  }
}
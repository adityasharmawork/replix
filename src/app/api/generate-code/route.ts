import { NextRequest, NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResult,
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

const MODEL_NAME = 'gemini-2.0-flash';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const enhancedPrompt = `Generate code based on this request: "${prompt}". 
      Please provide only the code with minimal explanations. 
      Include proper formatting, syntax, and error handling where appropriate.`;


    const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result: GenerateContentResult = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let code = await response.text();

    code = code.replace(/```[\w]*\n/g, '').replace(/```$/g, '');

    return NextResponse.json({ code }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating code:', error);

    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      details: error.details ?? 'No additional details',
    };
    console.error('Error details:', JSON.stringify(errorDetails, null, 2));

    return NextResponse.json(
      {
        error: 'Failed to generate code. Please try again.',
        // only include the raw details on dev
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  GenerateContentResult,
} from '@google/generative-ai';

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
      Please provide only the code with no explanations. 
      Include proper formatting, syntax, and error handling where appropriate.`;

    // List of environment variables to check for API keys
    const envVarNames = [
      'GEMINI_API_KEY',
      'GEMINI_API_KEY_NEW',
      'GEMINI_API_KEY_1',
      'GEMINI_API_KEY_2',
      'GEMINI_API_KEY_3',
      'GEMINI_API_KEY_4',
      'GEMINI_API_KEY_5',
    ];

    // Collect all available keys
    const apiKeys = envVarNames
      .map((name) => process.env[name])
      .filter((key): key is string => !!key);

    if (apiKeys.length === 0) {
      throw new Error('No GEMINI_API_KEY environment variables are set');
    }

    let lastError: any = null;

    // Try each key until one works or all fail
    for (const apiKey of apiKeys) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result: GenerateContentResult = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        let code = await response.text();

        code = code.replace(/```[\w]*\n/g, '').replace(/```$/g, '');

        // If we get here, it succeeded
        return NextResponse.json({ code }, { status: 200 });
      } catch (error: any) {
        console.error(`Error with API key (ending in ...${apiKey.slice(-4)}):`, error.message);
        lastError = error;

        // Check if it's a quota error (429 or specific message)
        const isQuotaError =
          error.status === 429 ||
          (error.message && error.message.toLowerCase().includes('quota'));

        if (isQuotaError) {
          console.warn('Quota exceeded for this key, trying next one...');
          continue; // Try next key
        } else {
          // If it's not a quota error (e.g., bad request), fail immediately
          throw error;
        }
      }
    }

    // If we've exhausted all keys and still have an error
    if (lastError) {
      console.error('All API keys exhausted or failed.');

      const isQuotaError =
        lastError.status === 429 ||
        (lastError.message && lastError.message.toLowerCase().includes('quota'));

      if (isQuotaError) {
        return NextResponse.json(
          { error: 'All AI quotas exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      throw lastError;
    }

    throw new Error('Unknown error during generation');

  } catch (error: any) {
    console.error('Error generating code:', error);

    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      details: error.details ?? 'No additional details',
    };

    return NextResponse.json(
      {
        error: 'Failed to generate code. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      },
      { status: 500 }
    );
  }
}

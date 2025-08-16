import { NextResponse } from 'next/server';

// This function now lives securely on the server and is not exported.
// It uses the secure, non-prefixed environment variables.
async function getTestCasesPassedCount(problemData: any): Promise<string | null> {
    const apiKeys = [
        process.env.GEMINI_API_KEY_1,
        process.env.GEMINI_API_KEY_2,
        process.env.GEMINI_API_KEY_3,
        process.env.GEMINI_API_KEY_4,
        process.env.GEMINI_API_KEY_5,
    ].filter((key): key is string => !!key);

    if (apiKeys.length === 0) {
        console.error("No Gemini API keys are configured on the server.");
        return null;
    }

    const { title, actualOutput, expectedOutput, testCasesCount } = problemData;
    const prompt = `You are an automated test case evaluator. Your task is to compare the actual output against the expected output for a given programming problem. Problem Title: ${title}. Total test cases: ${testCasesCount}. Based on a line-by-line comparison of the 'Actual User Output' and the 'Expected Outputs', determine how many test cases passed. IMPORTANT: Respond ONLY with the number of passed test cases in the format "X/Y" (e.g., "9/10"). Do not include any other text.
---
Expected Outputs:
${expectedOutput}
---
Actual User Output:
${actualOutput}`;

    for (let i = 0; i < apiKeys.length; i++) {
        const key = apiKeys[i];
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            });

            if (response.status === 429) {
                console.warn(`Key #${i + 1} is rate-limited. Trying next key...`);
                continue;
            }

            if (!response.ok) {
                console.error(`Gemini API Error with Key #${i + 1} (Status: ${response.status})`);
                return null;
            }

            const data = await response.json();
            const resultText = data.candidates[0]?.content?.parts[0]?.text?.trim();
            
            if (resultText && /^\d+\/\d+$/.test(resultText)) {
                return resultText;
            }
            
            console.warn("Gemini did not return the expected format. Received:", resultText);
            return null;

        } catch (error) {
            console.error(`Failed to call Gemini API with Key #${i + 1}:`, error);
            continue;
        }
    }

    console.error("All Gemini API keys failed or are rate-limited.");
    return null;
}


// This is the public endpoint your client-side code will call.
export async function POST(request: Request) {
    try {
        const problemData = await request.json();
        const passedCount = await getTestCasesPassedCount(problemData);

        if (passedCount) {
            return NextResponse.json({ passedCount });
        } else {
            return NextResponse.json({ error: "Failed to evaluate test cases using Gemini." }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
}

export async function getTestCasesPassedCount(problemData: any) {
    const { title, description, testInput, actualOutput, expectedOutput, testCasesCount } = problemData;

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY_NEW;
    if (!GEMINI_API_KEY) {
        console.error("Gemini API Key is not configured in .env.local");
        return null;
    }
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `You are an automated test case evaluator. Your task is to compare the actual output against the expected output for a given programming problem. Problem Title: ${title}. Total test cases: ${testCasesCount}. Based on a line-by-line comparison of the 'Actual User Output' and the 'Expected Outputs', determine how many test cases passed. IMPORTANT: Respond ONLY with the number of passed test cases in the format "X/Y" (e.g., "9/10"). Do not include any other text.
---
Expected Outputs:
${expectedOutput}
---
Actual User Output:
${actualOutput}`;

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (!response.ok) {
            console.error("Gemini API Error Response:", await response.text());
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
        console.error('Failed to call Gemini API:', error);
        return null;
    }
}


export async function saveDetailedExecution(executionDetails: any) {
    const { result, room, user, roomId, language } = executionDetails;
    let status = "Error";
    let testCasesPassed = null;
    const totalCases = room?.testCasesCount || 0;

    if (result?.error === null) {
        if (result?.output.trim() === room?.expectedOutput.trim()) {
            status = "Accepted";
            if (totalCases > 0) {
              testCasesPassed = `${totalCases}/${totalCases}`;
            }
        } else {
            status = "Wrong Answer";
            testCasesPassed = await getTestCasesPassedCount({
                title: room?.title,
                description: room?.description,
                testInput: room?.testInput,
                actualOutput: result?.output,
                expectedOutput: room?.expectedOutput,
                testCasesCount: totalCases
            });
        }
    }

    const executionData = {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        room: roomId,
        question: room?.title,
        executionSuccessful: result?.error === null,
        error: result?.error,
        status,
        testCasesPassed,
        output: result?.output,
        expectedOutput: room?.expectedOutput,
        code: result?.code,
        language,
        date: Date.now()
    };

    const apiUrl = 'https://replix-mindmaze-backend.onrender.com/api/save';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(executionData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }

        const responseData = await response.json();
        console.log('Detailed execution saved to local API:', responseData);
        return responseData;
    } catch (error) {
        console.error('Failed to save detailed execution:', error);
    }
}
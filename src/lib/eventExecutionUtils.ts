
// export async function getTestCasesPassedCount(problemData: any) {
//     const { title, description, testInput, actualOutput, expectedOutput, testCasesCount } = problemData;

//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY_NEW;
//     if (!GEMINI_API_KEY) {
//         console.error("Gemini API Key is not configured in .env.local");
//         return null;
//     }
//     const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

//     const prompt = `You are an automated test case evaluator. Your task is to compare the actual output against the expected output for a given programming problem. Problem Title: ${title}. Total test cases: ${testCasesCount}. Based on a line-by-line comparison of the 'Actual User Output' and the 'Expected Outputs', determine how many test cases passed. IMPORTANT: Respond ONLY with the number of passed test cases in the format "X/Y" (e.g., "9/10"). Do not include any other text.
// ---
// Expected Outputs:
// ${expectedOutput}
// ---
// Actual User Output:
// ${actualOutput}`;

//     try {
//         const response = await fetch(GEMINI_API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
//         });

//         if (!response.ok) {
//             console.error("Gemini API Error Response:", await response.text());
//             return null;
//         }

//         const data = await response.json();
//         const resultText = data.candidates[0]?.content?.parts[0]?.text?.trim();
        
//         if (resultText && /^\d+\/\d+$/.test(resultText)) {
//             return resultText;
//         }
//         console.warn("Gemini did not return the expected format. Received:", resultText);
//         return null;
//     } catch (error) {
//         console.error('Failed to call Gemini API:', error);
//         return null;
//     }
// }



// export async function getTestCasesPassedCount(problemData: any): Promise<string | null> {
//     // 1. Load all your secure API keys from environment variables into an array.
//     const apiKeys = [
//         process.env.NEXT_PUBLIC_GEMINI_API_KEY_1,
//         process.env.NEXT_PUBLIC_GEMINI_API_KEY_2,
//         process.env.NEXT_PUBLIC_GEMINI_API_KEY_3,
//         process.env.NEXT_PUBLIC_GEMINI_API_KEY_4,
//         process.env.NEXT_PUBLIC_GEMINI_API_KEY_5,
//     ].filter((key): key is string => !!key); // Filters out any undefined keys

//     if (apiKeys.length === 0) {
//         console.error("No Gemini API keys are configured in .env.local");
//         return null;
//     }

//     const { title, actualOutput, expectedOutput, testCasesCount } = problemData;

//     // The prompt is constructed once, outside the loop.
//     const prompt = `You are an automated test case evaluator. Your task is to compare the actual output against the expected output for a given programming problem. Problem Title: ${title}. Total test cases: ${testCasesCount}. Based on a line-by-line comparison of the 'Actual User Output' and the 'Expected Outputs', determine how many test cases passed. IMPORTANT: Respond ONLY with the number of passed test cases in the format "X/Y" (e.g., "9/10"). Do not include any other text.
// ---
// Expected Outputs:
// ${expectedOutput}
// ---
// Actual User Output:
// ${actualOutput}`;

//     // 2. Loop through each API key.
//     for (let i = 0; i < apiKeys.length; i++) {
//         const key = apiKeys[i];
//         console.log(`Attempting Gemini API call with Key #${i + 1}`);

//         // Note: Using the stable model name 'gemini-1.5-flash'.
//         // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

//         const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

//         try {
//             const response = await fetch(GEMINI_API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
//             });

//             // 3. Check for rate limit error (429).
//             if (response.status === 429) {
//                 console.warn(`Key #${i + 1} is rate-limited. Trying next key...`);
//                 continue; // Skips to the next key in the loop.
//             }

//             if (!response.ok) {
//                 console.error(`Gemini API Error with Key #${i + 1} (Status: ${response.status}):`, await response.text());
//                 // For other errors, we stop trying.
//                 return null;
//             }

//             // 4. If successful, process the response and exit the function.
//             const data = await response.json();
//             const resultText = data.candidates[0]?.content?.parts[0]?.text?.trim();
            
//             if (resultText && /^\d+\/\d+$/.test(resultText)) {
//                 console.log(`Success with Key #${i + 1}`);
//                 return resultText; // Success! Exit the function immediately.
//             }

//             console.warn("Gemini did not return the expected format. Received:", resultText);
//             return null; // Stop if the format is wrong.

//         } catch (error) {
//             console.error(`Failed to call Gemini API with Key #${i + 1}:`, error);
//             // If a network or other fetch error occurs, try the next key.
//             continue;
//         }
//     }

//     // 5. This part is only reached if all keys fail.
//     console.error("All Gemini API keys failed or are rate-limited.");
//     return null;
// }




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


            // testCasesPassed = await getTestCasesPassedCount({
            //     title: room?.title,
            //     description: room?.description,
            //     testInput: room?.testInput,
            //     actualOutput: result?.output,
            //     expectedOutput: room?.expectedOutput,
            //     testCasesCount: totalCases
            // });

            // --- MODIFICATION START ---
            // Instead of calling the function directly, we now call our API route.

            
            try {
                const problemData = {
                    title: room?.title,
                    description: room?.description,
                    testInput: room?.testInput,
                    actualOutput: result?.output,
                    expectedOutput: room?.expectedOutput,
                    testCasesCount: totalCases
                };

                const response = await fetch('/api/evaluate-test-cases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(problemData),
                });

                if (response.ok) {
                    const data = await response.json();
                    testCasesPassed = data.passedCount; // e.g., "9/10"
                } else {
                    console.error("API route for evaluation failed:", await response.text());
                    // Assign a default value on failure if needed
                    testCasesPassed = `0/${totalCases}`;
                }
            } catch (error) {
                console.error("Failed to fetch from evaluation API route:", error);
                testCasesPassed = `0/${totalCases}`;
            }
            // --- MODIFICATION END ---


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
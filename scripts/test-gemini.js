
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Try to load env manually since we are running with node
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^["']|["']$/g, '');
                    process.env[key] = value;
                }
            });
            console.log('Loaded .env.local');
        } else {
            console.log('.env.local not found');
        }
    } catch (e) {
        console.error('Error loading .env.local', e);
    }
}

loadEnv();

async function testGeminiRotation() {
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
        .map((name) => ({ name, key: process.env[name] }))
        .filter((item) => !!item.key);

    console.log(`Found ${apiKeys.length} API keys.`);

    if (apiKeys.length === 0) {
        console.error('No GEMINI_API_KEY environment variables are set');
        return;
    }

    const MODEL_NAME = 'gemini-2.0-flash';
    const prompt = "Write a simple console.log('Hello World') in JavaScript.";

    for (const { name, key } of apiKeys) {
        console.log(`\nTrying key from ${name} (ending in ...${key.slice(-4)})...`);
        try {
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log('Success! Response:', text);
            console.log('Assuming this key works, ending test. In real app, we stop at the first success.');
            return;
        } catch (error) {
            console.error(`Error with ${name}:`, error.message);
            const isQuotaError =
                error.response?.status === 429 ||
                (error.message && error.message.toLowerCase().includes('quota'));

            if (isQuotaError) {
                console.log('Quota exceeded detected. Rotating to next key...');
            } else {
                console.log('Other error detected. In app logic, we might throw here, but for test we continue or stop.');
            }
        }
    }
    console.log('All keys failed.');
}

testGeminiRotation();

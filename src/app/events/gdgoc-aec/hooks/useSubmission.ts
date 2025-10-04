
// File: hooks/useSubmission.ts
import { useState } from 'react';

interface SubmissionResult {
  success: boolean;
  verdict: string;
  userOutput?: string;
  expectedOutput?: string;
  executionTime?: number;
  isCorrect?: boolean;
  testsPassed?: string;
  error?: string;
}

export const useSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const submitCode = async (roomId: string, code: string, language: string) => {
    try {
      setSubmitting(true);
      setResult(null);

      const response = await fetch(`/api/rooms/${roomId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language
        })
      });

      const result = await response.json();
      setResult(result);
      
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        verdict: 'Submission Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitCode, submitting, result };
};
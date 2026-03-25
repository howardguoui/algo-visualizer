export interface TutorContext {
  problemTitle: string;
  problemDescription: string;
  userCode: string;
  language: string;
  failingTestInput: string;
  failingTestExpected: string;
  failingTestActual: string;
}

export async function* generateTutorHintStream(context: TutorContext): AsyncGenerator<string, void, unknown> {
  const prompt = `
You are an expert algorithm tutor. The student is solving: "${context.problemTitle}".
Here is the problem description summary: ${context.problemDescription.substring(0, 500)}...

The student's code in ${context.language} failed a test case.
Input: ${context.failingTestInput}
Expected Output: ${context.failingTestExpected}
Actual Output: ${context.failingTestActual}

Student code:
\`\`\`${context.language}
${context.userCode}
\`\`\`

Rule 1: Point out the logical flaw.
Rule 2: DO NOT give the exact code solution. Ask one guiding question to help them realize their mistake.
Rule 3: Keep it extremely concise, maximum 3 sentences.
`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'sorc/qwen3.5-claude-4.6-opus:9b', // Users can override with their local model
        prompt: prompt,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to connect to Ollama (Status: ${response.status})`);
    }

    if (!response.body) {
      throw new Error('No response body from Ollama');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            yield parsed.response;
          }
        } catch (e) {
          // ignore parsing error for incomplete chunks
        }
      }
    }
  } catch (err: any) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      yield 'Error: Could not connect to local Ollama instance on http://localhost:11434.\nMake sure Ollama is running and OLLAMA_ORIGINS="*" is set.';
    } else {
      yield `\nError: ${err.message}`;
    }
  }
}

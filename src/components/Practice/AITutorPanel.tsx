import { useState, useRef, useEffect } from 'react';
import { generateTutorHintStream } from '../../services/ollamaService';

interface Props {
  problemTitle: string;
  problemDescription: string;
  userCode: string;
  language: string;
  failingTestInput?: string;
  failingTestExpected?: string;
  failingTestActual?: string;
}

export function AITutorPanel(props: Props) {
  const [hint, setHint] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const requestHint = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setHint('');

    try {
      const stream = generateTutorHintStream({
        problemTitle: props.problemTitle,
        problemDescription: props.problemDescription,
        userCode: props.userCode,
        language: props.language,
        failingTestInput: props.failingTestInput ?? 'Unknown',
        failingTestExpected: props.failingTestExpected ?? 'Unknown',
        failingTestActual: props.failingTestActual ?? 'Unknown',
      });

      for await (const chunk of stream) {
        setHint((prev) => prev + chunk);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [hint]);

  if (!props.failingTestInput) {
     return null;
  }

  return (
    <div className="flex flex-col bg-slate-900 border border-indigo-500/30 rounded-lg overflow-hidden mb-3">
      <div className="bg-indigo-950/40 px-3 py-2 flex items-center justify-between border-b border-indigo-500/20">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">🤖</span>
          <span className="text-indigo-300 font-semibold text-sm">AI Tutor (Ollama)</span>
        </div>
        <button 
          onClick={requestHint}
          disabled={isGenerating || !props.failingTestInput}
          className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded transition-colors"
        >
          {isGenerating ? 'Thinking...' : hint ? 'Regenerate' : 'Get Hint'}
        </button>
      </div>

      {(hint || isGenerating) && (
        <div 
           ref={scrollRef}
           className="p-3 text-sm text-indigo-100 max-h-48 overflow-y-auto font-sans leading-relaxed whitespace-pre-wrap"
        >
          {hint}
          {isGenerating && <span className="inline-block w-1.5 h-3.5 ml-1 bg-indigo-400 animate-pulse align-middle" />}
        </div>
      )}
    </div>
  );
}

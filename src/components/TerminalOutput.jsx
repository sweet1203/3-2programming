import React from 'react';

export default function TerminalOutput({ output, error, gradeResult }) {
  return (
    <div className="mt-4 bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">결과 출력창 (Terminal)</span>
      </div>
      <div className="p-4 h-48 overflow-y-auto">
        {output && (
          <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap mb-2">
            {output}
          </pre>
        )}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 p-3 rounded text-red-300 font-mono text-sm whitespace-pre-wrap">
            {error}
          </div>
        )}
        {!output && !error && !gradeResult && (
          <div className="text-gray-500 italic text-sm">결과가 여기에 표시됩니다...</div>
        )}
        
        {gradeResult && (
          <div className={`mt-4 p-3 rounded-lg font-bold flex items-center gap-2 ${gradeResult.passed ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-orange-100 text-orange-800 border border-orange-300'}`}>
            {gradeResult.passed ? '🎉 정답입니다! 완벽해요!' : '🤔 아쉽네요. 출력 결과를 다시 한번 확인해볼까요?'}
            <span className="font-normal ml-2 text-sm">
              {gradeResult.message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function TerminalOutput({ output, error, gradeResult }) {
  return (
    <div className="mt-5 overflow-hidden rounded-apple border border-apple-border bg-apple-graphite shadow-apple">
      <div className="border-b border-white/10 bg-black/40 px-4 py-2">
        <span className="text-[13px] font-medium tracking-tight text-white/85">결과 출력창 (Terminal)</span>
      </div>
      <div className="bg-[#1d1d1f] p-4 h-48 overflow-y-auto">
        {output && (
          <pre className="font-mono text-[13px] leading-relaxed text-[#dfe6ea] whitespace-pre-wrap mb-2">{output}</pre>
        )}
        {error && (
          <div className="rounded-apple border border-red-400/35 bg-red-950/40 p-3 font-mono text-[13px] text-red-200/95 whitespace-pre-wrap">
            {error}
          </div>
        )}
        {!output && !error && !gradeResult && (
          <div className="italic text-[13px] text-apple-light">결과가 여기에 표시됩니다...</div>
        )}
        {gradeResult && (
          <div
            className={`mt-4 rounded-apple border p-3 font-semibold tracking-tight flex flex-wrap items-center gap-x-2 gap-y-1 ${
              gradeResult.passed
                ? 'bg-emerald-950/35 border-emerald-500/30 text-emerald-100'
                : 'bg-amber-950/35 border-[#ec893c]/35 text-[#fcd9b8]'
            }`}
          >
            {gradeResult.passed ? '🎉 정답입니다! 완벽해요!' : '🤔 아쉽네요. 출력 결과를 다시 한번 확인해볼까요?'}
            <span className="font-normal font-sans text-[13px] tracking-tight text-white/85 w-full mt-1 sm:w-auto sm:mt-0 sm:ml-1">
              {gradeResult.message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

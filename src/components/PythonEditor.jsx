import React, { useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

export default function PythonEditor({ code, setCode, onRun, onGrade }) {
  const containerRef = useRef(null);

  // 브라우저 기본 붙여넣기 이벤트 가로채기
  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();
      alert('🚫 선생님 팁: 코드는 직접 타이핑해야 진짜 내 실력이 됩니다! 천천히 따라 쳐보세요.');
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('paste', handlePaste, true);
    }
    return () => {
      if (container) {
        container.removeEventListener('paste', handlePaste, true);
      }
    };
  }, []);

  return (
    <div className="flex flex-col overflow-hidden rounded-apple border border-apple-border bg-apple-white shadow-none">
      <div className="bg-apple-surface/80 px-4 py-2.5 flex flex-wrap gap-3 justify-between items-center border-b border-apple-border">
        <span className="text-[13px] font-semibold text-apple-graphite tracking-tight">🐍 파이썬 코드 에디터</span>
        <div className="flex gap-2.5 flex-wrap justify-end">
          <button
            type="button"
            onClick={onRun}
            className="min-h-[32px] px-[21px] py-[11px] rounded-[980px] text-[13px] font-semibold tracking-tight border border-apple-action text-apple-action bg-transparent hover:bg-apple-interactive/[0.06] transition-colors"
          >
            ▶ 실행
          </button>
          <button
            type="button"
            onClick={onGrade}
            className="min-h-[32px] px-[21px] py-[11px] rounded-[980px] text-[13px] font-semibold tracking-tight text-apple-white bg-apple-interactive hover:bg-[#0077ED] transition-colors shadow-none"
          >
            ✅ 채점하기
          </button>
        </div>
      </div>
      <div ref={containerRef} className="border-t border-apple-border/0">
        <CodeMirror
          value={code}
          height="380px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          theme="light"
          style={{
            fontSize: '14px',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        />
      </div>
    </div>
  );
}

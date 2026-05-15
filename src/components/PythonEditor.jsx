import React, { useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

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
      <p className="bg-[#282c34] px-4 py-2 text-[11px] leading-snug text-[#c8c8cd] tracking-tight border-b border-black/40">
        위쪽 이론의 코드 상자는 <strong className="text-[#eaeaea] font-medium">읽기 전용 예제</strong>입니다.
        실행·채점은 <strong className="text-[#eaeaea] font-medium">아래 편집창에서 ▶ 실행</strong>으로 하세요. 필요하면 Colab 등에 옮겨 실행해도 됩니다.
      </p>
      <div ref={containerRef} className="overflow-hidden rounded-b-apple bg-[#282c34]">
        <CodeMirror
          value={code}
          height="380px"
          extensions={[python(), oneDark]}
          onChange={(value) => setCode(value)}
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

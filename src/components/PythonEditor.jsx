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
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-300">
        <span className="text-sm font-semibold text-gray-700">🐍 파이썬 코드 에디터</span>
        <div className="flex gap-2">
          <button
            onClick={onRun}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-colors"
          >
            ▶ 실행
          </button>
          <button
            onClick={onGrade}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center transition-colors"
          >
            ✅ 채점하기
          </button>
        </div>
      </div>
      <div ref={containerRef} className="bg-white">
        <CodeMirror
          value={code}
          height="380px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          theme="light"
          style={{ fontSize: '16px', fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
}

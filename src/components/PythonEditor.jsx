import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import CopyCodeButton from './CopyCodeButton';

export default function PythonEditor({ code, setCode, starterCode, onRun, onGrade }) {
  const [resetFlash, setResetFlash] = useState(false);

  const handleReset = () => {
    if (!starterCode) return;
    const ok = window.confirm('처음 실습 코드로 되돌릴까요? 지금까지 수정한 내용은 사라집니다.');
    if (!ok) return;
    setCode(starterCode);
    setResetFlash(true);
    setTimeout(() => setResetFlash(false), 1400);
  };

  const pillBtn =
    'min-h-[32px] px-[18px] py-[11px] rounded-[980px] text-[13px] font-semibold tracking-tight transition-colors';

  return (
    <div className="flex flex-col overflow-hidden rounded-apple border border-apple-border bg-apple-white shadow-none">
      <div className="bg-apple-surface/80 px-4 py-2.5 flex flex-wrap gap-3 justify-between items-center border-b border-apple-border">
        <span className="text-[13px] font-semibold text-apple-graphite tracking-tight">🐍 파이썬 코드 에디터</span>
        <div className="flex gap-2.5 flex-wrap justify-end">
          <button
            type="button"
            onClick={onRun}
            className={`${pillBtn} border border-apple-action text-apple-action bg-transparent hover:bg-apple-interactive/[0.06]`}
          >
            ▶ 실행
          </button>
          <button
            type="button"
            onClick={onGrade}
            className={`${pillBtn} px-[21px] text-apple-white bg-apple-interactive hover:bg-[#0077ED]`}
          >
            ✅ 채점하기
          </button>
          <CopyCodeButton text={code} label="현재 코드 복사" variant="toolbar" />
          {starterCode ? (
            <button
              type="button"
              onClick={handleReset}
              className={`${pillBtn} border border-apple-border bg-transparent text-apple-charcoal hover:bg-apple-surface/60`}
              aria-label="처음 실습 코드로 되돌리기"
            >
              {resetFlash ? '되돌림 ✓' : '↺ 처음으로'}
            </button>
          ) : null}
        </div>
      </div>
      <p className="bg-[#282c34] px-4 py-2 text-[11px] leading-snug text-[#c8c8cd] tracking-tight border-b border-black/40">
        위쪽 이론의 코드 상자는 <strong className="text-[#eaeaea] font-medium">읽기 전용 예제</strong>입니다.
        실행·채점은 <strong className="text-[#eaeaea] font-medium">아래 편집창에서 ▶ 실행</strong>으로 하세요.
        꼬이면 <strong className="text-[#eaeaea] font-medium">↺ 처음으로</strong>를 눌러 시작 코드를 다시 불러올 수 있어요.
        편집창 오른쪽 위 <strong className="text-[#eaeaea] font-medium">복사</strong>로 작성 중인 코드를 통째로 복사할 수 있어요.
      </p>
      <div className="relative overflow-hidden rounded-b-apple bg-[#282c34]">
        <div className="absolute top-2.5 right-2.5 z-10">
          <CopyCodeButton text={code} label="에디터 코드 복사" size="sm" variant="dark" />
        </div>
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

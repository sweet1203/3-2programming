import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson4Expanded from '../lessonTheory/Lesson4Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON4_QUIZZES = [
  {
    question: 'def로 만든 함수는 한 번 정의하면 여러 번 이름만 불러서 재사용할 수 있다.',
    answer: 'O',
    explanation: '맞아요! 함수의 가장 큰 장점이에요. say_hi("민지"), say_hi("서연") 처럼 이름만 바꿔서 계속 쓸 수 있어요.',
  },
  {
    question: 'if-elif 구조에서, 맨 위 if의 조건이 참이면 아래 elif도 함께 실행된다.',
    answer: 'X',
    explanation: '맨 위 if가 참이면 아래 elif는 건너뜁니다. if-elif는 딱 하나만 실행돼요.',
  },
  {
    question: 'range(1, 5)는 1, 2, 3, 4를 만들고 5는 포함되지 않는다.',
    answer: 'O',
    explanation: '맞아요! range(시작, 끝)에서 끝 값은 항상 포함되지 않아요. "끝 직전까지"라고 외우세요.',
  },
];

const LESSON4_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# greet()의 return만 f-string으로 완성하세요.

def greet(name):
    return "수정하세요"  # TODO: 예) return f"안녕, {name}님!"

print(greet("파이썬"))

for i in range(1, 4):
    if i % 2 == 0:
        print(i, "→ 짝수")
    else:
        print(i, "→ 홀수")
`;

export default function Lesson4() {
  const [code, setCode] = useState(LESSON4_STARTER);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [gradeResult, setGradeResult] = useState(null);
  const [isEngineReady, setIsEngineReady] = useState(false);

  useEffect(() => {
    loadPyodideEngine().then(() => setIsEngineReady(true));
  }, []);

  const handleRun = async () => {
    setOutput('실행 중...');
    setError('');
    setGradeResult(null);
    const result = await executePythonCode(code);
    if (result.success) {
      setOutput(result.output);
    } else {
      setOutput('');
      setError(result.error);
    }
    return result;
  };

  const handleGrade = async () => {
    const result = await handleRun();
    if (!result.success) return;

    const o = result.output.trim().replace(/\r\n/g, '\n');
    const hasGreet = o.includes('안녕, 파이썬');
    const ok =
      hasGreet &&
      o.includes('1') &&
      o.includes('홀수') &&
      o.includes('2') &&
      o.includes('짝수') &&
      o.includes('3') &&
      o.includes('홀수');
    if (ok) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message:
          'greet는 f"안녕, {name}님!" 처럼 반환하고, for/if 블록은 수정하지 않은 채 실행해 보세요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">4차시. 제어 구조의 응용</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          <code>if</code>로 조건 판단, <code>for</code>·<code>range()</code>로 반복, 자주 쓰는 코드는 <code>def</code> 함수로 묶어서 재사용하기.
        </p>
      </header>

      <Lesson4Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-3 list-decimal pl-5 space-y-2 leading-relaxed">
              <li><code>greet</code> 함수의 <code>return</code>만 완성하기</li>
              <li><strong>실행</strong>으로 출력 확인 → <strong>채점하기</strong></li>
              <li>퀴즈 3문항</li>
            </ol>
            <h3 className="text-apple-graphite font-semibold mt-6 text-[17px] tracking-tight">미션 요약</h3>
            <ul className="text-[14px] text-apple-deep mt-3 mb-0 list-disc pl-5 space-y-2 leading-relaxed">
              <li>힌트: <code>return f"안녕, {"{name}"}님!"</code> 형태로 작성</li>
              <li>아래 <code>for</code>/<code>if</code> 블록은 건드리지 않아도 돼요</li>
              <li>채점 통과하면 구구단 실습도 도전해 보세요! 🎯</li>
            </ul>
          </div>
        </div>

        <div>
          {!isEngineReady && (
            <div className="mb-4 rounded-apple border border-apple-border bg-apple-surface p-3 text-[13px] text-apple-charcoal animate-pulse">
              파이썬 엔진을 불러오는 중입니다. 잠시만 기다려주세요...
            </div>
          )}
          <PythonEditor
            code={code}
            setCode={setCode}
            starterCode={LESSON4_STARTER}
            onRun={handleRun}
            onGrade={handleGrade}
          />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON4_QUIZZES} />
    </div>
  );
}

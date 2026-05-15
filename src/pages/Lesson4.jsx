import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson4Expanded from '../lessonTheory/Lesson4Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON4_QUIZZES = [
  {
    question:
      "while문은 '횟수가 정해진 반복'에만 쓸 수 있고, 횟수가 정해진 경우에는 for를 쓸 수 없다.",
    answer: 'X',
    explanation:
      '횟수가 정해졌을 때는 for가 편하고, 조건만 알 때는 while이 자주 쓰입니다. 서로 바꿔 쓸 수도 있어요.',
  },
  {
    question: 'if-elif-elif 구조에서, 맨 위 if의 조건이 참이면 아래 elif 블록들도 모두 검사되어 실행될 수 있다.',
    answer: 'X',
    explanation:
      '맨 위 if가 참이면 같은 체인의 elif는 건너뜁니다. elif는 위 조건들이 거짓일 때만 순서대로 검사돼요.',
  },
  {
    question: 'range(3)은 0, 1, 2를 순서대로 돌린다.',
    answer: 'O',
    explanation: '맞아요. 기본 시작값 0, 끝은 미포함이라 0~2입니다.',
  },
];

const LESSON4_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# greet() 의 return 만 f-string 으로 완성하세요.
# 아래 for / if 블록은 수정하지 마세요.

def greet(name):
    return "수정하세요"  # TODO: 예) f"안녕, {name}님!"

print(greet("파이썬"))

for i in range(1, 4):
    if i % 2 == 0:
        print(i, "→ 짝수")
    else:
        print(i, "→ 홀수")

# ━━━━━━ [선택] while 예시 (채점 무관, #만 지우고 실행) ━━━━━━
# n = 3
# while n > 0:
#     print("카운트다운:", n)
#     n -= 1
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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">4차시. 제어 구조의 응용</h1>
        <p className="text-gray-600 mt-2 text-lg">
          if·for·range를 묶어 쓰고, 자주 쓰는 문장은 <code>def</code> 함수로 빼기.
        </p>
      </header>

      <Lesson4Expanded />

      <h2 className="text-2xl font-bold text-gray-900 mb-4">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="prose prose-blue max-w-none">
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-blue-800 font-bold mt-0">진행 순서</h3>
            <ol className="text-sm text-gray-700 mt-2 mb-3 list-decimal pl-5 space-y-1">
              <li><code>greet</code>의 <code>return</code>만 f-string으로 완성</li>
              <li>실행·채점 후 퀴즈 3문항</li>
            </ol>
            <h3 className="text-blue-800 font-bold mt-4">미션 요약</h3>
            <ul className="text-sm text-gray-700 mt-2 mb-0 list-disc pl-5 space-y-1">
              <li>아래 <code>for</code> / <code>if</code>는 그대로 두고 출력 형식을 확인합니다.</li>
              <li>선택 블록은 while 맛보기입니다.</li>
            </ul>
          </div>
        </div>

        <div>
          {!isEngineReady && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-sm animate-pulse">
              파이썬 엔진을 불러오는 중입니다. 잠시만 기다려주세요...
            </div>
          )}
          <PythonEditor code={code} setCode={setCode} onRun={handleRun} onGrade={handleGrade} />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON4_QUIZZES} />
    </div>
  );
}

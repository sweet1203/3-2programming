import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson1Expanded from '../lessonTheory/Lesson1Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON1_QUIZZES = [
  {
    question: '리스트의 첫 번째 요소에 접근할 때 인덱스는 1이 아니라 0이다.',
    answer: 'O',
    explanation: '맞아요! colors[0]이 첫 번째 값이에요. 파이썬 인덱스는 항상 0부터 시작합니다.',
  },
  {
    question: '3.14 같은 소수는 파이썬에서 int(정수형)으로 저장된다.',
    answer: 'X',
    explanation: '소수점이 있으면 float(실수형)이에요. int는 소수점 없는 숫자만 담아요.',
  },
  {
    question: 'True와 False는 파이썬에서 bool(부울형) 자료형이다.',
    answer: 'O',
    explanation: '맞아요! True/False는 반드시 첫 글자를 대문자로 써야 해요. true(소문자)는 오류가 나요.',
  },
];

const LESSON1_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# ① my_grade를 2로 바꾸기 (나는 2학년!)
# ② colors[0] → colors[2] 로 바꿔서 '노'가 출력되게 하기

my_name = "파이썬"       # str (문자열)
my_grade = 1             # TODO: 2로 바꾸세요
colors = ['빨', '주', '노', '초', '파']

print("이름 자료형:", type(my_name).__name__)    # str
print("학년 자료형:", type(my_grade).__name__)   # int
print("내 학년:", my_grade)                      # TODO: 2가 나와야 해요
print("세 번째 색:", colors[0])                  # TODO: colors[2] 로 바꾸면 '노' 출력
`;

export default function Lesson1() {
  const [code, setCode] = useState(LESSON1_STARTER);
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

    const o = result.output.trim();
    const ok =
      o.includes('str') &&
      o.includes('int') &&
      o.includes('2') &&
      o.includes('노');
    if (ok) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message: '① my_grade를 2로 바꾸고 ② colors[0] → colors[2] 로 수정하면 출력에 "2"와 "노"가 나와야 해요!',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">1차시. 변수와 자료형</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          값을 담는 변수, <code>int</code>·<code>float</code>·<code>str</code>·<code>bool</code> 4가지 자료형, 그리고 리스트와 <code>type()</code>으로 자료형 확인하기.
        </p>
      </header>

      <Lesson1Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-3 list-decimal pl-5 space-y-2 leading-relaxed">
              <li>코드를 읽고 TODO 두 곳 수정</li>
              <li><strong>실행</strong>으로 출력 확인 → <strong>채점하기</strong></li>
              <li>맨 아래 <strong>퀴즈</strong> 3문항 풀기</li>
            </ol>
            <h3 className="text-apple-graphite font-semibold mt-6 text-[17px] tracking-tight">미션 요약</h3>
            <ul className="text-[14px] text-apple-deep mt-3 mb-0 list-disc pl-5 space-y-2 leading-relaxed">
              <li><code>my_grade = 1</code> → <code>2</code>로 바꾸기</li>
              <li><code>colors[0]</code> → <code>colors[2]</code>로 바꿔서 <strong>노</strong>가 출력되게 하기</li>
              <li>힌트: 리스트 인덱스는 0부터! (0→빨, 1→주, 2→노)</li>
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
            starterCode={LESSON1_STARTER}
            onRun={handleRun}
            onGrade={handleGrade}
          />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON1_QUIZZES} />
    </div>
  );
}

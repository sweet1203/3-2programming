import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson1Expanded from '../lessonTheory/Lesson1Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON1_QUIZZES = [
  {
    question: '리스트의 첫 번째 요소에 접근할 때 인덱스는 1이다.',
    answer: 'X',
    explanation: '첫 번째 요소는 인덱스 0입니다. colors[0] 이 맞아요.',
  },
  {
    question: '3.14 같은 소수는 파이썬에서 int(정수형)으로 저장된다.',
    answer: 'X',
    explanation: '소수는 float(실수형)입니다.',
  },
  {
    question: '딕셔너리는 키를 이용해 값을 꺼낼 수 있다.',
    answer: 'O',
    explanation: '맞아요. scores["수학"]처럼 키로 접근합니다.',
  },
];

const LESSON1_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# ① next_grade를 3으로 바꾸기
# ② scores['국어']를 scores['수학']으로 바꾸기

class_name = "정보2반"
colors = ['빨', '주', '노', '초']
scores = {'국어': 88, '수학': 92}
next_grade = 2  # TODO: 3

print("반 자료형:", type(class_name).__name__)        # str
print("내년 학년 자료형:", type(next_grade).__name__) # int
print("첫 색:", colors[0], "수학:", scores['국어'])  # TODO: '수학'
print("내년 학년 값:", next_grade)                   # TODO가 반영되면 3이 나와야 합니다.
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
      o.includes('빨') &&
      o.includes('92') &&
      o.includes('int') &&
      o.includes('3') &&
      o.includes('str');
    if (ok) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message: '출력에 첫 색(빨)·수학(92)·내년 학년(3)·str·int가 모두 보여야 해요. 위 TODO 두 곳을 확인하세요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">1차시. 변수와 자료형</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          값을 담는 변수, int·float·str·bool, 리스트·딕셔너리와 <code>type()</code>으로 자료형 확인하기.
        </p>
      </header>

      <Lesson1Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-3 list-decimal pl-5 space-y-2 leading-relaxed">
              <li><strong>실행</strong>으로 출력 확인</li>
              <li><strong>채점하기</strong>로 필수 미션 통과 여부 확인</li>
              <li>맨 아래 <strong>실습 후 퀴즈</strong> 3문항 풀기</li>
            </ol>
            <h3 className="text-apple-graphite font-semibold mt-6 text-[17px] tracking-tight">미션 요약</h3>
            <ul className="text-[14px] text-apple-deep mt-3 mb-0 list-disc pl-5 space-y-2 leading-relaxed">
              <li><code>next_grade</code> → 내년 학년 숫자</li>
              <li><code>scores[&apos;국어&apos;]</code> → 수학 점수가 나오게 키 수정</li>
              <li>선택 블록은 채점과 무관하게 실험만 하면 됩니다.</li>
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

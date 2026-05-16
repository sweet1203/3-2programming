import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson3Expanded from '../lessonTheory/Lesson3Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON3_QUIZZES = [
  {
    question: "data = [[1,2,3],[4,5,6]] 일 때 data[1][2]의 값은 6이다.",
    answer: 'O',
    explanation: '인덱스 1번 행 [4,5,6]의 2번째 열이 6이에요.',
  },
  {
    question: '[1, 2, 3, 4] 는 2차원 리스트이다.',
    answer: 'X',
    explanation: '한 겹 리스트는 1차원이에요. [[1,2],[3,4]]처럼 리스트 안에 리스트가 있어야 2차원입니다.',
  },
  {
    question: "2차원 리스트에서 값을 수정할 때도 리스트명[행][열] = 새값 형식으로 접근한다.",
    answer: 'O',
    explanation: '읽기와 수정 모두 [행][열] 인덱스를 사용해요. 예: seats[1][2] = 1',
  },
];

const LESSON3_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# seats[0][2], seats[1][1] 을 1로 바꾸세요.

seats = [
    [0, 1, 0],
    [1, 0, 0],
]

seats[0][2] = 0  # TODO: 1
seats[1][1] = 0  # TODO: 1

print(seats[0])
print(seats[1])
`;

export default function Lesson3() {
  const [code, setCode] = useState(LESSON3_STARTER);
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

    const o = result.output.replace(/\r\n/g, '\n');
    if (o.includes('[0, 1, 1]') && o.includes('[1, 1, 0]')) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message: '0번 줄 [0, 1, 1], 1번 줄 [1, 1, 0] 이 되도록 두 칸을 1로 바꾸세요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">3차시. 다차원 데이터</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          2차원 리스트로 표·격자를 표현하고, <code>[행][열]</code> 인덱스로 읽고 수정합니다.
        </p>
      </header>

      <Lesson3Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-0 list-decimal pl-5 space-y-2 leading-relaxed">
              <li>TODO 두 곳을 <strong>1</strong>로 수정 → 실행·채점</li>
              <li>아래 퀴즈 3문항</li>
            </ol>
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
            starterCode={LESSON3_STARTER}
            onRun={handleRun}
            onGrade={handleGrade}
          />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON3_QUIZZES} />
    </div>
  );
}

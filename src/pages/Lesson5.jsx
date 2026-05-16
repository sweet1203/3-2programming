import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson5Expanded from '../lessonTheory/Lesson5Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON5_QUIZZES = [
  {
    question: "클래스(Class)는 설계도이고, 객체(Object)는 그 설계도로 만든 실제 결과물이다.",
    answer: 'O',
    explanation: '맞아요! 붕어빵 틀이 클래스, 틀로 만든 붕어빵이 객체예요.',
  },
  {
    question: '__init__ 메소드는 객체를 만들 때 자동으로 실행된다.',
    answer: 'O',
    explanation: '맞아요. Dog("초코", 3) 처럼 객체를 만들면 __init__이 자동 실행되어 속성이 저장됩니다.',
  },
  {
    question: '같은 클래스로 만든 두 객체는 항상 같은 속성 값을 가진다.',
    answer: 'X',
    explanation: '아니에요! Dog("초코", 3)과 Dog("두부", 5)는 같은 클래스지만 이름과 나이가 달라요. 각 객체는 독립적이에요.',
  },
];

const LESSON5_STARTER = `# ━━━━━━ [필수] 채점 미션 ━━━━━━
# introduce() 메소드만 완성하세요!
# 출력 예시: "안녕! 나는 2학년 민지야."

class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def introduce(self):
        print("여기를 수정하세요")  # TODO: self.grade와 self.name 활용하기

s1 = Student("민지", 2)
s2 = Student("서연", 1)

s1.introduce()   # 안녕! 나는 2학년 민지야.
s2.introduce()   # 안녕! 나는 1학년 서연야.
`;

export default function Lesson5() {
  const [code, setCode] = useState(LESSON5_STARTER);
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
    const ok =
      o.includes('민지') &&
      o.includes('서연') &&
      o.includes('2') &&
      o.includes('1') &&
      !o.includes('여기를 수정하세요');
    if (ok) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message:
          'introduce() 안에서 print(f"안녕! 나는 {self.grade}학년 {self.name}야.") 처럼 self.grade와 self.name을 활용해 보세요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">5차시. 객체와 클래스</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          클래스는 붕어빵 틀, 객체는 그 틀로 만든 붕어빵! <code>__init__</code>으로 속성을 저장하고, 메소드로 동작을 만들어요.
        </p>
      </header>

      <Lesson5Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-3 list-decimal pl-5 space-y-2 leading-relaxed">
              <li><code>introduce()</code> 메소드 완성 → 실행·채점</li>
              <li>퀴즈 3문항</li>
            </ol>
            <h3 className="text-apple-graphite font-semibold mt-6 text-[17px] tracking-tight">미션 요약</h3>
            <ul className="text-[14px] text-apple-deep mt-3 mb-0 list-disc pl-5 space-y-2 leading-relaxed">
              <li><code>self.grade</code>와 <code>self.name</code>을 활용해 자기소개를 출력하세요.</li>
              <li>힌트: <code>print(f"안녕! 나는 {"{self.grade}"}학년 {"{self.name}"}야.")</code></li>
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
            starterCode={LESSON5_STARTER}
            onRun={handleRun}
            onGrade={handleGrade}
          />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON5_QUIZZES} />
    </div>
  );
}

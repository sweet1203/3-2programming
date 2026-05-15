import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson5Expanded from '../lessonTheory/Lesson5Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON5_QUIZZES = [
  {
    question: "파이썬에서 클래스로부터 만든 실체를 '클래스'라 부르고, 설계도 자체를 '객체'라 부른다.",
    answer: 'X',
    explanation:
      '설계도는 클래스(Class), 그 설계도로 만든 실체가 객체·인스턴스(Object)입니다. 용어가 바뀌어 있어요.',
  },
  {
    question: '인스턴스 메서드를 정의할 때 첫 번째 매개변수로 self를 두는 것이 관례이다.',
    answer: 'O',
    explanation: '맞아요. 인스턴스 자신을 첫 인자로 받는 관례입니다.',
  },
  {
    question: '같은 클래스로 만든 서로 다른 인스턴스는 서로 다른 속성 값을 가질 수 있다.',
    answer: 'O',
    explanation: '맞아요. 각 객체의 self.title 등이 독립적으로 저장됩니다.',
  },
];

const LESSON5_STARTER = `# ━━━━━━ [필수] 채점 미션: Book 클래스 ━━━━━━
# status_text() 만 수정하세요. True → "대여중", False → "대여가능"

class Book:
    def __init__(self, title, is_borrowed):
        self.title = title
        self.is_borrowed = is_borrowed

    def status_text(self):
        return "여기를 수정"  # TODO

b1 = Book("정보 교과서", True)
b2 = Book("파이썬 입문", False)

print(b1.title, "→", b1.status_text())
print(b2.title, "→", b2.status_text())

# ━━━━━━ [선택] 같은 클래스, 다른 인스턴스 (채점 무관) ━━━━━━
# b3 = Book("수학 문제집", False)
# print(b3.title, b3.is_borrowed)
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
      o.includes('정보 교과서') &&
      o.includes('대여중') &&
      o.includes('파이썬 입문') &&
      o.includes('대여가능');
    if (ok) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message:
          'status_text 안에서 self.is_borrowed가 True면 "대여중", False면 "대여가능"을 return 하도록 작성해 보세요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-10 mt-10 mb-6 lesson-shell">
      <header className="mb-10 border-b border-apple-border pb-6">
        <h1 className="lesson-header-title text-3xl sm:text-[34px]">5차시. 객체와 클래스</h1>
        <p className="lesson-header-lead mt-3 text-lg">
          클래스는 설계도, 객체는 그 설계도로 만든 실체. <code>__init__</code>과 <code>self</code>, 메서드로 동작을 붙입니다.
        </p>
      </header>

      <Lesson5Expanded />

      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-6 mt-14">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="max-w-none">
          <div className="rounded-apple border border-apple-border bg-apple-surface/50 p-[15px]">
            <h3 className="text-apple-graphite font-semibold mt-0 text-[17px] tracking-tight">진행 순서</h3>
            <ol className="text-[14px] text-apple-deep mt-3 mb-3 list-decimal pl-5 space-y-2 leading-relaxed">
              <li><code>status_text</code>만 분기 작성 → 실행·채점</li>
              <li>퀴즈 3문항</li>
            </ol>
            <h3 className="text-apple-graphite font-semibold mt-6 text-[17px] tracking-tight">미션 요약</h3>
            <ul className="text-[14px] text-apple-deep mt-3 mb-0 list-disc pl-5 space-y-2 leading-relaxed">
              <li><code>self.is_borrowed</code>로 대여 상태를 나눕니다.</li>
              <li>선택 블록으로 인스턴스를 하나 더 만들어 볼 수 있어요.</li>
            </ul>
          </div>
        </div>

        <div>
          {!isEngineReady && (
            <div className="mb-4 rounded-apple border border-apple-border bg-apple-surface p-3 text-[13px] text-apple-charcoal animate-pulse">
              파이썬 엔진을 불러오는 중입니다. 잠시만 기다려주세요...
            </div>
          )}
          <PythonEditor code={code} setCode={setCode} onRun={handleRun} onGrade={handleGrade} />
          <TerminalOutput output={output} error={error} gradeResult={gradeResult} />
        </div>
      </div>

      <LessonQuizSection items={LESSON5_QUIZZES} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import PythonEditor from '../components/PythonEditor';
import TerminalOutput from '../components/TerminalOutput';
import LessonQuizSection from '../components/LessonQuizSection';
import Lesson2Expanded from '../lessonTheory/Lesson2Expanded';
import { executePythonCode, loadPyodideEngine } from '../utils/pyodideRunner';

const LESSON2_QUIZZES = [
  {
    question: 'input()으로 입력받은 값은 항상 문자열(str)이다.',
    answer: 'O',
    explanation: '맞아요. 숫자로 쓰려면 int()나 float()로 바꿔야 합니다.',
  },
  {
    question: "파일을 'a'(추가) 모드로 열면, 기존 파일 내용이 먼저 모두 삭제된다.",
    answer: 'X',
    explanation: "'w' 모드가 기존 내용을 지웁니다. 'a'는 끝에 이어 씁니다.",
  },
  {
    question: '파일을 연 뒤에는 작업이 끝나면 close()로 닫아 주는 것이 좋다.',
    answer: 'O',
    explanation: '맞아요. 닫아야 버퍼가 확실히 기록되고 자원도 반환됩니다.',
  },
];

const LESSON2_STARTER = `# ━━━━━━ [필수] 채점 미션: 표준 출력 + 파일 저장·읽기 ━━━━━━
# ① 아래 빈 줄에 print(line) 을 넣어 화면에 한 번 출력
# ② 이후 코드는 그대로 두고 실행 → 같은 문장이 파일에서도 읽혀야 함

line = "2026-05-15: 파이썬 파일 입출력 연습"

# (1) 여기에 print(line) 한 줄 작성


# (2) 파일에 쓰고 다시 읽기
f = open("diary.txt", "w", encoding="utf-8")
f.write(line)
f.close()

f2 = open("diary.txt", "r", encoding="utf-8")
content = f2.read()
f2.close()

print("파일에서 읽은 내용:", content)

# ━━━━━━ [선택] readline 연습 (채점 무관) ━━━━━━
# f3 = open("diary.txt", "r", encoding="utf-8")
# first = f3.readline()
# print("첫 줄만:", repr(first))
# f3.close()
`;

export default function Lesson2() {
  const [code, setCode] = useState(LESSON2_STARTER);
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

    const o = result.output;
    const needle = '2026-05-15: 파이썬 파일 입출력 연습';
    const lines = o.split('\n').filter((l) => l.trim());
    const count = lines.filter((l) => l.includes(needle)).length;
    if (count >= 2 && o.includes('파일에서 읽은 내용:')) {
      setGradeResult({ passed: true, message: '' });
    } else {
      setGradeResult({
        passed: false,
        message: '같은 문장이 (1) print로 한 번 (2) "파일에서 읽은 내용:" 뒤로 한 번 이상 나와야 해요.',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">2차시. 표준입출력과 파일입출력</h1>
        <p className="text-gray-600 mt-2 text-lg">
          <code>print</code>로 표준 출력, <code>open</code>·<code>write</code>·<code>read</code>·<code>close</code>로 파일에 남기기.
        </p>
      </header>

      <Lesson2Expanded />

      <h2 className="text-2xl font-bold text-gray-900 mb-4">에디터 실습</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="prose prose-blue max-w-none">
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-blue-800 font-bold mt-0">진행 순서</h3>
            <ol className="text-sm text-gray-700 mt-2 mb-3 list-decimal pl-5 space-y-1">
              <li><code>print(line)</code> 한 줄 채우기 → 실행</li>
              <li><strong>채점하기</strong> 통과 후 퀴즈 3문항</li>
            </ol>
            <p className="text-xs text-gray-600 mb-0">선택 블록은 readline 예시입니다. 필요하면 주석을 해제해 실행해 보세요.</p>
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

      <LessonQuizSection items={LESSON2_QUIZZES} />
    </div>
  );
}

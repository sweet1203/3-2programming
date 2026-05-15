import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizModule({
  question,
  answer,
  explanation,
  heading = '마무리 퀴즈',
  containerClassName,
}) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (choice) => {
    setSelected(choice);
    setShowResult(true);
  };

  const isCorrect = selected === answer;

  const wrap =
    containerClassName ||
    'mt-12 rounded-apple border border-apple-border bg-apple-surface/35 p-[15px] sm:p-6 mb-10';

  return (
    <div className={wrap}>
      <h3 className="text-[18px] font-semibold text-apple-graphite mb-3 flex items-center gap-2 tracking-tight">
        <span aria-hidden>📝</span> {heading}
      </h3>
      <p className="font-medium text-apple-deep mb-6 text-[16px] sm:text-[17px] leading-snug tracking-tight">
        Q. {question}
      </p>
      <div className="flex gap-3 sm:gap-[10px] mb-6">
        <button
          type="button"
          onClick={() => handleSelect('O')}
          disabled={showResult}
          className={`flex-1 min-h-[52px] py-3 px-5 text-xl sm:text-2xl font-semibold rounded-[980px] border-2 transition-all cursor-pointer tracking-tight ${
            selected === 'O'
              ? answer === 'O'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                : 'bg-red-50 border-red-500 text-red-900'
              : 'border-apple-border bg-apple-white text-apple-action hover:border-apple-interactive'
          } ${showResult && selected !== 'O' ? 'opacity-45 cursor-not-allowed' : ''}`}
        >
          O (맞다)
        </button>
        <button
          type="button"
          onClick={() => handleSelect('X')}
          disabled={showResult}
          className={`flex-1 min-h-[52px] py-3 px-5 text-xl sm:text-2xl font-semibold rounded-[980px] border-2 transition-all cursor-pointer tracking-tight ${
            selected === 'X'
              ? answer === 'X'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                : 'bg-red-50 border-red-500 text-red-900'
              : 'border-apple-border bg-apple-white text-apple-action hover:border-apple-interactive'
          } ${showResult && selected !== 'X' ? 'opacity-45 cursor-not-allowed' : ''}`}
        >
          X (틀리다)
        </button>
      </div>

      {showResult && (
        <div
          className={`rounded-apple p-4 flex items-start gap-3 border tracking-tight ${
            isCorrect
              ? 'bg-emerald-50/95 text-emerald-950 border-emerald-200'
              : 'bg-red-50/95 text-red-950 border-red-200'
          }`}
        >
          {isCorrect ? (
            <CheckCircle className="w-[22px] h-[22px] flex-shrink-0 mt-0.5 text-emerald-700" strokeWidth={1.75} />
          ) : (
            <XCircle className="w-[22px] h-[22px] flex-shrink-0 mt-0.5 text-red-600" strokeWidth={1.75} />
          )}
          <div>
            <p className="font-semibold mb-1 text-[16px]">
              {isCorrect ? '정답입니다! 🎉' : '아쉽네요, 오답입니다. 🤔'}
            </p>
            <p className="text-[14px] text-apple-deep leading-relaxed">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

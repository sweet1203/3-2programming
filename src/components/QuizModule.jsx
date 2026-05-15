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
    'mt-12 bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm mb-8';

  return (
    <div className={wrap}>
      <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
        <span>📝</span> {heading}
      </h3>
      <p className="text-gray-800 font-medium text-base sm:text-lg mb-5 leading-relaxed">
        Q. {question}
      </p>

      <div className="flex gap-3 sm:gap-4 mb-5">
        <button
          type="button"
          onClick={() => handleSelect('O')}
          disabled={showResult}
          className={`flex-1 py-3 sm:py-4 text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all cursor-pointer ${
            selected === 'O'
              ? answer === 'O'
                ? 'bg-green-100 border-green-500 text-green-700'
                : 'bg-red-100 border-red-500 text-red-700'
              : 'bg-white border-indigo-200 hover:border-indigo-400 text-indigo-600'
          } ${showResult && selected !== 'O' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          O (맞다)
        </button>
        <button
          type="button"
          onClick={() => handleSelect('X')}
          disabled={showResult}
          className={`flex-1 py-3 sm:py-4 text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all cursor-pointer ${
            selected === 'X'
              ? answer === 'X'
                ? 'bg-green-100 border-green-500 text-green-700'
                : 'bg-red-100 border-red-500 text-red-700'
              : 'bg-white border-indigo-200 hover:border-indigo-400 text-indigo-600'
          } ${showResult && selected !== 'X' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          X (틀리다)
        </button>
      </div>

      {showResult && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}
        >
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-600" />
          )}
          <div>
            <p className="font-bold text-base sm:text-lg mb-1">
              {isCorrect ? '정답입니다! 🎉' : '아쉽네요, 오답입니다. 🤔'}
            </p>
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

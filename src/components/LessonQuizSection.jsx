import React from 'react';
import QuizModule from './QuizModule';

/**
 * @param {{ question: string, answer: 'O'|'X', explanation: string }[]} items
 */
export default function LessonQuizSection({ items, description }) {
  if (!items?.length) return null;

  return (
    <section className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">실습 후 퀴즈</h2>
      <p className="text-gray-600 text-sm mb-6">
        {description || '실습을 마친 뒤, 아래 O/X 문제를 순서대로 풀어 보세요.'}
      </p>
      <div className="space-y-5">
        {items.map((q, i) => (
          <QuizModule
            key={i}
            heading={`퀴즈 ${i + 1} / ${items.length}`}
            question={q.question}
            answer={q.answer}
            explanation={q.explanation}
            containerClassName="mt-0 mb-0 bg-indigo-50 rounded-2xl p-5 border border-indigo-100 shadow-sm"
          />
        ))}
      </div>
    </section>
  );
}

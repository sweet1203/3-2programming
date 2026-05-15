import React from 'react';
import QuizModule from './QuizModule';

/**
 * @param {{ question: string, answer: 'O'|'X', explanation: string }[]} items
 */
export default function LessonQuizSection({ items, description }) {
  if (!items?.length) return null;

  return (
    <section className="mt-14 border-t border-apple-border pt-10">
      <h2 className="text-[24px] font-semibold text-apple-graphite tracking-tight mb-2">실습 후 퀴즈</h2>
      <p className="text-apple-charcoal text-[14px] mb-8 tracking-tight leading-relaxed max-w-[65ch]">
        {description || '실습을 마친 뒤, 아래 O/X 문제를 순서대로 풀어 보세요.'}
      </p>
      <div className="space-y-[10px]">
        {items.map((q, i) => (
          <QuizModule
            key={i}
            heading={`퀴즈 ${i + 1} / ${items.length}`}
            question={q.question}
            answer={q.answer}
            explanation={q.explanation}
            containerClassName="mt-0 mb-0 rounded-apple border border-apple-border bg-apple-surface/35 p-[15px] sm:p-5"
          />
        ))}
      </div>
    </section>
  );
}

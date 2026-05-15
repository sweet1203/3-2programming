import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, Code2, GraduationCap, Sparkles } from 'lucide-react';
import { LESSONS } from '../data/lessons';

const STEPS = [
  {
    icon: BookOpen,
    title: '이론 읽기',
    desc: '차시마다 정리된 마크다운 이론을 위에서 차근차근 읽어요.',
  },
  {
    icon: Code2,
    title: '코드 실행',
    desc: '아래 에디터에서 파이썬을 바로 실행해 보고, 미션을 완성해요.',
  },
  {
    icon: Sparkles,
    title: '퀴즈로 확인',
    desc: '마무리 퀴즈로 오늘 배운 내용을 스스로 점검해요.',
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="relative overflow-hidden border-b border-apple-border bg-gradient-to-b from-apple-white via-apple-canvas to-apple-canvas">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-apple-pale/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-apple-sky/10 blur-3xl"
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-14 sm:pb-20 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-apple-border bg-apple-white/80 px-3.5 py-1.5 text-[12px] font-medium text-apple-charcoal tracking-tight shadow-sm">
            <GraduationCap className="h-3.5 w-3.5 text-apple-interactive" aria-hidden />
            3-2 알고리즘과 프로그래밍 · 파이썬
          </p>

          <h1 className="mt-6 text-[32px] sm:text-[44px] lg:text-[52px] font-semibold tracking-tight text-apple-graphite leading-[1.08]">
            Goo 쌤의
            <br className="sm:hidden" />
            <span className="text-apple-interactive"> 프로그래밍 수업</span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-[16px] sm:text-[18px] text-apple-charcoal leading-relaxed tracking-tight">
            설치 없이 브라우저에서 이론을 읽고, 파이썬 코드를 실행하며, 퀴즈로 마무리하는
            <span className="text-apple-deep font-medium"> 5차시 코스웨어</span>입니다.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/lesson/1"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-apple-interactive px-6 py-3 text-[15px] font-medium text-white shadow-apple hover:bg-apple-action transition-colors tracking-tight"
            >
              1차시부터 시작하기
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href="#lessons"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-apple-border bg-apple-white px-6 py-3 text-[15px] font-medium text-apple-graphite hover:border-apple-interactive/40 hover:text-apple-interactive transition-colors tracking-tight"
            >
              차시 목록 보기
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: '총 차시', value: '5' },
              { label: '차시당', value: '50분' },
              { label: '실습 환경', value: '브라우저' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-apple border border-apple-border bg-apple-white/90 px-3 py-4 shadow-sm"
              >
                <dt className="text-[11px] uppercase tracking-wide text-apple-medium">{label}</dt>
                <dd className="mt-1 text-[20px] sm:text-[22px] font-semibold text-apple-graphite tracking-tight">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <h2 className="text-center text-[22px] sm:text-[26px] font-semibold text-apple-graphite tracking-tight">
          이렇게 수업해요
        </h2>
        <p className="mt-2 text-center text-[14px] text-apple-charcoal tracking-tight">
          위에서 이론을 읽고, 아래 에디터에서 코드를 실행하면 됩니다.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="relative rounded-apple border border-apple-border bg-apple-white p-6 shadow-sm"
            >
              <span className="absolute top-4 right-4 text-[11px] font-semibold text-apple-light tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-apple-canvas text-apple-interactive">
                <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold text-apple-graphite tracking-tight">{title}</h3>
              <p className="mt-2 text-[14px] text-apple-charcoal leading-relaxed tracking-tight">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="lessons" className="bg-apple-white border-y border-apple-border scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-apple-graphite tracking-tight">
            차시별 수업
          </h2>
          <p className="mt-2 text-[14px] text-apple-charcoal tracking-tight max-w-xl">
            배우고 싶은 차시를 골라 들어가세요. 각 차시마다 이론 · 실습 · 퀴즈가 준비되어 있어요.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {LESSONS.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={lesson.to}
                  className={`group flex h-full flex-col rounded-apple border border-apple-border bg-gradient-to-br ${lesson.accent} p-5 sm:p-6 shadow-sm hover:border-apple-interactive/35 hover:shadow-apple transition-all duration-200`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[28px] leading-none" aria-hidden>
                      {lesson.emoji}
                    </span>
                    <span className="shrink-0 rounded-full bg-apple-white/80 px-2.5 py-1 text-[11px] font-medium text-apple-charcoal tracking-tight border border-apple-border/60">
                      {lesson.id}차시
                    </span>
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold text-apple-graphite tracking-tight group-hover:text-apple-interactive transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-apple-medium font-mono tracking-tight">{lesson.keywords}</p>
                  <p className="mt-3 flex-1 text-[14px] text-apple-charcoal leading-relaxed">
                    <span className="text-apple-medium">실습 미션 · </span>
                    {lesson.mission}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-apple-interactive">
                    수업 들어가기
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-[13px] text-apple-medium leading-relaxed tracking-tight max-w-md mx-auto">
          이론 안의 코드 블록은 읽기 전용이에요. 실행·채점은 각 차시 하단 에디터에서 진행합니다.
        </p>
      </section>
    </div>
  );
}

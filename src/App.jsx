import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Lesson1 from './pages/Lesson1';
import Lesson2 from './pages/Lesson2';
import Lesson3 from './pages/Lesson3';
import Lesson4 from './pages/Lesson4';
import Lesson5 from './pages/Lesson5';
import { BookOpen } from 'lucide-react';

const nav = [
  { to: '/lesson/1', label: '1차시: 변수와 자료형' },
  { to: '/lesson/2', label: '2차시: 입출력·파일' },
  { to: '/lesson/3', label: '3차시: 다차원 데이터' },
  { to: '/lesson/4', label: '4차시: 제어 구조' },
  { to: '/lesson/5', label: '5차시: 객체와 클래스' },
];

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-apple-canvas flex flex-col text-apple-deep">
      <nav className="sticky top-0 z-10 bg-apple-white/95 backdrop-blur-sm border-b border-apple-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 sm:h-auto sm:py-0 sm:min-h-[3.75rem]">
            <div className="flex items-center gap-2.5">
              <BookOpen className="text-apple-interactive h-6 w-6 shrink-0 stroke-[1.5]" aria-hidden />
              <span className="font-semibold text-[17px] sm:text-[19px] tracking-tight text-apple-graphite">
                Goo 쌤의 프로그래밍 수업{' '}
                <span className="text-apple-charcoal font-normal text-[13px] sm:text-[14px] tracking-tight ml-1">
                  (3-2 알고리즘과 프로그래밍)
                </span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              {nav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[14px] font-normal text-apple-graphite hover:text-apple-interactive px-2 py-1.5 rounded-full transition-colors tracking-tight"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full pb-14">{children}</main>
      <footer className="bg-apple-white border-t border-apple-border py-6 text-center text-apple-medium text-[12px] tracking-tight leading-normal">
        <p>-대성여고 정보쌤 제작-</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/lesson/1" replace />} />
          <Route path="/lesson/1" element={<Lesson1 />} />
          <Route path="/lesson/2" element={<Lesson2 />} />
          <Route path="/lesson/3" element={<Lesson3 />} />
          <Route path="/lesson/4" element={<Lesson4 />} />
          <Route path="/lesson/5" element={<Lesson5 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

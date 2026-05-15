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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 sm:h-auto sm:py-0 sm:min-h-[4rem]">
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-600 h-6 w-6 shrink-0" />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900">
                파이썬 코스웨어 <span className="text-gray-500 font-normal text-sm">(3-2 알고리즘과 프로그래밍)</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {nav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full pb-12">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        <p>고등학교 정보 3-2 프로그래밍 단원 실습 환경 (교사용 MD 자료와 차시 구성을 맞춤)</p>
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

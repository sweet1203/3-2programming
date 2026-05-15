import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Lesson1 from './pages/Lesson1';
import Lesson2 from './pages/Lesson2';
import Lesson3 from './pages/Lesson3';
import Lesson4 from './pages/Lesson4';
import Lesson5 from './pages/Lesson5';
import { BookOpen, Home as HomeIcon } from 'lucide-react';
import { LESSONS } from './data/lessons';

function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '';

  return (
    <div className="min-h-screen bg-apple-canvas flex flex-col text-apple-deep">
      <nav className="sticky top-0 z-10 bg-apple-white/95 backdrop-blur-sm border-b border-apple-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 sm:min-h-[3.75rem]">
            <Link
              to="/"
              className="flex items-center gap-2.5 group rounded-lg -ml-1 px-1 py-0.5 hover:opacity-90 transition-opacity"
            >
              <BookOpen className="text-apple-interactive h-6 w-6 shrink-0 stroke-[1.5]" aria-hidden />
              <span className="font-semibold text-[17px] sm:text-[19px] tracking-tight text-apple-graphite group-hover:text-apple-interactive transition-colors">
                Goo 쌤의 프로그래밍 수업
                {!isHome && (
                  <span className="text-apple-charcoal font-normal text-[13px] sm:text-[14px] tracking-tight ml-1">
                    (3-2 알고리즘과 프로그래밍)
                  </span>
                )}
              </span>
            </Link>

            {!isHome && (
              <div className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:gap-x-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 text-[14px] px-2.5 py-1.5 rounded-full transition-colors tracking-tight ${
                      isActive
                        ? 'text-apple-interactive font-medium bg-apple-pale/25'
                        : 'text-apple-graphite hover:text-apple-interactive'
                    }`
                  }
                >
                  <HomeIcon className="h-3.5 w-3.5" aria-hidden />
                  홈
                </NavLink>
                <span className="hidden sm:inline text-apple-border select-none" aria-hidden>
                  |
                </span>
                {LESSONS.map(({ id, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `text-[14px] px-2.5 py-1.5 rounded-full transition-colors tracking-tight whitespace-nowrap ${
                        isActive
                          ? 'text-apple-interactive font-medium bg-apple-pale/25'
                          : 'text-apple-graphite hover:text-apple-interactive'
                      }`
                    }
                  >
                    {id}차시
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className={`flex-1 w-full ${isHome ? '' : 'pb-14'}`}>{children}</main>
      <footer className="bg-apple-white border-t border-apple-border py-6 text-center text-apple-medium text-[12px] tracking-tight leading-normal">
        <p>-대성여고 정보쌤 제작-</p>
      </footer>
    </div>
  );
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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

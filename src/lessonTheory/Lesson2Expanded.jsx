import md from '@infoCourse/02차시_표준입출력과_파일입출력.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson2Expanded() {
  return (
    <article className="mb-10 border-b border-gray-200 pb-10">
      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-slate-700">
        이론 본문은 <strong>정보_프로그래밍</strong> 폴더의 차시 MD와 동일합니다. 브라우저 실습에서는{' '}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">input()</code> 대신 문자열·파일 흐름으로 연습합니다.
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

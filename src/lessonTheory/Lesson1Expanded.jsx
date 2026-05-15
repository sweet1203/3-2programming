import md from '@infoCourse/01차시_변수와_자료형.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson1Expanded() {
  return (
    <article className="mb-10 border-b border-gray-200 pb-10">
      <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm text-slate-700">
        이론 본문은 <strong>정보_프로그래밍</strong> 폴더의 차시 MD와 동일합니다. 참고용으로 쓰던{' '}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">data_literacy_ref</code> 수업자료와 같은 분량이에요.
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

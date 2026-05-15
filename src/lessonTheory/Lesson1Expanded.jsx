import md from '@infoCourse/01차시_변수와_자료형.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson1Expanded() {
  return (
    <article className="mb-10 border-b border-gray-200 pb-10">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

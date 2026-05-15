import md from '@infoCourse/03차시_다차원_데이터.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson3Expanded() {
  return (
    <article className="mb-10 border-b border-gray-200 pb-10">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

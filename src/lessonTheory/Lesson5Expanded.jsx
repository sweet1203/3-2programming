import md from '@infoCourse/05차시_객체와_클래스.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson5Expanded() {
  return (
    <article className="mb-12 border-b border-apple-border pb-12">
      <div className="rounded-apple border border-apple-border bg-apple-white p-5 shadow-apple sm:p-8 lesson-markdown">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

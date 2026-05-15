import md from '@infoCourse/03차시_다차원_데이터.md?raw';
import MarkdownLessonBody from '../components/MarkdownLessonBody';

export default function Lesson3Expanded() {
  return (
    <article className="mb-12 border-b border-apple-border pb-12">
      <div className="rounded-apple border border-apple-border bg-apple-white p-5 shadow-apple sm:p-8 lesson-markdown">
        <MarkdownLessonBody markdown={md} />
      </div>
    </article>
  );
}

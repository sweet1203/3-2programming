import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { markdownComponents } from './markdownLessonTheme';

export default function MarkdownLessonBody({ markdown }) {
  return (
    <div className="lesson-markdown text-apple-deep max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

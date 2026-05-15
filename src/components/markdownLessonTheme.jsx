import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownCodeBlock from './MarkdownCodeBlock';

function getTextContent(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node) && node.props?.children != null) return getTextContent(node.props.children);
  return '';
}

const inlineMarkdownComponents = {
  p: ({ children }) => <>{children}</>,
  strong: ({ children }) => <strong className="font-semibold text-apple-graphite">{children}</strong>,
};

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mt-0 mb-4 pb-3 text-[34px] font-semibold text-apple-graphite tracking-tight leading-none border-b border-apple-border">
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    const isAssignment = String(children).includes('레슨 과제');
    return (
      <h2
        data-section={isAssignment ? 'assignment' : undefined}
        className="mt-10 mb-3 text-[24px] font-semibold text-apple-graphite tracking-tight leading-snug first:mt-0"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-[18px] font-semibold text-apple-graphite tracking-tight leading-snug">{children}</h3>
  ),
  p: ({ children }) => {
    const text = getTextContent(children);
    const needsParse = /\*\*[^*]*\*\*/.test(text);
    const content = needsParse ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineMarkdownComponents}>
        {text}
      </ReactMarkdown>
    ) : (
      children
    );
    return (
      <p className="mb-4 text-[14px] leading-[1.47] tracking-[-0.18px] text-apple-deep last:mb-0">{content}</p>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-snug tracking-[-0.18px] text-apple-deep last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-5 text-[14px] leading-snug tracking-[-0.18px] text-apple-deep last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => {
    const text = getTextContent(children);
    const needsParse = /\*\*[^*]*\*\*/.test(text);
    const content = needsParse ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineMarkdownComponents}>
        {text}
      </ReactMarkdown>
    ) : (
      children
    );
    return <li className="leading-relaxed">{content}</li>;
  },
  strong: ({ children }) => <strong className="font-semibold text-apple-graphite">{children}</strong>,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-apple border border-apple-border">
      <table className="w-full border-collapse bg-apple-white text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-apple-surface/90">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-apple-border last:border-0">{children}</tr>,
  th: ({ children }) => {
    const text = getTextContent(children);
    const needsParse = typeof text === 'string' && /\*\*[^*]*\*\*/.test(text);
    const content = needsParse ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineMarkdownComponents}>
        {text}
      </ReactMarkdown>
    ) : (
      children
    );
    return (
      <th className="border-r border-apple-border px-3 py-2.5 text-left text-[13px] font-semibold text-apple-graphite last:border-r-0">
        {content}
      </th>
    );
  },
  td: ({ children }) => {
    const text = getTextContent(children);
    const needsParse = typeof text === 'string' && /\*\*[^*]*\*\*/.test(text);
    const content = needsParse ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineMarkdownComponents}>
        {text}
      </ReactMarkdown>
    ) : (
      children
    );
    return (
      <td className="border-r border-apple-border px-3 py-2.5 text-apple-deep last:border-r-0">{content}</td>
    );
  },
  hr: () => <hr className="my-10 border-apple-border" />,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-apple-interactive/[0.45] bg-apple-surface/45 pl-4 py-3 text-[13px] text-apple-charcoal leading-relaxed">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => <MarkdownCodeBlock>{children}</MarkdownCodeBlock>,
  code: ({ className, children, ...props }) => {
    const isBlock = typeof className === 'string' && className.includes('language-');
    if (isBlock) {
      return (
        <code
          className={`${className} block w-full max-w-full font-mono text-[13px] !text-[#f5f5f7] !bg-transparent whitespace-pre-wrap break-words`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-apple-surface px-1.5 py-0.5 font-mono text-[0.9em] text-apple-graphite"
        {...props}
      >
        {children}
      </code>
    );
  },
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-apple-action underline decoration-apple-action/35 underline-offset-2 hover:text-apple-interactive"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  details: ({ children }) => (
    <details className="my-4 rounded-apple border border-apple-border bg-apple-white p-4 text-[14px] text-apple-deep open:bg-apple-surface/35">
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary className="cursor-pointer select-none font-medium text-apple-graphite marker:text-apple-medium">
      {children}
    </summary>
  ),
};

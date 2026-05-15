import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function getTextContent(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node) && node.props?.children != null) return getTextContent(node.props.children);
  return '';
}

const inlineMarkdownComponents = {
  p: ({ children }) => <>{children}</>,
  strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
};

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-xl font-bold text-slate-900 mt-0 mb-4 pb-2 border-b border-slate-200">{children}</h1>
  ),
  h2: ({ children }) => {
    const isAssignment = String(children).includes('레슨 과제');
    return (
      <h2
        data-section={isAssignment ? 'assignment' : undefined}
        className="text-lg font-bold text-slate-800 mt-8 mb-3"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-800 mt-5 mb-2">{children}</h3>
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
    return <p className="text-slate-700 text-sm leading-relaxed mb-3">{content}</p>;
  },
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-4 space-y-1 text-slate-700 text-sm">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1 text-slate-700 text-sm">{children}</ol>
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
  strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-slate-200">{children}</tr>,
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
      <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-800">{content}</th>
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
    return <td className="border border-slate-200 px-3 py-2 text-slate-700">{content}</td>;
  },
  hr: () => <hr className="my-6 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="pl-4 border-l-4 border-blue-300 text-slate-600 text-sm my-3">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm leading-relaxed text-slate-100 shadow-inner">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = typeof className === 'string' && className.includes('language-');
    if (isBlock) {
      return (
        <code className={`${className} block font-mono text-[13px] text-inherit`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800" {...props}>
        {children}
      </code>
    );
  },
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  details: ({ children }) => (
    <details className="my-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 open:shadow-sm">
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary className="cursor-pointer select-none font-medium text-slate-800 marker:text-slate-500">{children}</summary>
  ),
};

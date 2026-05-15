import React from 'react';
import CopyCodeButton from './CopyCodeButton';

function getTextContent(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node) && node.props?.children != null) return getTextContent(node.props.children);
  return '';
}

export default function MarkdownCodeBlock({ children }) {
  const source = getTextContent(children).replace(/\n$/, '');

  return (
    <div className="relative my-6 group">
      <div className="absolute top-3 right-3 z-10">
        <CopyCodeButton text={source} label="예제 코드 복사" size="sm" />
      </div>
      <pre className="lesson-md-codeblock overflow-x-auto rounded-apple border border-black/50 bg-[#1d1d1f] p-5 pr-24 text-[13px] leading-relaxed tracking-tight text-[#f5f5f7] shadow-inner [&_code]:bg-transparent [&_code]:text-[#f5f5f7]">
        {children}
      </pre>
    </div>
  );
}

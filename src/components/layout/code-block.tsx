'use client';

import { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';

// Register essential languages
['javascript', 'typescript', 'python'].forEach(lang => {
  const languages = { javascript, typescript, python };
  hljs.registerLanguage(lang, languages[lang as keyof typeof languages]);
});

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = '' }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const highlightedCode = language 
    ? hljs.highlight(code, { language }).value 
    : code;

  return (
    <div className="code-block">
      <div className="code-header">
        {language && <span className="code-language">{language}</span>}
        <button onClick={copyToClipboard}>
          {isCopied ? '✓ Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="code-content">
        <code 
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className={language ? `language-${language}` : ''}
        />
      </pre>
    </div>
  );
}

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  text: string;
  className?: string;
}

interface Token {
  type: 'text' | 'inline' | 'block';
  value: string;
}

function tokenizeMath(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let textBuf = '';

  const flushText = () => {
    if (textBuf.length > 0) {
      tokens.push({ type: 'text', value: textBuf });
      textBuf = '';
    }
  };

  while (i < input.length) {
    if (input[i] === '\\' && input[i + 1] === '$') {
      textBuf += '$';
      i += 2;
      continue;
    }

    if (input[i] === '$' && input[i + 1] === '$') {
      const end = input.indexOf('$$', i + 2);
      if (end !== -1) {
        flushText();
        tokens.push({ type: 'block', value: input.slice(i + 2, end).trim() });
        i = end + 2;
        continue;
      }
    }

    if (input[i] === '$') {
      let end = i + 1;
      let found = -1;
      while (end < input.length) {
        if (input[end] === '\\') {
          end += 2;
          continue;
        }
        if (input[end] === '$') {
          found = end;
          break;
        }
        end++;
      }
      if (found !== -1 && found > i + 1) {
        flushText();
        tokens.push({ type: 'inline', value: input.slice(i + 1, found).trim() });
        i = found + 1;
        continue;
      }
    }

    textBuf += input[i];
    i++;
  }

  flushText();
  return tokens;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const tokens = tokenizeMath(text);

  return (
    <span className={`[overflow-wrap:anywhere] ${className}`}>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return (
            <React.Fragment key={idx}>
              {tok.value.split('\n').map((line, li, arr) => (
                <React.Fragment key={li}>
                  {line}
                  {li < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        }

        const html = katex.renderToString(tok.value, {
          displayMode: tok.type === 'block',
          throwOnError: false,
          strict: false,
        });

        if (tok.type === 'block') {
          return (
            <span
              key={idx}
              className="my-2 block max-w-full overflow-x-auto py-1 text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block max-w-full align-middle [&_span.katex]:text-[0.98em]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
};

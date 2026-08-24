import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ExternalLink,
  Zap,
  Award,
  Lock,
  Headphones
} from 'lucide-react';

interface FormattedContentProps {
  content: string;
  className?: string;
}

interface ParsedBlock {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'bullets' | 'numbered' | 'callout' | 'paragraph';
  content?: string;
  items?: { title?: string; text: string }[];
  sectionNumber?: number;
}

export const FormattedContent: React.FC<FormattedContentProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Split content by markdown horizontal rules
  const rawSections = content.split(/\n\s*---\s*\n|\n\s*___+\s*\n/);

  return (
    <div className={`space-y-8 ${className}`}>
      {rawSections.map((sectionText, sectionIndex) => {
        const trimmed = sectionText.trim();
        if (!trimmed) return null;

        const blocks = parseSectionToBlocks(trimmed, sectionIndex + 1);

        return (
          <div 
            key={sectionIndex} 
            className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs transition-all hover:border-slate-300/80"
          >
            {blocks.map((block, blockIndex) => {
              if (block.type === 'h1') {
                return (
                  <div key={blockIndex} className="space-y-2 border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200/60">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Verified Knowledge Base</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 leading-tight">
                      {block.content}
                    </h2>
                  </div>
                );
              }

              if (block.type === 'h2') {
                return (
                  <div key={blockIndex} className="flex items-center gap-3 border-b border-slate-100 pb-3.5 pt-1">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 text-emerald-400 font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                      §{block.sectionNumber || sectionIndex + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                      {block.content}
                    </h3>
                  </div>
                );
              }

              if (block.type === 'h3') {
                return (
                  <div key={blockIndex} className="pt-2 pb-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2 text-emerald-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>{block.content}</span>
                    </h4>
                  </div>
                );
              }

              if (block.type === 'h4') {
                return (
                  <h5 key={blockIndex} className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider pt-2">
                    {block.content}
                  </h5>
                );
              }

              if (block.type === 'bullets' && block.items && block.items.length > 0) {
                return (
                  <div key={blockIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
                    {block.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-emerald-400 hover:shadow-xs transition-all group"
                      >
                        <div className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-700 min-w-0">
                          {item.title && (
                            <strong className="font-bold text-slate-950 block text-xs sm:text-sm mb-1">
                              {item.title}
                            </strong>
                          )}
                          <span className="text-slate-600">{renderInlineFormatting(item.text)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              if (block.type === 'numbered' && block.items && block.items.length > 0) {
                return (
                  <div key={blockIndex} className="space-y-3 my-3">
                    {block.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all"
                      >
                        <span className="w-7 h-7 rounded-xl bg-slate-900 text-emerald-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          {itemIdx + 1}
                        </span>
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-700 min-w-0">
                          {item.title && (
                            <strong className="font-bold text-slate-950 block text-xs sm:text-sm mb-0.5">
                              {item.title}
                            </strong>
                          )}
                          <span className="text-slate-600">{renderInlineFormatting(item.text)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div key={blockIndex} className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 flex items-start gap-3.5 my-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                      {renderInlineFormatting(block.content || '')}
                    </div>
                  </div>
                );
              }

              // Standard Paragraph
              return (
                <p 
                  key={blockIndex} 
                  className="text-xs sm:text-sm leading-relaxed text-slate-700 text-justify sm:text-left"
                >
                  {renderInlineFormatting(block.content || '')}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Robust line-by-line parser to correctly extract headings, sub-headings, bullets, and numbered items
function parseSectionToBlocks(sectionText: string, sectionNumber: number): ParsedBlock[] {
  const lines = sectionText.split('\n');
  const blocks: ParsedBlock[] = [];

  let currentBulletItems: { title?: string; text: string }[] = [];
  let currentNumberedItems: { title?: string; text: string }[] = [];

  const flushBullets = () => {
    if (currentBulletItems.length > 0) {
      blocks.push({
        type: 'bullets',
        items: [...currentBulletItems]
      });
      currentBulletItems = [];
    }
  };

  const flushNumbered = () => {
    if (currentNumberedItems.length > 0) {
      blocks.push({
        type: 'numbered',
        items: [...currentNumberedItems]
      });
      currentNumberedItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushBullets();
      flushNumbered();
      continue;
    }

    // H1
    if (line.startsWith('# ')) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'h1',
        content: line.replace(/^#\s+/, '').trim()
      });
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'h2',
        content: line.replace(/^##\s+/, '').trim(),
        sectionNumber
      });
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'h3',
        content: line.replace(/^###\s+/, '').trim()
      });
      continue;
    }

    // H4
    if (line.startsWith('#### ')) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'h4',
        content: line.replace(/^####\s+/, '').trim()
      });
      continue;
    }

    // Bullet line: * or -
    if (/^[\*\-]\s+/.test(line)) {
      flushNumbered();
      const clean = line.replace(/^[\*\-]\s+/, '').trim();
      const parsedItem = extractTitleAndText(clean);
      currentBulletItems.push(parsedItem);
      continue;
    }

    // Numbered line: 1. 2. etc.
    if (/^\d+\.\s+/.test(line)) {
      flushBullets();
      const clean = line.replace(/^\d+\.\s+/, '').trim();
      const parsedItem = extractTitleAndText(clean);
      currentNumberedItems.push(parsedItem);
      continue;
    }

    // Check if line contains inline bullet points like "Key Strategic Benefits: * **Immediate..."
    if (line.includes(' * **') || line.includes(' - **')) {
      flushBullets();
      flushNumbered();

      // Split by ` * ` or ` - `
      const parts = line.split(/(?=\s*[\*\-]\s+\*\*)/);
      if (parts.length > 1) {
        const intro = parts[0].trim();
        if (intro) {
          if (intro.endsWith(':')) {
            blocks.push({ type: 'h3', content: intro });
          } else {
            blocks.push({ type: 'paragraph', content: intro });
          }
        }

        const bulletParts = parts.slice(1).map(p => p.replace(/^\s*[\*\-]\s+/, '').trim()).filter(Boolean);
        if (bulletParts.length > 0) {
          blocks.push({
            type: 'bullets',
            items: bulletParts.map(extractTitleAndText)
          });
        }
        continue;
      }
    }

    // If line ends with a colon and is short, treat as H3 subtitle (e.g. "Key Strategic Benefits:")
    if (line.endsWith(':') && line.length < 80 && !line.includes('.')) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'h3',
        content: line
      });
      continue;
    }

    // Callout box if mentions Warranty or Guarantee
    if ((line.includes('Warranty') || line.includes('Guarantee') || line.includes('Free Replacement')) && line.length < 300) {
      flushBullets();
      flushNumbered();
      blocks.push({
        type: 'callout',
        content: line
      });
      continue;
    }

    // Normal paragraph line
    flushBullets();
    flushNumbered();
    blocks.push({
      type: 'paragraph',
      content: line
    });
  }

  flushBullets();
  flushNumbered();

  return blocks;
}

// Extract **Title:** from text
function extractTitleAndText(itemText: string): { title?: string; text: string } {
  const match = itemText.match(/^\*\*([^*]+)\*\*:\s*(.*)$/);
  if (match) {
    return {
      title: match[1].trim(),
      text: match[2].trim()
    };
  }

  const matchAlt = itemText.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
  if (matchAlt && matchAlt[2]) {
    return {
      title: matchAlt[1].trim(),
      text: matchAlt[2].trim()
    };
  }

  return { text: itemText };
}

// Helper for rendering inline bold (**text**), links ([text](url)), and code (`code`)
function renderInlineFormatting(text: string): React.ReactNode {
  if (!text) return null;

  // Regex to split by markdown bold, links, code
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Code `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-800 rounded font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Link [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith('http');
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-emerald-600 hover:text-emerald-800 font-bold underline decoration-emerald-300 underline-offset-2 inline-flex items-center gap-0.5"
        >
          <span>{linkMatch[1]}</span>
          {isExternal && <ExternalLink className="w-3 h-3 inline" />}
        </a>
      );
    }

    return part;
  });
}

import { Editor } from 'obsidian';
import * as R from 'ramda';

export interface BaseFormatterSetting {
  objectType: string;
  des: string;
  icon: string;
  text: string;
  type: string;
}

export interface FormatterSetting extends BaseFormatterSetting {
  symbol: string;
  shift: number;
  selectionInput: number;
  newLine: boolean;
  enclose: boolean;
}

export const formatSettings: Record<string, FormatterSetting> = {
	h1: {
		des: "h1",
		icon: "h1",
		symbol: "# ",
		shift: 2,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	h2: {
		des: "h2",
		icon: "h2",
		symbol: "## ",
		shift: 3,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	h3: {
		des: "h3",
		icon: "h3",
		symbol: "### ",
		shift: 4,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	h4: {
		des: "h4",
		icon: "h4",
		symbol: "#### ",
		shift: 5,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	h5: {
		des: "h5",
		icon: "h5",
		symbol: "##### ",
		shift: 6,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	h6: {
		des: "h6",
		icon: "h6",
		symbol: "###### ",
		shift: 7,
		selectionInput: 0,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	bold: {
		des: "bold",
		icon: "bold",
		symbol: "****",
		shift: 2,
		selectionInput: 2,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	italic: {
		des: "italic",
		icon: "italic",
		symbol: "__",
		shift: 1,
		selectionInput: 1,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	underline: {
		des: "underline",
		icon: "underline",
		symbol: "<u></u>",
		shift: 3,
		selectionInput: 3,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	highlight: {
		des: "highlight",
		icon: "highlight",
		symbol: "====",
		shift: 2,
		selectionInput: 2,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	hr: {
		des: "hr",
		icon: "hr",
		symbol: "***",
		shift: 3,
		selectionInput: 3,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	exp: {
		des: "exp",
		icon: "exp",
		symbol: "${}",
		shift: 2,
		selectionInput: 2,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	dataview: {
		des: "dataview",
		icon: "dataview",
		symbol: "```dataview \n \n```",
		shift: 14,
		selectionInput: 14,
		newLine: true,
		enclose: true,
		objectType: "formatterSetting",
	},
	dataviewJS: {
		des: "dataviewjs",
		icon: "dataview",
		symbol: "```dataviewjs \n \n```",
		shift: 16,
		selectionInput: 16,
		newLine: true,
		enclose: true,
		objectType: "formatterSetting",
	},
	mermaidBlock: {
		des: "mermaid_block",
		icon: "mermaidBlock",
		symbol: "```mermaid \n \n```",
		shift: 13,
		selectionInput: 12,
		newLine: true,
		enclose: true,
		objectType: "formatterSetting",
	},
	codeBlock: {
		des: "code_block",
		icon: "codeBlock",
		symbol: "``` \n \n```",
		shift: 5,
		selectionInput: 5,
		newLine: true,
		enclose: true,
		objectType: "formatterSetting",
	},
	codeInline: {
		des: "code_inline",
		icon: "codeInline",
		symbol: "``",
		shift: 1,
		selectionInput: 1,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	link: {
		des: "link",
		icon: "link",
		symbol: "[]()",
		shift: 3,
		selectionInput: 1,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	internalLink: {
		des: "internal_link",
		icon: "fileLink",
		symbol: "[[]]",
		shift: 2,
		selectionInput: 2,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	image: {
		des: "image",
		icon: "image",
		symbol: "![]()",
		shift: 4,
		selectionInput: 2,
		newLine: false,
		enclose: false,
		objectType: "formatterSetting",
	},
	blockquote: {
		des: "blockquote",
		icon: "quote",
		symbol: "> ",
		shift: 2,
		selectionInput: 0,
		newLine: true,
		enclose: false,
		objectType: "formatterSetting",
	},
	blockquote: {
		des: "callout",
		icon: "quote",
		symbol: "> [!]",
		shift: 4,
		selectionInput: 4,
		newLine: true,
		enclose: false,
		objectType: "formatterSetting",
	},
	bulletList: {
		des: "bullet_list",
		icon: "bulletList",
		symbol: "- ",
		shift: 2,
		selectionInput: 0,
		newLine: true,
		enclose: false,
		objectType: "formatterSetting",
	},
	numberList: {
		des: "number_list",
		icon: "numberList",
		symbol: "1. ",
		shift: 3,
		selectionInput: 0,
		newLine: true,
		enclose: false,
		objectType: "formatterSetting",
	},
	checkList: {
		des: "check_list",
		icon: "checkList",
		symbol: "- [ ] ",
		shift: 6,
		selectionInput: 0,
		newLine: true,
		enclose: false,
		objectType: "formatterSetting",
	},
};

const headerDescriptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const inlineDescriptions = [
  'bold',
  'italic',
  'strikethrough',
  'code_inline',
  'link',
  'internal_link',
  'image',
  'underline',
  'highlight',
];

const blockDescriptions = ['code_block', 'mermaid_block'];
const listDescriptions = ['blockquote', 'bullet_list', 'number_list', 'check_list'];

// --- Helper: aggressively sanitize heading text while preserving code, links, and math
function sanitizeHeadingText(text) {
	if (!text) return "";
	let t = String(text);
	const stash = [];
	const protect = (regex) => {
		t = t.replace(regex, (m) => {
			stash.push(m);
			return `\u0000${stash.length - 1}\u0000`;
		});
	};
	// Protect display/inline math, inline code, images, and links so we don't strip inside them
	protect(/\$\$[\s\S]*?\$\$/g);
	protect(/\$[^$\n]+\$/g);
	protect(/`[^`]*`/g);
	protect(/!\[[^\]]*\]\([^\)]+\)/g);
	protect(/\[[^\]]+\]\([^\)]+\)/g);

	// Strip markdown emphasis/strike tokens while keeping the inner text
	// Use non-greedy to avoid spanning across protected placeholders
	t = t
		.replace(/\*\*([\s\S]*?)\*\*/g, "$1")
		.replace(/__([\s\S]*?)__/g, "$1")
		.replace(/\*([\s\S]*?)\*/g, "$1")
		.replace(/_([\s\S]*?)_/g, "$1")
		.replace(/~~([\s\S]*?)~~/g, "$1");

	// Remove any stray isolated emphasis tokens left around word boundaries
	t = t.replace(/(^|\s)([*_~]{1,2})(?=\s|$)/g, "$1");

	// Restore protected segments
	t = t.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)]);
	return t;
}

// Entry point// Entry point
export function iconFormatter(editor: Editor, item: FormatterSetting) {
  if (!editor) return;

  const isSelection = editor.somethingSelected();
  const selection = editor.getSelection();
  const cursorStart = editor.getCursor('from') as EditorPosition;
  const line = editor.getLine(cursorStart.line);

  editor.focus();

  if (headerDescriptions.includes(item.des)) {
    handleHeaderFormatting(editor, item, cursorStart, line);
  } else if (inlineDescriptions.includes(item.des)) {
    handleInlineFormatting(editor, item, isSelection, selection, cursorStart);
  } else if (blockDescriptions.includes(item.des)) {
    handleBlockFormatting(editor, item, isSelection, selection, cursorStart, line);
  } else if (listDescriptions.includes(item.des)) {
    handleListFormatting(editor, item, isSelection, selection, cursorStart, line);
  }
}

// Headings (H1–H6) with aggressive sanitization
function handleHeaderFormatting(
  editor: Editor,
  item: FormatterSetting,
  cursorStart: EditorPosition,
  line: string
) {
  const escaped = item.symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reExact = new RegExp('^\\s*' + escaped + '+\\s*');
  const reAny = /^\s*#+\s*/;

  const base = line.replace(reAny, '');
  const cleanedLine = sanitizeHeadingText(base);

  const replacement = reExact.test(line) ? cleanedLine : item.symbol + cleanedLine;

  editor.replaceRange(
    replacement,
    { line: cursorStart.line, ch: 0 },
    { line: cursorStart.line, ch: line.length }
  );
  editor.setCursor(cursorStart.line, replacement.length);
}

// Inline (wrap selection or insert markers)
function handleInlineFormatting(
  editor: Editor,
  item: FormatterSetting,
  isSelection: boolean,
  selection: string,
  cursorStart: EditorPosition
) {
  if (isSelection) {
    editor.replaceSelection(
      item.symbol.substring(0, item.selectionInput) +
        selection +
        item.symbol.substring(item.selectionInput)
    );
    editor.setCursor(cursorStart.line, cursorStart.ch + selection.length + item.shift);
  } else {
    editor.replaceRange(item.symbol, cursorStart);
    editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
  }
}

// Code/mermaid fenced blocks (robust wrap/unwrap, optional lang preservation)
function handleBlockFormatting(
  editor: Editor,
  item: FormatterSetting,
  isSelection: boolean,
  selection: string,
  cursorStart: EditorPosition,
  line: string
) {
  const openingFenceLine = (s: string) => /^```/.test(s.trim());     // ``` or ```lang
  const closingFenceLine = (s: string) => /^```\s*$/.test(s.trim());  // closing ```
  const getPrevLang = (s: string) => {
    const m = s.trim().match(/^```(\S+)/);
    return m ? m[1] : null;
  };

  editor.operation(() => {
    if (isSelection) {
      // Normalize only for detection (preserve original content when writing back)
      const rawDetect = selection.replace(/\r\n?/g, '\n');
      const lines = rawDetect.split('\n');

      const startsFence = lines.length >= 1 && openingFenceLine(lines[0]);
      const endsFence = lines.length >= 2 && closingFenceLine(lines[lines.length - 1]);

      // Unwrap only when both fences are present
      if (startsFence && endsFence) {
        const prevLang = getPrevLang(lines[0]);
        const inner = lines.slice(1, -1).join('\n');

        // For generic code blocks, optionally preserve previous language
        if (item.des === 'code_block' && prevLang) {
          const open = '```' + prevLang;
          const close = '```';
          editor.replaceSelection(`${open}\n${inner}\n${close}`);
          editor.setCursor({ line: cursorStart.line + 1, ch: 0 });
        } else {
          // Pure unwrap
          editor.replaceSelection(inner);
        }
        return;
      }

      // Guard against partial fence selection (avoid double-wrapping)
      if (startsFence !== endsFence) {
        return;
      }

      // Wrap selection verbatim
      const before = item.symbol.substring(0, item.selectionInput);
      const after = item.symbol.substring(item.selectionInput);
      editor.replaceSelection(`${before}\n${selection}${after}`);

      // Caret on first inner line
      editor.setCursor({ line: cursorStart.line + 1, ch: 0 });
    } else {
      // Insert a new block at EOL (or BOL if the line is empty)
      const insertPos: EditorPosition = { line: cursorStart.line, ch: line.trim() ? line.length : 0 };
      const text = line.trim() ? `\n${item.symbol}` : item.symbol;

      editor.replaceRange(text, insertPos);

      // Move caret into the block body (line after opening fence)
      const lineOffset = line.trim() ? 1 : 0;
      editor.setCursor({ line: insertPos.line + lineOffset + 1, ch: 0 });
    }
  });
}

// Lists & blockquotes (normalize, toggle, prevent stacking)
// - Replaces existing list markers with chosen one
// - Toggle-off if all selected lines already match the target
// - Preserves indent and checkbox state when converting to checklist
function handleListFormatting(
  editor: Editor,
  item: FormatterSetting,
  isSelection: boolean,
  selection: string,
  cursorStart: EditorPosition,
  line: string
) {
  const RE_INDENT = /^\s*/;
  const RE_CHECK = /^\s*[-*+]\s*$begin:math:display$(?: |x|X)$end:math:display$\s+/;   // - [ ] or - [x]
  const RE_BARE_CHECK = /^\s*$begin:math:display$(?: |x|X)$end:math:display$\s+/;      // [ ] or [x] without dash
  const RE_NUM = /^\s*\d+\.\s+/;                     // 1. 
  const RE_BULLET = /^\s*[-*+]\s+/;                  // -, *, +
  const RE_BQ = /^\s*>\s+/;                          // >

  const applyMarker = (indent: string, content: string, raw?: string) => {
    switch (item.des) {
      case 'bullet_list':
        return `${indent}- ${content}`;
      case 'number_list':
        return `${indent}1. ${content}`; // let Obsidian renumber
      case 'check_list': {
        const wasChecked = raw ? /^\s*(?:[-*+]\s*)?$begin:math:display$x$end:math:display$\s+/i.test(raw) : false;
        return `${indent}- [${wasChecked ? 'x' : ' '}] ${content}`;
      }
      case 'blockquote':
        return `${indent}> ${content}`;
      default:
        return `${indent}${content}`;
    }
  };

  const isTarget = (raw: string) => {
    switch (item.des) {
      case 'bullet_list':
        return RE_BULLET.test(raw) && !RE_CHECK.test(raw) && !RE_NUM.test(raw);
      case 'number_list':
        return RE_NUM.test(raw);
      case 'check_list':
        return RE_CHECK.test(raw) || RE_BARE_CHECK.test(raw);
      case 'blockquote':
        return RE_BQ.test(raw);
      default:
        return false;
    }
  };

  const stripExisting = (raw: string) => {
    const indent = (raw.match(RE_INDENT) || [''])[0];
    let text = raw
      .replace(RE_CHECK, '')
      .replace(RE_BARE_CHECK, '')
      .replace(RE_NUM, '')
      .replace(RE_BULLET, '')
      .replace(RE_BQ, '');
    return { indent, text: text.trimStart() };
  };

  const formatLine = (raw: string, toggleIfSame: boolean) => {
    const alreadyTarget = isTarget(raw);
    const { indent, text } = stripExisting(raw);
    if (toggleIfSame && alreadyTarget) return `${indent}${text}`;
    return applyMarker(indent, text, raw);
  };

  editor.operation(() => {
    if (isSelection) {
      const lines = selection.split('\n');
      const allAlreadyTarget = lines.length > 0 && lines.every((l) => isTarget(l));
      const converted = lines.map((l) => formatLine(l, allAlreadyTarget));
      editor.replaceSelection(converted.join('\n'));
    } else {
      const converted = formatLine(line, /*toggleIfSame*/ true);
      editor.replaceRange(
        converted,
        { line: cursorStart.line, ch: 0 },
        { line: cursorStart.line, ch: line.length }
      );
    }
  });
}

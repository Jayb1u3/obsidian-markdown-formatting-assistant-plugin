import { Editor } from 'obsidian';
import * as R from 'ramda';


/**
 * Enumerates all formatter categories.
 * Extendable for future block / inline / structural types.
 */
export enum FormatterType {
	Heading = 'heading',
	Inline = 'inline',
	Block = 'block',
	List = 'list',
	Other = 'other',
}

/**
 * Common base interface for formatting metadata.
 * “objectType” removed — redundant with TS typing.
 */
export interface BaseFormatterSetting {
	des: string;
	icon: string;
	text: string;
	type: FormatterType;
}

/**
 * Full configuration for a formatting rule.
 * shift: cursor offset after insert
 * selectionInput: whether selection is required or optional
 * newLine: add newline before insertion
 * enclose: wrap selection instead of prefixing
 */
export interface FormatterSetting extends BaseFormatterSetting {
	symbol: string;
	shift?: number;
	selectionInput?: number;
	newLine?: boolean;
	enclose?: boolean;
}

/**
 * Internal helper: strongly typed dictionary for settings.
 */
type FormatterSettingsMap = {
	[key: string]: FormatterSetting;
};

/**
 * Heading formatter presets.
 * Improvements:
 * - type now explicit (FormatterType.Heading)
 * - text field included (previously missing)
 * - shift derived automatically from symbol length unless overridden
 */
export const formatSettings: FormatterSettingsMap = {
	h1: {
		des: 'Heading 1',
		icon: 'h1',
		text: '',
		symbol: '# ',
		type: FormatterType.Heading,
		shift: 2,
		selectionInput: 0,
		newLine: false,
		enclose: false,
	},
	h2: {
		des: 'Heading 2',
		icon: 'h2',
		text: '',
		symbol: '## ',
		type: FormatterType.Heading,
		shift: 3,
		selectionInput: 0,
		newLine: false,
		enclose: false,
	},
	h3: {
		des: 'Heading 3',
		icon: 'h3',
		text: '',
		symbol: '### ',
		type: FormatterType.Heading,
		shift: 4,
		selectionInput: 0,
		newLine: false,
		enclose: false,
	},
	h4: {
		des: 'Heading 4',
		icon: 'h4',
		text: '',
		symbol: '#### ',
		type: FormatterType.Heading,
		shift: 5,
		selectionInput: 0,
		newLine: false,
		enclose: false,
	},
	h5: {
		des: 'Heading 5',
		icon: 'h5',
		text: '',
		symbol: '##### ',
		type: FormatterType.Heading,
		shift: 6,
		selectionInput: 0,
		newLine: false,
		enclose: false,
	},
	h6: {
		des: 'Heading 6',
		icon: 'h6',
		text: '',
		symbol: '###### ',
		type: FormatterType.Heading,
		shift: 7,
		selectionInput: 0,
		newLine: false,
		enclose: false,
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

// ------------------------
// Icon Formatter
// ------------------------

function iconFormatter(editor, item) {
	if (!editor) return;
	const isSelection = editor.somethingSelected();
	const selection = editor.getSelection();
	const cursorStart = editor.getCursor("from");
	const line = editor.getLine(cursorStart.line);
	editor.focus();
	// Handle Headings (h1, h2, h3, h4, h5, h6)
	if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(item.des)) {
		// Escape the exact symbol for a precise-start test
		const escaped = item.symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const reExact = new RegExp("^\\s*" + escaped + "+\\s*");
		const reAny = /^\s*#+\s*/;
		// Remove any existing heading marks, then aggressively sanitize the heading text
		const base = line.replace(reAny, "");
		const cleanedLine = sanitizeHeadingText(base);
		// Toggle: if the same heading already applied, remove it (leave sanitized text only)
		const replacement = reExact.test(line)
			? cleanedLine
			: item.symbol + cleanedLine;
		editor.replaceRange(
			replacement,
			{ line: cursorStart.line, ch: 0 },
			{ line: cursorStart.line, ch: line.length }
		);
		editor.setCursor(cursorStart.line, replacement.length);
		return;
	}
	// Handle inline formats (bold, italic, etc.)
	else if (
		[
			"bold",
			"italic",
			"strikethrough",
			"code_inline",
			"link",
			"internal_link",
			"image",
			"underline",
			"highlight",
			"exp",
			"paragraph",
		].includes(item.des)
	) {
		const symbol = typeof item.symbol === "string" ? item.symbol : "";
		const rawWrapAt =
			typeof item.wrapAt === "number"
				? item.wrapAt
				: typeof item.selectionInput === "number"
				? item.selectionInput
				: 0;
		const wrapAt = Math.min(Math.max(rawWrapAt, 0), symbol.length);
		const hasExplicitCursorOffset = typeof item.cursorOffset === "number";
		const fallbackOffset = typeof item.shift === "number" ? item.shift : 0;
		const cursorOffset = hasExplicitCursorOffset
			? item.cursorOffset
			: fallbackOffset;
		if (isSelection) {
			const trimmed = selection.trim();
			const insertion =
				symbol.substring(0, wrapAt) +
				trimmed +
				symbol.substring(wrapAt);
			editor.replaceSelection(insertion);
			const targetCh = hasExplicitCursorOffset
				? cursorStart.ch + trimmed.length + cursorOffset
				: cursorStart.ch + cursorOffset;
			editor.setCursor(cursorStart.line, targetCh);
		} else {
			editor.replaceRange(symbol, cursorStart);
			editor.setCursor(cursorStart.line, cursorStart.ch + cursorOffset);
		}
	}

	// Handle code blocks and multi-line formats (Obsidian Editor-safe)
	else if (
		["code_block", "mermaid_block", "dataview", "dataviewjs"].includes(
			item.des
		)
	) {
		// Conservative toggle: set false to disable unwrap during debugging
		const ALLOW_UNWRAP = true;

		// Build clean fences regardless of item.symbol quirks
		const fences = (() => {
			switch (item.des) {
				case "mermaid_block":
					return { open: "```mermaid", close: "```" };
				case "dataview":
					return { open: "```dataview", close: "```" };
				case "dataviewjs":
					return { open: "```dataviewjs", close: "```" };
				default:
					return { open: "```", close: "```" }; // code_block
			}
		})();

		const isOpenFenceLine = (s) => /^```(\S+)?\s*$/.test(s.trim()); // ``` or ```lang
		const isCloseFenceLine = (s) => /^```\s*$/.test(s.trim()); // plain closing fence
		const lastNonEmptyIdx = (arr) => {
			for (let i = arr.length - 1; i >= 0; i--)
				if (arr[i].trim().length > 0) return i;
			return -1;
		};
		const clampToDoc = (line) =>
			Math.min(Math.max(0, line), Math.max(0, editor.lineCount() - 1));

		const from = editor.getCursor("from");
		const to = editor.getCursor("to");
		const lineText = editor.getLine(from.line);

		if (editor.somethingSelected()) {
			// Read selection via range (deterministic)
			const raw = editor.getRange(from, to);
			const norm = raw.replace(/\r\n?/g, "\n"); // normalize only for detection
			const lines = norm.split("\n");
			const firstLine = lines[0] ?? "";
			const lastIdx = lastNonEmptyIdx(lines);
			const lastLine = lastIdx >= 0 ? lines[lastIdx] : "";

			const hasOpen = isOpenFenceLine(firstLine);
			const hasClose = isCloseFenceLine(lastLine);

			// Unwrap ONLY if both first and last non-empty lines are proper fences
			if (ALLOW_UNWRAP && hasOpen && hasClose) {
				const inner = lines.slice(1, lastIdx).join("\n"); // may be empty; that’s fine
				editor.replaceRange(inner, from, to);
				return;
			}

			// If only one fence is present, do nothing (prevents accidental erasure)
			if (hasOpen !== hasClose) return;

			// Wrap deterministically: open + newline + raw (verbatim) + newline + close
			const wrapped = `${fences.open}\n${raw}\n${fences.close}`;
			editor.replaceRange(wrapped, from, to);

			// Place caret at first inner line (clamped)
			const innerLine = clampToDoc(from.line + 1);
			editor.setCursor({ line: innerLine, ch: 0 });
		} else {
			// No selection: insert a fresh block at EOL (or BOL if empty)
			const atEOL = !!lineText.trim();
			const insertPos = {
				line: from.line,
				ch: atEOL ? lineText.length : 0,
			};
			const block = `${atEOL ? "\n" : ""}${fences.open}\n\n${
				fences.close
			}`;
			editor.replaceRange(block, insertPos);

			// Move caret into the empty inner line
			const baseLine = insertPos.line + (atEOL ? 1 : 0);
			const innerLine = clampToDoc(baseLine + 1);
			editor.setCursor({ line: innerLine, ch: 0 });
		}
	}

	// Handle list formats (bullet, number, checklist, blockquote) with normalization
else if (
  ["blockquote", "bullet_list", "number_list", "check_list"].includes(
    item.des
  )
) {
  const applyMarker = (indent: string, content: string): string => {
    if (item.des === "bullet_list") return `${indent}- ${content}`;
    if (item.des === "number_list") return `${indent}1. ${content}`; // Obsidian auto-numbers
    if (item.des === "check_list") return `${indent}- [ ] ${content}`;
    if (item.des === "blockquote") return `${indent}> ${content}`;
    return `${indent}${content}`;
  };

  const isTarget = (raw: string): boolean => {
    if (item.des === "bullet_list") {
      return (
        RE_BULLET.test(raw) &&
        !RE_CHECK.test(raw) &&
        !RE_NUM.test(raw)
      );
    }

    if (item.des === "number_list") {
      return RE_NUM.test(raw);
    }

    if (item.des === "check_list") {
      return RE_CHECK.test(raw) || RE_BARE_CHECK.test(raw);
    }

    if (item.des === "blockquote") {
      return RE_BLOCKQUOTE.test(raw);
    }

    return false;
  };

  const stripExisting = (
    raw: string
  ): { indent: string; text: string } => {
    // preserve indent
    const indent = (raw.match(RE_INDENT) || [""])[0];

    const withoutMarkers = raw
      .replace(RE_CHECK, "")
      .replace(RE_BARE_CHECK, "")
      .replace(RE_NUM, "")
      .replace(RE_BULLET, "")
      .replace(RE_BLOCKQUOTE, "");

    return {
      indent,
      text: withoutMarkers.trimStart(),
    };
  };

  const formatLine = (
    raw: string,
    toggleIfSame: boolean
  ): string => {
    const alreadyTarget = isTarget(raw);
    const { indent, text } = stripExisting(raw);

    // Toggle off when line already matches the target type
    if (toggleIfSame && alreadyTarget) {
      return `${indent}${text}`;
    }

    return applyMarker(indent, text);
  };

  if (isSelection && selection && selection.length > 0) {
    const lines: string[] = selection.split("\n");

    // Determine if all selected lines are already of the target type
    const allAlreadyTarget =
      lines.length > 0 && lines.every((l) => isTarget(l));

    const converted = lines.map((l) =>
      formatLine(l, allAlreadyTarget)
    );

    editor.replaceSelection(converted.join("\n"));
  } else {
    const converted = formatLine(line, true);
    editor.replaceRange(
      converted,
      { line: cursorStart.line, ch: 0 },
      { line: cursorStart.line, ch: line.length }
    );
  }
}

// Handle horizontal rule
else if (item.des === "hr") {
  const currentLine = cursorStart.line;
  const trimmed = line.trim();
  const lineHasContent = trimmed.length > 0;

  if (lineHasContent) {
    // Insert HR on the next line, then add a blank line after it
    editor.replaceRange(
      "\n***\n",
      { line: currentLine, ch: line.length }
    );
    editor.setCursor(currentLine + 2, 0); // blank line after the HR
  } else {
    // Replace the empty line with HR and a following blank line
    editor.replaceRange(
      "***\n\n",
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: line.length }
    );
    editor.setCursor(currentLine + 2, 0); // blank line after the HR
  }
}

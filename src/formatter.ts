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
    des: 'h1', icon: 'h1', symbol: '# ', shift: 2, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  h2: {
    des: 'h2', icon: 'h2', symbol: '## ', shift: 3, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  h3: {
    des: 'h3', icon: 'h3', symbol: '### ', shift: 4, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  h4: {
    des: 'h4', icon: 'h4', symbol: '#### ', shift: 5, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  h5: {
    des: 'h5', icon: 'h5', symbol: '##### ', shift: 6, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  h6: {
    des: 'h6', icon: 'h6', symbol: '###### ', shift: 7, selectionInput: 0, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  bold: {
    des: 'bold', icon: 'bold', symbol: '<b></b>', shift: 3, selectionInput: 3, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  italic: {
    des: 'italic', icon: 'italic', symbol: '<i></i>', shift: 3, selectionInput: 3, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  underline: {
    des: 'underline', icon: 'underline', symbol: '<u></u>', shift: 3, selectionInput: 3, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  strikethrough: {
    des: 'strikethrough', icon: 'strikethrough', symbol: '~~~~', shift: 2, selectionInput: 2, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  highlight: {
    des: 'highlight', icon: 'highlight', symbol: '========', shift: 4, selectionInput: 4, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  codeBlock: {
    des: 'code_block', icon: 'codeBlock', symbol: '``` \n```', shift: 4, selectionInput: 4, newLine: true, enclose: true, objectType: 'formatterSetting',
  },
  mermaidBlock: {
    des: 'mermaid_block', icon: 'mermaidBlock', symbol: '```mermaid \n```', shift: 4, selectionInput: 4, newLine: true, enclose: true, objectType: 'formatterSetting',
  },
  codeInline: {
    des: 'code_inline', icon: 'codeInline', symbol: '``', shift: 1, selectionInput: 1, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  link: {
    des: 'link', icon: 'link', symbol: '[]()', shift: 3, selectionInput: 1, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  internalLink: {
    des: 'internal_link', icon: 'fileLink', symbol: '[[]]', shift: 2, selectionInput: 2, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  image: {
    des: 'image', icon: 'image', symbol: '![]()', shift: 4, selectionInput: 2, newLine: false, enclose: false, objectType: 'formatterSetting',
  },
  blockquote: {
    des: 'blockquote', icon: 'quote', symbol: '> ', shift: 2, selectionInput: 0, newLine: true, enclose: false, objectType: 'formatterSetting',
  },
  bulletList: {
    des: 'bullet_list', icon: 'bulletList', symbol: '- ', shift: 2, selectionInput: 0, newLine: true, enclose: false, objectType: 'formatterSetting',
  },
  numberList: {
    des: 'number_list', icon: 'numberList', symbol: '1. ', shift: 3, selectionInput: 0, newLine: true, enclose: false, objectType: 'formatterSetting',
  },
  checkList: {
    des: 'check_list', icon: 'checkList', symbol: '- [ ] ', shift: 6, selectionInput: 0, newLine: true, enclose: false, objectType: 'formatterSetting',
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
const listDescriptions = [
  'blockquote',
  'bullet_list',
  'number_list',
  'check_list',
];

export function iconFormatter(editor: Editor, item: FormatterSetting) {
  if (!editor) return;

  const isSelection = editor.somethingSelected();
  const selection = editor.getSelection();
  const cursorStart = editor.getCursor('from');
  const cursorEnd = editor.getCursor('to');
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

function handleHeaderFormatting(editor: Editor, item: FormatterSetting, cursorStart: CodeMirror.Position, line: string) {
  const reStringExact = `^\\s*${item.symbol}+\\s*`;
  const reStringAny = '^\\s*#+\\s*';
  const cleanedLine = line.replace(new RegExp(reStringAny, 'g'), '');
  let replacement = item.symbol + cleanedLine;

  if (new RegExp(reStringExact, 'g').test(line)) {
    replacement = cleanedLine;
  }

  editor.replaceRange(replacement, { line: cursorStart.line, ch: 0 }, { line: cursorStart.line, ch: line.length });

  const oldNumberOfHeadings = (line.match(/#/g) || []).length;
  const newNumberOfHeadings = (replacement.match(/#/g) || []).length;
  let cursorCorrection = newNumberOfHeadings - oldNumberOfHeadings;

  if (newNumberOfHeadings === 0) cursorCorrection -= 1;
  if (oldNumberOfHeadings === 0) cursorCorrection += 1;

  editor.setCursor(cursorStart.line, cursorStart.ch + cursorCorrection);
}

function handleInlineFormatting(editor: Editor, item: FormatterSetting, isSelection: boolean, selection: string, cursorStart: CodeMirror.Position) {
  if (isSelection) {
    editor.replaceSelection(
      item.symbol.substring(0, item.selectionInput) +
      selection +
      item.symbol.substring(item.selectionInput),
    );
    editor.setCursor(cursorStart.line, cursorStart.ch + selection.length + item.shift);
  } else {
    editor.replaceRange(item.symbol, cursorStart);
    editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
  }
}

function handleBlockFormatting(editor: Editor, item: FormatterSetting, isSelection: boolean, selection: string, cursorStart: CodeMirror.Position, line: string) {
  if (isSelection) {
    const re = /^(```).*(```)$/gs;
    const match = selection.trim().match(re);
    let replacement = selection.trim();

    if (match) {
      replacement = selection.trim().replace(/^(```)/g, '').replace(/(```)$/g, '');
      editor.replaceSelection(replacement);
    } else {
      editor.replaceSelection(`${item.symbol.substring(0, item.selectionInput)}\n${replacement}${item.symbol.substring(item.selectionInput)}`);
      editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
    }
  } else {
    let replacement = item.symbol;
    if (line.trim()) {
      editor.replaceRange(`\n${replacement}`, { line: cursorStart.line, ch: line.length });
    } else {
      editor.replaceRange(replacement, cursorStart);
    }
    editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
  }
}

function handleListFormatting(editor: Editor, item: FormatterSetting, isSelection: boolean, selection: string, cursorStart: CodeMirror.Position, line: string) {
  const reString = `^\\s*${item.symbol}\\s*`.replace('[', '\\[').replace(']', '\\]');
  const re = new RegExp(reString, 'gm');

  if (isSelection) {
    const selectionLines = selection.split('\n');
    const allItems = selectionLines.every((lineOfSelection) => re.test(lineOfSelection));
    
    const convertedSelectionLines = selectionLines.map((newLine) => {
      if (allItems) {
        return newLine.replace(re, '');
      } else {
        return re.test(newLine.trim()) ? newLine : `${item.symbol}${newLine.trim()}`;
      }
    });

    editor.replaceSelection(convertedSelectionLines.join('\n'));
  } else {
    const match = line.trim().match(re);
    const replacement = match ? line.replace(re, '') : `${item.symbol}${line.replace(re, '')}`;
    
    editor.replaceRange(replacement, { line: cursorStart.line, ch: 0 }, { line: cursorStart.line, ch: line.length });
  }
}

import { Editor } from 'obsidian';

export interface calloutsFormatterSetting {
  des: string;
  text: string;
  icon: string;
  color: string;
  bgColor: string;
  symbol: string;
  shift: number;
  selectionInput: number;
  newLine: boolean;
}

export const calloutsFormatterSettings = {
  note: {
    des: 'note',
    text: 'Note',
    icon: 'lucide-pencil',
    color: 'rgb(68,138,255)',
    bgColor: 'rgba(68,138,255,0.1)',
    symbol: '> [!note] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  info: {
    des: 'info',
    text: 'Info',
    icon: 'lucide-info',
    color: 'rgb(0,184,212)',
    bgColor: 'rgba(0,184,212,0.1)',
    symbol: '> [!info] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  todo: {
    des: 'todo',
    text: 'Todo',
    icon: 'lucide-check-circle-2',
    color: 'rgb(0,184,212)',
    bgColor: 'rgba(0,184,212,0.1)',
    symbol: '> [!todo] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  abstract: {
    des: 'abstract',
    text: 'Abstract',
    icon: 'lucide-clipboard-list',
    color: 'rgb(0, 176, 255)',
    bgColor: 'rgba(0, 176, 255,0.1)',
    symbol: '> [!abstract] \n>  ',
    shift: 17,
    selectionInput: 17,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  summary: {
    des: 'summary',
    text: 'Summary',
    icon: 'lucide-clipboard-list',
    color: 'rgb(0, 176, 255)',
    bgColor: 'rgba(0, 176, 255,0.1)',
    symbol: '> [!summary] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  tldr: {
    des: 'tldr',
    text: 'TLDR',
    icon: 'lucide-clipboard-list',
    color: 'rgb(0, 176, 255)',
    bgColor: 'rgba(0, 176, 255,0.1)',
    symbol: '> [!tldr] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  //step 2
  tip: {
    des: 'tip',
    text: 'Tip',
    icon: 'lucide-flame',
    color: 'rgb(0, 191, 165)',
    bgColor: 'rgba(0, 191, 165,0.1)',
    symbol: '> [!tip] \n>  ',
    shift: 12,
    selectionInput: 12,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  hint: {
    des: 'hint',
    text: 'Hint',
    icon: 'lucide-flame',
    color: 'rgb(0, 191, 165)',
    bgColor: 'rgba(0, 191, 165,0.1)',
    symbol: '> [!hint] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  important: {
    des: 'important',
    text: 'Important',
    icon: 'lucide-flame',
    color: 'rgb(0, 191, 165)',
    bgColor: 'rgba(0, 191, 165,0.1)',
    symbol: '> [!important] \n>  ',
    shift: 18,
    selectionInput: 18,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  success: {
    des: 'success',
    text: 'Success',
    icon: 'lucide-check',
    color: 'rgb(0, 200, 83)',
    bgColor: 'rgba(0, 200, 83,0.1)',
    symbol: '> [!success] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  check: {
    des: 'check',
    text: 'Check',
    icon: 'lucide-check',
    color: 'rgb(0, 200, 83)',
    bgColor: 'rgba(0, 200, 83,0.1)',
    symbol: '> [!check] \n>  ',
    shift: 14,
    selectionInput: 14,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  done: {
    des: 'done',
    text: 'Done',
    icon: 'lucide-check',
    color: 'rgb(0, 200, 83)',
    bgColor: 'rgba(0, 200, 83,0.1)',
    symbol: '> [!done] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  question: {
    des: 'question',
    text: 'Question',
    icon: 'help-circle',
    color: 'rgb(100, 221, 23)',
    bgColor: 'rgba(100, 221, 23,0.1)',
    symbol: '> [!question] \n>  ',
    shift: 17,
    selectionInput: 17,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  help: {
    des: 'help',
    text: 'Help',
    icon: 'help-circle',
    color: 'rgb(100, 221, 23)',
    bgColor: 'rgba(100, 221, 23,0.1)',
    symbol: '> [!help] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  faq: {
    des: 'faq',
    text: 'FAQ',
    icon: 'help-circle',
    color: 'rgb(100, 221, 23)',
    bgColor: 'rgba(100, 221, 23,0.1)',
    symbol: '> [!faq] \n>  ',
    shift: 12,
    selectionInput: 12,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  warning: {
    des: 'warning',
    text: 'Warning',
    icon: 'lucide-alert-triangle',
    color: 'rgb(255, 145, 0)',
    bgColor: 'rgba(255, 145, 0,0.1)',
    symbol: '> [!warning] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  caution: {
    des: 'caution',
    text: 'Caution',
    icon: 'lucide-alert-triangle',
    color: 'rgb(255, 145, 0)',
    bgColor: 'rgba(255, 145, 0,0.1)',
    symbol: '> [!caution] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  attention: {
    des: 'attention',
    text: 'Attention',
    icon: 'lucide-alert-triangle',
    color: 'rgb(255, 145, 0)',
    bgColor: 'rgba(255, 145, 0,0.1)',
    symbol: '> [!attention] \n>  ',
    shift: 18,
    selectionInput: 18,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  failure: {
    des: 'failure',
    text: 'Failure',
    icon: 'lucide-x',
    color: 'rgb(255, 82, 82)',
    bgColor: 'rgba(255, 82, 82,0.1)',
    symbol: '> [!failure] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  fail: {
    des: 'fail',
    text: 'Fail',
    icon: 'lucide-x',
    color: 'rgb(255, 82, 82)',
    bgColor: 'rgba(255, 82, 82,0.1)',
    symbol: '> [!fail] \n>  ',
    shift: 13,
    selectionInput: 13,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  missing: {
    des: 'missing',
    text: 'Missing',
    icon: 'lucide-x',
    color: 'rgb(255, 82, 82)',
    bgColor: 'rgba(255, 82, 82,0.1)',
    symbol: '> [!missing] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  danger: {
    des: 'danger',
    text: 'Danger',
    icon: 'lucide-zap',
    color: 'rgb(255, 23, 68)',
    bgColor: 'rgba(255, 23, 68,0.1)',
    symbol: '> [!danger] \n>  ',
    shift: 15,
    selectionInput: 15,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  error: {
    des: 'error',
    text: 'Error',
    icon: 'lucide-zap',
    color: 'rgb(255, 23, 68)',
    bgColor: 'rgba(255, 23, 68,0.1)',
    symbol: '> [!error] \n>  ',
    shift: 14,
    selectionInput: 14,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  bug: {
    des: 'bug',
    text: 'Bug',
    icon: 'lucide-bug',
    color: 'rgb(245, 0, 87)',
    bgColor: 'rgba(245, 0, 87,0.1)',
    symbol: '> [!bug] \n>  ',
    shift: 12,
    selectionInput: 12,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  example: {
    des: 'example',
    text: 'Example',
    icon: 'lucide-list',
    color: 'rgb(124, 77, 255)',
    bgColor: 'rgba(124, 77, 255,0.1)',
    symbol: '> [!example] \n>  ',
    shift: 16,
    selectionInput: 16,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  quote: {
    des: 'quote',
    text: 'Quote',
    icon: 'quote-glyph',
    color: 'rgb(158, 158, 158)',
    bgColor: 'rgba(158, 158, 158,0.1)',
    symbol: '> [!quote] \n>  ',
    shift: 14,
    selectionInput: 14,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  glyph: {
    des: 'glyph',
    text: 'Glyph',
    icon: 'quote-glyph',
    color: 'rgb(158, 158, 158)',
    bgColor: 'rgba(158, 158, 158,0.1)',
    symbol: '> [!glyph] \n>  ',
    shift: 14,
    selectionInput: 14,
    newLine: false,
    objectType: 'calloutsFormatterSetting',
  },
  
  

};

export function calloutsFormatter(editor: Editor, item: calloutsFormatterSetting) {
  if (editor) {
    const isSelection = editor.somethingSelected;
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();
    if (isSelection) {
      let replacment = selection.trim();

      editor.replaceSelection(
        item.symbol.substring(0, item.selectionInput) +
          replacment +
          item.symbol.substring(item.selectionInput),
      );
      editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    } else {
      editor.replaceRange(item.symbol, curserStart);
      editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    }
  }
}

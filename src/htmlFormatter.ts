import { Editor } from 'obsidian';
import { baseFormatterSetting } from './formatter';

export interface htmlFormatterSetting extends baseFormatterSetting {
  symbol: string;
  shift: number;
  selectionInput: number;
}

export const htmlFormatterSettings = {
  br: {
    des: '<br/>',
    symbol: '<br/>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },
  div: {
    des: '<div>',
    symbol: '<div></div>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },
  span: {
    des: '<span>',
    symbol: '<span></span>',
    shift: 6,
    selectionInput: 6,
    objectType: 'htmlFormatterSetting',
  },
  img: {
    des: '<img>',
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
    objectType: 'htmlFormatterSetting',
  },
  a: {
    des: '<a>',
    symbol: '<a></a>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
  p: {
    des: '<p>',
    symbol: '<p></p>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
  font: {
    des: '<font>',
    symbol:
      '<span style="font-family:default; font-size:default; color:red"></span>',
    shift: 64,
    selectionInput: 64,
    objectType: 'htmlFormatterSetting',
  },
  table: {
    des: '<table>',
    symbol: '<table></table>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  thead: {
    des: '<thead>',
    symbol: '<thead></thead>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tbody: {
    des: '<tbody>',
    symbol: '<tbody></tbody>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tfoot: {
    des: '<tfoot>',
    symbol: '<tfoot></tfoot>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tr: {
    des: '<tr>',
    symbol: '<tr></tr>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  td: {
    des: '<td>',
    symbol: '<td></td>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  th: {
    des: '<th>',
    symbol: '<th></th>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  details: {
    des: '<details>',
    symbol: '<details></details>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },
  summary: {
    des: '<summary>',
    symbol: '<summary></summary>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },
  u: {
    des: '<u>',
    symbol: '<u></u>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
  iframe: {
    des: "<iframe>",
    symbol: `<%*
      const Url = await tp.system.prompt("Enter URL");
      const html = \`<iframe src="\${Url}" width="800" height="600" style="border:none;"></iframe>\`;
      tR += html;
    %>`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  sup: {
    des: "<sup>",
    symbol: "<sup></sup>",
    shift: 5,
    selectionInput: 5,
    objectType: "htmlFormatterSetting",
  },
  sub: {
    des: "<sub>",
    symbol: "<sub></sub>",
    shift: 5,
    selectionInput: 5,
    objectType: "htmlFormatterSetting",
  },
  FMTitle: {
    des: "Frontmatter Title",
    symbol: "<% tp.frontmatter['title'] %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  fileTitle: {
    des: "File Title",
    symbol: "<% tp.file.title %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  promptInput: {
    des: "Prompt for Input",
    symbol: 'const input = await tp.system.prompt("Enter your input");',
    objectType: "htmlFormatterSetting",
  },
  des: "Async Function",
    symbol: 'async function functionName() {\\n}',
    shift: 31,  // Adjusts cursor inside the function body
    selectionInput: 30,  // Positions cursor at the start of the function body
    objectType: "htmlFormatterSetting",
  },  
  appendText: {
    des: "Append Text",
    symbol: "tR += ",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  templaterJSTags: {
    des: "<%* %>",
    symbol: "<%* %> ",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  templaterTags: {
    des: "<% %>",
    symbol: "<% %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  sp: {
    des: "<system.prompt>",
    symbol: '<% tp.system.prompt("") %>',
    shift: 21,
    selectionInput: 21,
    objectType: "htmlFormatterSetting",
  },
  suggesterFunction: {
    des: "Suggester Function",
    symbol: `const choice = await tp.system.suggester(["Option1", "Option2"], ["Option1", "Option2"]);`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  suggesterFunction: {
    des: "Suggest Array",
    symbol: `const suggestions = ["1", "2", "3"]; 
    const suggestions = await tp.system.suggester(suggestions, suggestions, { 
        placeholder: "Select a view type" });
        
        //Check if  the user made a selection and respond accordingly
        if (suggestions) {
          tR += suggestions; //append the selected  option to the document
        } else {
          console.log("No option was selected."); //Log  to console if no selection was made
        }`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  templateLiteral: {
    des: "${}",
    symbol: "${}",
    objectType: "htmlFormatterSetting",
  },
  taskStatus: {
    des: "Task Status",
    symbol:
      '<% tp.system.suggester(["Complete", "Incomplete"], ["Complete", "Incomplete"]) %>',
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  date: {
    des: "Current Date",
    symbol: '<% tp.date.now("YYYY-MM-DD") %>',
    shift: 0, // Adjust these values based on your usage
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  dateTime: {
    des: "Current Date and Time",
    symbol: '<% tp.date.now("YYYY-MM-DD HH:mm") %>',
    shift: 0, // Adjust accordingly
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  renameFile: {
    des: "Rename File",
    symbol: 'await tp.file.rename("New File Name");',
    shift: 0, // Adjust accordingly
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },
  arrayDeclaration: {
    des: "Array Declaration",
    symbol: "const myArray = [element1, element2, element3];",
    objectType: "htmlFormatterSetting",
  },
};

export function htmlFormatter(editor: Editor, item: htmlFormatterSetting) {
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

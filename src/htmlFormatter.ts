
/* ───────────────────────────────────────────────── */
/* << HTML Formatter Settings >> */
/* ───────────────────────────────────────────────── */

/* ─────────── Base Formatter Settings ─────────── */
import { Editor } from 'obsidian';
import { baseFormatterSetting } from './formatter';

/* 
  Interface for HTML Formatter Settings
  Extends the base formatter settings with additional properties specific to HTML formatting.
*/
export interface htmlFormatterSetting extends baseFormatterSetting {
  symbol: string;
  shift: number;
  selectionInput: number;
}

/* 
  HTML Formatter Settings
  Defines various settings for HTML formatting, including async functions, text appending, and templater tags.
*/
export const htmlFormatterSettings = {
  /* ─────────── Async Function ─────────── */
  asyncFunction: {
    des: "Async Function",
    symbol: 'async function functionName() {\\n}',
    shift: 31,  // Adjusts cursor inside the function body
    selectionInput: 30,  // Positions cursor at the start of the function body
    objectType: "htmlFormatterSetting",
  },  

  /* ─────────── Append Text ─────────── */
  appendText: {
    des: "Append Text",
    symbol: "tR += ",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Templater JS Tags ─────────── */
  templaterJSTags: {
    des: "<%* %>",
    symbol: "<%* %> ",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Templater Tags ─────────── */
  templaterTags: {
    des: "<% %>",
    symbol: "<% %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── System Prompt ─────────── */
  sp: {
    des: "<system.prompt>",
    symbol: '<% tp.system.prompt("") %>',
    shift: 21,
    selectionInput: 21,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Suggester Function ─────────── */
  suggesterFunction: {
    des: "Suggester Function",
    symbol: `const choice = await tp.system.suggester(["Option1", "Option2"], ["Option1", "Option2"]);`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Suggest Array ─────────── */
  suggestArray: {
    des: "Suggest Array",
    symbol: `const suggestions = ["1", "2", "3"]; 
    const suggestions = await tp.system.suggester(suggestions, suggestions, { 
        placeholder: "Select a view type" });
        
    // Check if the user made a selection and respond accordingly
    if (suggestions) {
      tR += suggestions; // Append the selected option to the document
    } else {
      console.log("No option was selected."); // Log to console if no selection was made
    }`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Template Literal ─────────── */
  templateLiteral: {
    des: "${}",
    symbol: "${}",
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Task Status ─────────── */
  taskStatus: {
    des: "Task Status",
    symbol: '<% tp.system.suggester(["Complete", "Incomplete"], ["Complete", "Incomplete"]) %>',
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Current Date ─────────── */
  date: {
    des: "Current Date",
    symbol: '<% tp.date.now("YYYY-MM-DD") %>',
    shift: 0, // Adjust these values based on your usage
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Current Date and Time ─────────── */
  dateTime: {
    des: "Current Date and Time",
    symbol: '<% tp.date.now("YYYY-MM-DD HH:mm") %>',
    shift: 0, // Adjust accordingly
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Rename File ─────────── */
  renameFile: {
    des: "Rename File",
    symbol: 'await tp.file.rename("New File Name");',
    shift: 0, // Adjust accordingly
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Array Declaration ─────────── */
  arrayDeclaration: {
    des: "Array Declaration",
    symbol: "const myArray = [element1, element2, element3];",
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Move File with Prompt ─────────── */
  moveFile: {
    des: "Move File with Prompt",
    symbol: `async function moveFileWithPrompt() {
        const targetFolder = await tp.system.prompt("Enter the target folder path");
        const confirmMove = await tp.system.prompt(\`Move this file to \${targetFolder}? (yes/no)\`);

        if (confirmMove.toLowerCase() === "yes") {
          const newFilePath = \`\${targetFolder}/\${tp.file.title}.md\`;
          await tp.file.move(newFilePath);
          return "File moved successfully";
        } else {
          return "File move cancelled";
        }
      }
      moveFileWithPrompt();`,
    shift: 0, // Adjust these values based on your usage
    selectionInput: 0, // Adjust these values based on your usage
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Frontmatter Title ─────────── */
  FMTitle: {
    des: "Frontmatter Title",
    symbol: "<% tp.frontmatter['title'] %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── File Title ─────────── */
  fileTitle: {
    des: "File Title",
    symbol: "<% tp.file.title %>",
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Prompt for Input ─────────── */
  promptInput: {
    des: "Prompt for Input",
    symbol: 'const input = await tp.system.prompt("Enter your input");',
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── New Line ─────────── */
  newLine: {
    des: "New Line",
    symbol: "\\n",
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Line Break ─────────── */
  br: {
    des: '<br/>',
    symbol: '<br/>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Div Element ─────────── */
  div: {
    des: '<div>',
    symbol: '<div></div>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Span Element ─────────── */
  span: {
    des: '<span>',
    symbol: '<span></span>',
    shift: 6,
    selectionInput: 6,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Image Element ─────────── */
  img: {
    des: '<img>',
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Anchor Element ─────────── */
  a: {
    des: '<a>',
    symbol: '<a></a>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Paragraph Element ─────────── */
  p: {
    des: '<p>',
    symbol: '<p></p>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Font Style ─────────── */
  font: {
    des: '<font>',
    symbol:
      '<span style="font-family:default; font-size:default; color:red"></span>',
    shift: 64,
    selectionInput: 64,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Element ─────────── */
  table: {
    des: '<table>',
    symbol: '<table></table>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Header ─────────── */
  thead: {
    des: '<thead>',
    symbol: '<thead></thead>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },

  /*

 ─────────── Table Body ─────────── */
  tbody: {
    des: '<tbody>',
    symbol: '<tbody></tbody>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Footer ─────────── */
  tfoot: {
    des: '<tfoot>',
    symbol: '<tfoot></tfoot>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Row ─────────── */
  tr: {
    des: '<tr>',
    symbol: '<tr></tr>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Data Cell ─────────── */
  td: {
    des: '<td>',
    symbol: '<td></td>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Table Header Cell ─────────── */
  th: {
    des: '<th>',
    symbol: '<th></th>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Details Element ─────────── */
  details: {
    des: '<details>',
    symbol: '<details></details>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Summary Element ─────────── */
  summary: {
    des: '<summary>',
    symbol: '<summary></summary>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Underline Element ─────────── */
  u: {
    des: '<u>',
    symbol: '<u></u>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },

  /* ─────────── Font Style Customization ─────────── */
  fontStyleCustomization: {
    des: "<font Enh>",
    symbol: `<%*
    async function customizeFontStyle() {
        try {
            const innerText = await tp.system.prompt("Enter the text to style:");
            if (!innerText) {
                new Notice("No text entered. Exiting script.");
                return;
            }
    
            let styleChanges = 'text-shadow: 0px 0px 0px rgba(0,0,0,0.5);';
    
            const fontWeight = ["Bold", "Normal"];
            const fontStyle = ["Italic", "Normal"];
            const textDecoration = ["Underline", "None"];
    
            const selectedFontWeight = await tp.system.suggester(fontWeight, fontWeight, {
                placeholder: "Choose font weight:"
            });
            if (selectedFontWeight === "Bold") {
                styleChanges += ' font-weight: bold;';
            }
    
            const fontColor = await tp.system.prompt("Enter font color (or leave blank):");
            if (fontColor) {
                styleChanges += \` color: \${fontColor};\`;
            }
    
            const selectedFontStyle = await tp.system.suggester(fontStyle, fontStyle, {
                placeholder: "Choose font style:"
            });
            if (selectedFontStyle) {
                styleChanges += \` font-style: \${selectedFontStyle.toLowerCase()};\`;
            }
    
            const selectedTextDecoration = await tp.system.suggester(textDecoration, textDecoration, {
                placeholder: "Choose text decoration:"
            });
            if (selectedTextDecoration) {
                styleChanges += \` text-decoration: \${selectedTextDecoration.toLowerCase()};\`;
            }
    
            const spanTag = \`<span style="\${styleChanges}">\${innerText}</span>\`;
    
            tR += spanTag;
            new Notice("Styled text configured successfully.");
        } catch (error) {
            console.error("Error in customizeFontStyle:", error);
            new Notice("An error occurred: " + error.message);
        }
    }
    await customizeFontStyle();
    %>`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Superscript Element ─────────── */
  sup: {
    des: "<sup>",
    symbol: "<sup></sup>",
    shift: 5,
    selectionInput: 5,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Subscript Element ─────────── */
  sub: {
    des: "<sub>",
    symbol: "<sub></sub>",
    shift: 5,
    selectionInput: 5,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Dynamic Table ─────────── */
  dynamicTable: {
    des: "Create Dynamic Table",
    symbol: `<%*
    async function createDynamicTable() {
      const numColumns = parseInt(await tp.system.prompt("Number of columns"), 10);
      const numRows = parseInt(await tp.system.prompt("Number of rows"), 10);
      
      let headers = "|";
      let separator = "|";
      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        const header = await tp.system.prompt(\`Header for column \${columnIndex + 1}\`);
        headers += \` \${header} |\`;
        separator += " -------- |";
      }
      
      let tableRows = "";
      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        let row = "|";
        for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
          const cell = await tp.system.prompt(\`Row \${rowIndex + 1}, Column \${columnIndex + 1}\`);
          row += \` \${cell} |\`;
        }
        tableRows += row + "\\n";
      }
      
      return headers + "\\n" + separator + "\\n" + tableRows;
    }
    
    const tableMarkdown = await createDynamicTable();
    tR += tableMarkdown;
    %>`,
    shift: 0,
    selectionInput: 0,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Div Element ─────────── */
  div: {
    des: "<div>",
    symbol: "<div></div>",
    shift: 5,
    selectionInput: 5,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Span Element ─────────── */
  span: {
    des: "<span>",
    symbol: "<span></span>",
    shift: 6,
    selectionInput: 6,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Image Element ─────────── */
  img: {
    des: "<img>",
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
    objectType: "htmlFormatterSetting",
  },

  /* ─────────── Iframe Element ─────────── */
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

  /* ─────────── Cite Element ─────────── */
  cite: {
    des: "<cite>",
    symbol: '<cite></cite>',
    shift: 6,
    selectionInput: 38,
    objectType: "htmlFormatterSetting",
  },
};

/* 
  HTML Formatter Function
  Handles the formatting of HTML code within the editor based on the selected formatting item.
*/
export function htmlFormatter(editor, item) {
  if (editor) {
    var isSelection = editor.somethingSelected();
    var selection = editor.getSelection();
    var cursorStart = editor.getCursor("from");
    editor.focus();

    if (isSelection) {
      var replacement = selection.trim();
      editor.replaceSelection(
        item.symbol.substring(0, item.selectionInput) +
          replacement +
          item.symbol.substring(item.selectionInput)
      );
      editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
    } else {
      editor.replaceRange(item.symbol, cursorStart);
      editor.setCursor(cursorStart.line, cursorStart.ch + item.shift);
    }
  }
}

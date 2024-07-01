import { MarkdownView, WorkspaceLeaf } from 'obsidian';

/**
 * Checks if there's a selection in the CodeMirror editor.
 * 
 * @param {CodeMirror.Editor} editor - The CodeMirror editor instance.
 * @returns {boolean} - True if there's a selection, false otherwise.
 */
export function checkIfSelection(editor: CodeMirror.Editor): boolean {
  const selection = editor.getSelection();
  return Boolean(selection && selection.trim() !== '');
}

/**
 * Checks if the current view in the WorkspaceLeaf is a Markdown source view.
 * 
 * @param {WorkspaceLeaf} leaf - The WorkspaceLeaf instance.
 * @returns {boolean} - True if the current view is a Markdown source view, false otherwise.
 */
export function checkIfMarkdownSource(leaf: WorkspaceLeaf): boolean {
  return (
    leaf.view instanceof MarkdownView && 
    // @ts-ignore - Obsidian API may not have currentMode property typed.
    leaf.view.currentMode?.type === 'source'
  );
}

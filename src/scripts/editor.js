// Source:
// <https://github.com/RPGillespie6/codemirror-quickstart/blob/master/src/editor.js>
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  indentUnit,
  syntaxHighlighting
} from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers
} from '@codemirror/view';

// Theme
import { oneDark } from '@codemirror/theme-one-dark';

// Language
import { javascript } from '@codemirror/lang-javascript';

function createEditorState(config) {
  return EditorState.create({
    ...config,
    // For a full list of available extensions, see
    // <https://codemirror.net/docs/extensions/>
    extensions: [
      // Display line numbers
      lineNumbers(),
      // Soft-wrap lines
      EditorView.lineWrapping,
      // Highlighting
      highlightActiveLine(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      // Undo/redo
      history(),
      // Code foldering
      foldGutter(),
      // Replaces the native selection with a custom-drawn selection in
      // traditional text editor style, with support for multiple selection
      // ranges.
      drawSelection(),
      // Allow for multiple cursors
      EditorState.allowMultipleSelections.of(true),
      // Highlights the bracket that matches the one the cursor is currently on
      // (if any).
      bracketMatching(),
      // Causes matching close brackets to be inserted when the user types an
      // opening bracket.
      closeBrackets(),
      // Autocomplete suggestions as the user types
      autocompletion(),
      // Reindents any code that is reinserted/pasted into the editor
      indentOnInput(),
      // Use 2-space indent
      indentUnit.of('  '),
      keymap.of([
        // Increase indent on Tab, and decrease indent on Shift+Tab
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap
      ]),
      javascript(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      oneDark,
      ...(config.extensions || [])
    ]
  });
}

function createEditorView({ state, parent }) {
  return new EditorView({ state, parent });
}

export { createEditorState, createEditorView };

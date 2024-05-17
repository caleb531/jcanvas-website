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
import { EditorSelection, EditorState } from '@codemirror/state';
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
        ...completionKeymap,
        // Implement the equivalent of VS Code's "Add Selection To Next Find
        // Match" command (cmd+d on Mac)
        {
          key: 'Mod-d',
          run: (view) => {
            const code = view.state.doc.toString();
            const selectionRanges = view.state.selection.ranges;
            const lastSelection = selectionRanges[selectionRanges.length - 1];
            const cursorAnchor = lastSelection.anchor;
            const cursorHead = lastSelection.head;
            const selectionLength = Math.abs(cursorHead - cursorAnchor);
            // If selection is empty, do nothing
            if (selectionLength === 0) {
              // Returning true prevents the default browser behavior for cmd+d
              return true;
            }
            const selectedCode = code.substring(cursorAnchor, cursorHead);
            const cursorOffset = Math.max(cursorAnchor, cursorHead);
            let offsetOfNextMatch;
            offsetOfNextMatch = code.indexOf(selectedCode, cursorOffset);
            // If no initial match, try looping around
            if (offsetOfNextMatch === -1) {
              offsetOfNextMatch = code.indexOf(
                selectedCode.slice(0, cursorOffset)
              );
            }
            if (offsetOfNextMatch === -1) {
              return true;
            }
            view.dispatch({
              selection: EditorSelection.create([
                // Maintain existing selections
                ...view.state.selection.ranges,
                // Add a new selection for the next match
                EditorSelection.range(
                  offsetOfNextMatch,
                  offsetOfNextMatch + selectionLength
                )
              ])
            });
            return true;
          }
        }
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

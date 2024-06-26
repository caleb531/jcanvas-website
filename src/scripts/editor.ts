// Source:
// <https://github.com/RPGillespie6/codemirror-quickstart/blob/master/src/editor.js>
import {
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
  selectedCompletion
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
import {
  EditorSelection,
  EditorState,
  Prec,
  type EditorStateConfig,
  type Extension,
  type SelectionRange
} from '@codemirror/state';
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

function createEditorState(
  config: Partial<EditorStateConfig> & { extensions?: Extension[] }
) {
  let lastSelection: SelectionRange | null = null;

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
      // Code folding
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
      Prec.highest(
        keymap.of([
          // Implement the equivalent of VS Code's "Add Selection To Next Find
          // Match" command (cmd+d on Mac)
          {
            key: 'Mod-d',
            run: (view) => {
              const code = view.state.doc.toString();
              const selectionRanges = view.state.selection.ranges;
              const mainSelection = view.state.selection.main;
              const cursorAnchor = mainSelection.anchor;
              const cursorHead = mainSelection.head;

              const selectionLength = Math.abs(cursorHead - cursorAnchor);

              // If selection is empty, do nothing
              if (selectionLength === 0) {
                return true;
              }

              // Reset lastSelection if the number of ranges has changed (i.e., new selection made)
              if (selectionRanges.length === 1 || !lastSelection) {
                lastSelection = mainSelection;
              }

              const selectedCode = code.substring(
                lastSelection.anchor,
                lastSelection.head
              );
              const cursorOffset = Math.max(
                lastSelection.anchor,
                lastSelection.head
              );
              let offsetOfNextMatch;

              // Try to find the next match after the current selection
              offsetOfNextMatch = code.indexOf(selectedCode, cursorOffset);

              // If no match is found, try wrapping around
              if (offsetOfNextMatch === -1) {
                offsetOfNextMatch = code.indexOf(selectedCode);
              }

              // If still no match is found, do nothing
              if (offsetOfNextMatch === -1) {
                return true;
              }

              // Update lastSelection with the new selection
              lastSelection = EditorSelection.range(
                offsetOfNextMatch,
                offsetOfNextMatch + selectionLength
              );

              // Dispatch the new selection, ensuring we maintain existing
              // selections
              view.dispatch({
                selection: EditorSelection.create([
                  ...selectionRanges,
                  lastSelection
                ])
              });

              return true;
            }
          },
          // Accept any selected autocompletion with the Tab key (otherwise,
          // fall back to indentation / the default behavior)
          {
            key: 'Tab',
            run: (view) => {
              if (selectedCompletion(view.state)) {
                acceptCompletion(view);
                return true;
              } else {
                // Fall back to default action (i.e. indenting)
                return false;
              }
            }
          }
        ])
      ),
      javascript(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      oneDark,
      ...(config.extensions ?? [])
    ]
  });
}

function createEditorView({
  state,
  parent
}: {
  state: EditorState;
  parent: HTMLElement;
}) {
  return new EditorView({ state, parent });
}

export { createEditorState, createEditorView };

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
import { highlightSelectionMatches } from '@codemirror/search';
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
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      indentUnit.of('  '),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
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

function createEditorView(state, parent) {
  return new EditorView({ state, parent });
}

export { createEditorState, createEditorView };

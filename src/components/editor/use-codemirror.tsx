import { EditorState, Transaction } from "@codemirror/state";
import { useState, useEffect, useRef } from "react";
import {
  EditorView,
  keymap,
  highlightActiveLine,
  ViewUpdate,
} from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { bracketMatching } from "@codemirror/matchbrackets";
import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import type React from "react";
import { indentOnInput } from "@codemirror/language";
import { useLive } from "../contexts/useLive";

export const myTheme = EditorView.theme({
  "&": {
    // backgroundColor: 'red !important',
    height: "100%",
  },
});

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "2.2em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading2,
    fontSize: "1.9em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading3,
    fontSize: "1.6em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading4,
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  {
    tag: tags.content,
    fontSize: "1.1em",
    fontWeight: "bold",
  },
]);

interface Props {
  onChange?: (state: EditorState) => void;
}

function isViewUpdateFromUser(update: ViewUpdate) {
  // check transactions
  for (const transaction of update.transactions) {
    const userEventType = transaction.annotation(Transaction.userEvent);
    if (userEventType) {
      return true;
    }
  }
  return false;
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const { onChange } = props;
  const { doc, updateEditor } = useLive();

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: doc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        syntaxHighlighting,
        myTheme,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            if (isViewUpdateFromUser(update)) {
              onChange && onChange(update.state);
            } else {
            }
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });

    updateEditor(view);

    return () => {
      view.destroy();
    };
  }, [refContainer.current]);

  return [refContainer];
};

export default useCodeMirror;

import React, { useEffect } from "react";
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from "@codemirror/highlight";
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubDark } from "@uiw/codemirror-theme-github";
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

export function EditorV2() {
  const { doc, updateDoc } = useLive();

  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    updateDoc(value as string);
  }, []);

  return (
    <CodeMirror
      value={doc}
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        githubDark,
      ]}
      onChange={onChange}
    />
  );
}

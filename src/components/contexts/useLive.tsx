import React, { useContext, useState } from "react";
import { EditorView } from "@codemirror/view";
import { socket, updateLiveDoc } from "../../core/socket";
import { EditorState } from "@codemirror/state";

export type LiveDocument = {
  doc: string;
  updateDoc: (newDoc: string) => void;
  editor: EditorView | null;
  updateEditor: (newEditor: EditorView) => void;
};

interface Props {
  children: React.ReactNode;
}

export const LiveDocumentContext = React.createContext<LiveDocument | null>(
  null
);

export function useLive() {
  return useContext(LiveDocumentContext) as LiveDocument;
}

export const LiveDocProvider: React.FC<Props> = ({ children }) => {
  const [doc, setDoc] = React.useState("# Welcome");
  const [editor, setEditor] = useState<EditorView | null>(null);

  function updateDoc(newDoc: string) {
    setDoc(newDoc);

    if (socket.connected) {
      updateLiveDoc(newDoc);
    }
  }

  function updateEditor(newEditor: EditorView) {
    setEditor(newEditor);
  }

  socket.on("doc-updated", (updatedDoc) => {
    console.log("updated");
    setDoc(updatedDoc);
    if (editor) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.toString().length,
          insert: updatedDoc,
        },
      });
    }
  });

  const data = {
    doc,
    updateDoc,
    editor,
    updateEditor,
  };

  return (
    <LiveDocumentContext.Provider value={data}>
      {children}
    </LiveDocumentContext.Provider>
  );
};

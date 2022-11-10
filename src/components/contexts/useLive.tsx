import React, { useContext, useEffect, useState } from "react";
import { EditorView } from "@codemirror/view";
import { API_PREFIX, socket, updateLiveDoc } from "../../core/socket";
import { EditorState } from "@codemirror/state";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export type LiveDocument = {
  doc: string;
  updateDoc: (newDoc: string) => void;
  editor: EditorView | null;
  updateEditor: (newEditor: EditorView) => void;
  code: string;
  setCode: (newCode: string) => void;
  setDoc: (newDoc: string) => void;
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
  const [doc, setDoc] = React.useState("");
  const [editor, setEditor] = useState<EditorView | null>(null);
  const [code, setCode] = useState("");
  const toast = useToast();

  function updateDoc(newDoc: string) {
    setDoc(newDoc);

    if (socket.connected) {
      updateLiveDoc(newDoc);
    }
  }

  function updateEditor(newEditor: EditorView) {
    setEditor(newEditor);
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_PREFIX}/initial-doc`);
        const newDoc = response.data.initialDoc;
        setDoc(newDoc);
      } catch (error: any) {
        setDoc("# Welcome");
      }
    }
    getData();

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

    socket.on("user-connected", (username) => {
      toast({
        title: `${username} has joined the room`,
        position: "bottom",
      });
    });
    return () => {
      socket.off("doc-updated");
      socket.off("user-connected");
    };
  }, [socket, doc]);

  const data = {
    doc,
    updateDoc,
    editor,
    updateEditor,
    code,
    setCode,
    setDoc,
  };

  return (
    <LiveDocumentContext.Provider value={data}>
      {children}
    </LiveDocumentContext.Provider>
  );
};

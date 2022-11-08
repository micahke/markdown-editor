import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./use-codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { useLive } from "../contexts/useLive";
// import './style/editor.css'

const Editor: React.FC = () => {
  const { doc, updateDoc } = useLive();

  const handleChange = useCallback(
    (state: EditorState) => {
      updateDoc(state.doc.toString());
    },
    [updateDoc]
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    onChange: handleChange,
  });

  useEffect(() => {
    console.log("rendering editor");
    if (editorView) {
    }
    return function cleanUp() {};
  }, [editorView]);

  return <Box height="100%" ref={refContainer}></Box>;
};

export default Editor;

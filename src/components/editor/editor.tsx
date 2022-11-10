import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./use-codemirror";
import { EditorState } from "@codemirror/state";
import { useLive } from "../contexts/useLive";

const Editor: React.FC = () => {
  const { updateDoc } = useLive();

  const handleChange = useCallback(
    (state: EditorState) => {
      updateDoc(state.doc.toString());
    },
    [updateDoc]
  );

  const [refContainer] = useCodeMirror<HTMLDivElement>({
    onChange: handleChange,
  });

  return <Box height="100%" ref={refContainer}></Box>;
};

export default Editor;

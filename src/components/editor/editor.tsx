import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./use-codemirror";
import { EditorState } from "@codemirror/state";
// import './style/editor.css'

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props;

  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
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
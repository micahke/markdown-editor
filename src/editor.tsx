import React, {useCallback, useEffect} from 'react'
import useCodeMirror from './use-codemirror';
// import './style/editor.css'


interface Props {
	
}

const Editor: React.FC = () => {

	const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
		initialDoc: 'Hello, world',
		onChange: () => {}
	})

	useEffect(() => {
		if (editorView) {
			
		}
	}, [editorView])


	return <div ref={refContainer}>Editor</div>
}

export default Editor;

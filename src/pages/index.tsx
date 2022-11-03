import { Box, Flex } from '@chakra-ui/react'
import {useCallback, useState} from 'react';
import Editor from '../editor'

export default function Home() {

	const [doc, setDoc] = useState<string>();

	const handleDocChange = useCallback(newDoc => {
		setDoc(newDoc)
	}, [])

  return (
		<Flex>
			<Box flex='0.5' minH="100vh" bg='blue.200'>
				<Editor onChange={handleDocChange} initialDoc={doc} />
			</Box>
			<Box flex='0.5' minH="100vh" bg='green.400'>
				I am writing this a lot later to test ou Next structure.
			</Box>
		</Flex>
  )
}

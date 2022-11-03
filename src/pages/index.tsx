import { Box, Flex } from '@chakra-ui/react'
import {useCallback, useState} from 'react';
import Editor from '../editor'
import Preview from '../preview';

export default function Home() {

	const [doc, setDoc] = useState<string>('# Welcome');

	const handleDocChange = useCallback((newDoc: string) => {
		setDoc(newDoc)
	}, [doc])

  return (
		<Flex>
			<Box flex='0.5' minH="100vh" bg='blue.200'>
				<Editor onChange={handleDocChange} initialDoc={doc} />
			</Box>
			<Box flex='0.5' minH="100vh" bg='#F2EFE3'>
				<Preview doc={doc} />
			</Box>
		</Flex>
  )
}

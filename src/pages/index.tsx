import { Box, Flex } from '@chakra-ui/react'
import Editor from '../editor'

export default function Home() {
  return (
		<Flex>
			<Box flex='0.5' minH="100vh" bg='blue.200'>
				<Editor />
			</Box>
			<Box flex='0.5' minH="100vh" bg='green.400'>
				I am writing this a lot later to test ou Next structure.
			</Box>
		</Flex>
  )
}

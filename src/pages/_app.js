import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
              <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

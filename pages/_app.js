import '../styles/globals.css';
import { AuthProvider } from '@saas-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@saas-ui/pro';
import { theme as glassTheme } from '@saas-ui/theme-glass';
import { SaasProvider } from '@saas-ui/react';
import "@fontsource/inter/variable.css";

const theme =  extendTheme(proTheme, glassTheme);


export default function App({ Component, pageProps }) {
  return (
    <SaasProvider theme={theme} >
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </SaasProvider>
  )
}

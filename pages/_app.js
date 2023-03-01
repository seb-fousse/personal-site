import '@/styles/globals.css'
import { Roboto_Flex } from '@next/font/google'

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={robotoFlex.className}>
      <Component {...pageProps} />
    </main>
  );
}

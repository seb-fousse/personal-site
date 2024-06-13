import '@/styles/globals.css'
import { Roboto_Flex } from '@next/font/google'

 // import Font Awesome CSS
 import "@fortawesome/fontawesome-svg-core/styles.css";
 import { config } from "@fortawesome/fontawesome-svg-core";
 config.autoAddCss = false;

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={robotoFlex.className}>
      <Component {...pageProps} />
    </main>
  );
}

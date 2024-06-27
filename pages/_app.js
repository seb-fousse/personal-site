import '@/styles/globals.css'
import { Roboto_Flex } from 'next/font/google'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import * as Icons from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;
const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)

require('dotenv').config();


const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={robotoFlex.className}>
      <Component {...pageProps} />
    </main>
  );
}

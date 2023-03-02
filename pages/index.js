import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import HomeMenuItem from '@/components/HomeMenuItem'

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Seb Fousse</title>
        <meta name="title" content="Seb Fousse" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="A portfolio website for Sebastien Fousse. Seb is a Computer Science student, and is interesting in programming, painting, photography, and more." />
        <meta name="author" content="Seb Fousse" />
        <meta name="keywords" content="seb, fousse, sebastien, sebastian, programming, portfolio, creative, art, design, generative" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Seb Fousse" />
        <meta property="og:site_name" data-page-subject="true" content="Seb Fousse" />
        <meta property="og:url" content="https://sebf.xyz" />
        <meta property="og:description" name="description" content="A portfolio website for Sebastien Fousse. Seb is a Computer Science student, and is interesting in programming, painting, photography, and more." />
        <meta property="og:image" content="" /> {/* TODO: Add image content here */}
        {/* Favicon & Device Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-between align-middle p-4 md:p-16 lg:p-16 xl:p-24 2xl:p-24 min-h-full bg-orange-100">
        <div className="container m-auto flex flex-row flex-wrap 2xl:justify-center xl:justify-center lg:justify-start md:justify-start sm:justify-start">

          <div className="splash-image">
            <figure>
              {/* Look into alternatives for blur, standard doesn't work on GIFS */}
              <Image
                src="/gifs/face-morph-optimized.gif"
                blurDataURL="/gifs/face-morph-blur.png"
                placeholder="blur"
                width={750} height={750}
                alt="Morphing self portrait" />
            </figure>
          </div>

          <div className="title-and-menu text-neutral-800 px-4 md:px-4 lg:px-8 xl:px-16 2xl:px-16">

            <div className="title word space-y-2 font-bold py-8 text-6xl md:text-8xl lg:text-5xl xl:text-5xl 2xl:text-8xl">
              <h1 className={styles.firstName}>
                Seb<span className={styles.extra}>astien</span>
              </h1>
              <h1>
                Foussé
                </h1>
            </div>

            <div className="menu space-y-4 md:space-y-8 lg:space-y-8 xl:space-y-8 2xl:space-y-8 font-medium text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl">

              <HomeMenuItem text="*projects" href="/projects"></HomeMenuItem>
              <HomeMenuItem text="*about" href="/about"></HomeMenuItem>
              <HomeMenuItem text="*email" href="mailto:me@sebf.xyz"></HomeMenuItem>
              <HomeMenuItem text="*instagram" href="https://www.instagram.com/sebf.xyz/"></HomeMenuItem>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}

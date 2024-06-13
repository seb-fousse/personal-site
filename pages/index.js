import Head from 'next/head'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import HomeMenuItem from '@/components/HomeMenuItem'
import splashImage from '@/public/splashImage.webp'
import styles from '@/styles/Home.module.css'

export default function Home() {

  // https://reacthustle.com/blog/nextjs-scroll-to-element
  const handleScroll = (e) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };


  return (
      <>
          <Head>
            {/* Primary Meta Tags */}
            <title>Seb Fousse</title>
            <meta name="title" content="Seb Fousse" />
            <meta name="robots" content="index, follow" />
            <meta name="description" content="Seb Fousse is a software engineer and CS student. His interests include coding, painting, photography, and more." />
            <meta name="author" content="Seb Fousse" />
            <meta name="keywords" content="seb, fousse, sebastien, sebastian, programming, portfolio, creative, art, design, software" />
            {/* Open Graph Tags */}
            <meta property="og:title" content="Seb Fousse" />
            <meta property="og:site_name" data-page-subject="true" content="Seb Fousse" />
            <meta property="og:url" content="https://sebf.xyz" />
            <meta property="og:description" name="description" content="Seb Fousse is a software engineer and CS student. His interests include coding, painting, photography, and more." />
            <meta property="og:image" content="" /> {/* TODO: Add image content here */}
            {/* Favicon & Device Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="max-w-7xl m-auto">
            {/* Nav here */}
            <section id="splash" className="min-h-screen container sm:flex sm:mx-auto">
              <div className="container mx-auto my-auto flex flex-row flex-wrap 2xl:justify-center xl:justify-center lg:justify-start md:justify-start sm:justify-start">
                
                <div id="splash-image-wrapper" className="p-4 mx-auto 2xl:mx-0 xl:mx-0">
                  <figure>
                    <Image
                      src={splashImage}
                      placeholder="empty" // TODO: Fix placeholder with something nicer than an empty image
                      width={750} height={750}
                      priority
                      alt="Morphing self portrait" />
                  </figure>
                </div>
                
                <div id="title-and-menu" className="absolute bottom-0 left-0 sm:relative text-neutral-800 px-4 md:px-4 lg:px-8 xl:px-8 2xl:px-8 lg:mx-28 xl:mx-0 2xl:mx-0">

                  <div id="splash-title" className="space-y-2 font-bold 2xl:py-8 xl:py-8 py-4 text-6xl 2xl:text-7xl">
                    <h1 className={styles.firstName}>
                      Seb<span className={styles.extra}>astien</span>
                    </h1>
                    <h1>
                      Foussé
                      </h1>
                  </div>

                  <div id="splash-menu-wrapper" className="menu-wrapper 2xl:block xl:block hidden">
                    <div id="splash-menu" className="space-y-4 md:space-y-8 lg:space-y-8 xl:space-y-8 2xl:space-y-8 font-medium text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                      <HomeMenuItem text="*about" href="#about" onClick={handleScroll}></HomeMenuItem>
                      <HomeMenuItem text="*projects" href="#projects" onClick={handleScroll}></HomeMenuItem>
                      <HomeMenuItem text="*hobbies" href="#hobbies" onClick={handleScroll}></HomeMenuItem>
                      <HomeMenuItem text="*contact" href="#contact" onClick={handleScroll}></HomeMenuItem>
                    </div>
                  </div>

                </div>

              </div>
            </section>
            <section id="about" className="min-h-screen">
              <SectionHeading heading="*about" />
              <div className="grid gap-4 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
                <div className="text-wrapper space-y-4 text-xl p-8">
                  <p>
                    I'm Seb Fousse, a software engineer and computer science student in New York City.
                  </p> 
                  <p>
                    I am passionate about clean design, simple solutions, and discovering new perspectives.
                  </p>
                  <p>
                    My values include adaptability, collaboration, creativity, curiosity, and gratitude.
                  </p>
                </div>
                <div className="text-wrapper space-y-4 text-xl p-8">
                  <div className="text-wrapper">
                    <span className="font-bold">Languages:&nbsp;</span>
                    <span>Python, Java, C++, Javascript, HTML/CSS</span>
                  </div>
                  <div className="text-wrapper">
                    <span className="font-bold">Frameworks:&nbsp;</span>
                    <span>React, NextJS, Flask, Django, TailwindCSS</span>
                  </div>
                  <div className="text-wrapper">
                    <span className="font-bold">Libraries:&nbsp;</span>
                    <span>pandas, scikit-learn, NumPy, Plotly, Framer Motion</span>
                  </div>
                  <div className="text-wrapper">
                    <span className="font-bold">Tools:&nbsp;</span>
                    <span>Git, VSCode, IntelliJ, Jupyter Notebook, Postman API, RunwayML, Photoshop, Final Cut Pro, Logic Pro</span>
                  </div>
                </div>
              </div>
              {/* Resume button - https://www.npmjs.com/package/react-pdf */}
            </section>
            <section id="projects" className="min-h-screen">
              <SectionHeading heading="*projects" />
            </section>
            <section id="hobbies" className="min-h-screen">
              <SectionHeading heading="*hobbies" />
            </section>
            <section id="contact" className="min-h-screen">
              <SectionHeading heading="*contact" />
            </section>
          </main>
      </>
  );
}
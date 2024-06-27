import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import SectionHeading from '@/components/SectionHeading'
import HomeMenuItem from '@/components/HomeMenuItem'
import splashImage from '@/public/splashImage.webp'
import styles from '@/styles/Home.module.css'
import ContactForm from '@/components/ContactForm'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"

export default function Home() {

  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});

  const getStatsFromAPI = async () => {
    try {
      const currentWeatherResponse = await fetch('api/stats/current-weather', { method: 'GET'});
      const recentlyPlayedResponse = await fetch('api/stats/recently-played', { method: 'GET' });
      if (currentWeatherResponse.ok) {
        console.log('current-weather get successful');
        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);
        console.log(JSON.stringify(currentWeather));
      }
      if (recentlyPlayedResponse.ok) {
        console.log('recently-played get successful');
        const recentlyPlayedData = await recentlyPlayedResponse.json();
        setRecentlyPlayed(recentlyPlayedData);
        console.log(JSON.stringify(recentlyPlayed));
      }
    } catch (error) {
      console.log('Error when attempting to fetch and parse data from API');
      console.error(error);
    }
  }

  useEffect(() => {
    getStatsFromAPI();
  }, []);

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

            {/* TODO: Update header info */}

            {/* Primary Meta Tags */}
            <title>Seb Fousse</title>
            <meta name="title" content="Seb Fousse" />
            <meta name="robots" content="index, follow" />
            <meta name="description" content="Sebastien Fousse is a software engineer. His interests include coding, art, photography, and more." />
            <meta name="author" content="Seb Fousse" />
            <meta name="keywords" content="seb, fousse, sebastien, sebastian, programming, portfolio, creative, art, design, software" />
            {/* Open Graph Tags */}
            <meta property="og:title" content="Seb Fousse" />
            <meta property="og:site_name" data-page-subject="true" content="Seb Fousse" />
            <meta property="og:url" content="https://sebf.xyz" />
            <meta property="og:description" name="description" content="Sebastien Fousse is a software engineer. His interests include coding, art, photography, and more." />
            <meta property="og:image" content="" /> {/* TODO: Add image content here */}
            {/* Favicon & Device Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <Script src="https://kit.fontawesome.com/78b45dab69.js" crossOrigin="anonymous" />
          </Head>
          <main className="max-w-7xl m-auto">
            {/* Nav here */}
            <section id="splash" className="min-h-screen container sm:flex sm:mx-auto">
              <div className="container mx-auto my-auto flex flex-row flex-wrap 2xl:justify-center xl:justify-center lg:justify-start md:justify-start sm:justify-start">
                
                <div id="splash-image-wrapper" className="p-4 mx-auto 2xl:mx-0 xl:mx-0">
                  <video src={"/splashImage.mp4"} width={750} height={750} loop autoPlay muted playsInline >
                    Video could not be displayed
                  </video>
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
              {/* Resume button - https://www.npmjs.com/package/react-pdf */}
              <i className="fa-solid fa-user"></i>
            </section>
            <section id="projects" className="min-h-screen">
              <SectionHeading heading="*projects" />
            </section>
            <section id="hobbies" className="min-h-screen">
              <SectionHeading heading="*hobbies" />
            </section>
            <section id="contact" className="min-h-screen">
              <div className={`transition-opacity duration-200 ${emailSentSuccess ? 'opacity-25' : 'opacity-100'} ease-linear`}>
                <SectionHeading heading="*contact" />
                <ContactForm setEmailSentSuccess={setEmailSentSuccess}/>
              </div>
              {emailSentSuccess &&
                <motion.div 
                  className="text-neutral-800 font-bold text-9xl text-nowrap mt-3"
                  initial={{ x: "calc(100vw -100px)", bottom: "-5vh", position: "fixed" }}
                  animate={{ x: "calc(0vw - 2000px)" }}
                  transition={{ duration: 10, type: "linear" }}
                >
                  {[...Array(10)].map((x, i) => 
                    <p key={i}>Email sent, talk soon!</p>
                  )}
                </motion.div>
              }
            </section>
          </main>
      </>
  );
}
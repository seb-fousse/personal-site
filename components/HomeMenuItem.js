import Link from "next/link";

import styles from './HomeMenuItem.module.css'

// Reworking of this effect
// https://www.youtube.com/watch?v=owpaafxvkjU
function HomeMenuItem({ text, href, onClick }) {

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const letters = text.split(""); // Split text into array of characteres
    const lettersAndDelay = []

    // Push an object to lettersAndDelay with a letter, random delay, and fixed delay
    for (let i = 0; i < letters.length; ++i) {
        let rd = `${rand(-5000, 0)}ms`
        let fd = `${i * 1000 }ms`
        lettersAndDelay.push({letter: letters[i], randomDelay: rd, fixedDelay: fd});
    }

    // Build out JSX for each letter in the HomeMenuItem
    const letterItems = lettersAndDelay.map((item) =>
        <span className="outer" key={item.fixedDelay}>
            <span className="inner" style={{animationDelay: item.randomDelay}}>
                <span className="letter" style={{animationDelay: item.fixedDelay}}>{item.letter}</span>
            </span>
        </span>
    );

    return (
        <div className={styles.option}>
            <Link className={styles.fancy} href={href} onClick={onClick}>
                {letterItems}
            </Link>
        </div>
    );
}

export default HomeMenuItem;
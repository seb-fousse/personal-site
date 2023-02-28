import Home from "@/pages";
import Link from "next/link";

import styles from './HomeMenuItem.module.css'

function HomeMenuItem({ text, href }) {

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const letters = text.split("");
    const lettersAndDelay = []

    for (let i = 0; i < letters.length; ++i) {
        let rd = `${rand(-5000, 0)}ms`
        let fd = `${i * 1000 }ms`
        lettersAndDelay.push({letter: letters[i], randomDelay: rd, fixedDelay: fd});
    }

    const letterItems = lettersAndDelay.map((item) =>
        <span class="outer">
            <span class="inner" style={{animationDelay: item.randomDelay}}>
                <span class="letter" style={{animationDelay: item.fixedDelay}}>{item.letter}</span>
            </span>
        </span>
    );

    return (
        <div className={styles.option}>
            <Link className={styles.fancy} href={href}>
                {letterItems}
            </Link>
        </div>
    );
}

export default HomeMenuItem;
import Home from "@/pages";
import Link from "next/link";

import styles from './HomeMenuItem.module.css'

function HomeMenuItem({ text, href }) {

    const letters = text.split("");
    const letterItems = letters.map((letter) =>
        <span class="outer">
            <span class="inner">
                <span class="letter">{letter}</span>
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
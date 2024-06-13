import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { faHouse, faCubes, faAddressCard, faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export default function Navigation({ isOpen }) {
  return (
    <>
      <motion.ul 
        className={" p-6 absolute top-[75px] w-[150px]"}
        variants={variants}>
        {menuItems.map(item => (
          <MenuItem name={item.name} icon={item.icon} href={item.href} key={item.name} />
        ))}
      </motion.ul>
      <motion.div 
        className="p-6 absolute bottom-0">
          <span>
            <FontAwesomeIcon icon={faGithub} />
          </span>
      </motion.div>
    </>
)};

const menuItems = [
  {
    name: "Home",
    icon: faHouse,
    href: "/"
  },
  {
    name: "Projects",
    icon: faCubes,
    href: "/projects"
  },
  {
    name: "About",
    icon: faAddressCard,
    href: "/about"
  },
  {
    name: "Email",
    icon: faEnvelope,
    href: "mailto:me@sebf.xyz"
  }
];

const bottomMenuItems =[
  {
    name: "Github",
    icon: faGithub,
    href: "https://github.com/seb-fousse/"
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    href: "https://www.linkedin.com/in/sebastien-fousse/"
  },
  {
    name: "Instagram",
    icon: faInstagram,
    href: "https://www.instagram.com/sebf.xyz/"
  }
]
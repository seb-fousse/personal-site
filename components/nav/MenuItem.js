import { motion } from "framer-motion";
import Link from 'next/link';

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: 130,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
};

export const MenuItem = ({ name, icon, href }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mb-5 flex items-center cursor-pointer text-neutral-200">
      
      <Link href={href}>
        <span className="ml-4 font-semibold text-xl">{name}</span>
      </Link>

    </motion.li>
  );
};

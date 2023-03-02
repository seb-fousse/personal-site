import Head from 'next/head'
import PortfolioItem from '@/components/PortfolioItem'
import Filter from '@/components/Filter'
import { projects } from '@/public/js/projectList'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// TODO - Add fade in/out animation for each portfolio item

export default function Projects() {
	const [filtered, setFiltered] = useState([]);
	const [activeTag, setActiveTag] = useState('All');

	useEffect(() => {
		setFiltered(projects);
	}, []);

	return (
		<>
			<Head>
			</Head>

			<main className="container flex flex-col justify-center items-center align-middle p-24 min-h-full min-w-full bg-orange-100">
				
				<h1 className="text-4xl font-bold mb-8">
					Projects + Work + Hobbies
				</h1>
				<Filter projects={projects} setFiltered={setFiltered} activeTag={activeTag} setActiveTag={setActiveTag} />

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
					initial={{ opacity:0, y:50 }}
					animate={{ opacity:1, y:0  }}
					transition={{ ease:"easeOut", duration:0.5 }}>
					<AnimatePresence>
						{filtered.map((proj) => {
							return (
								<motion.div
									layout
									key={proj.title}
									initial={{ opacity:0 }}
									animate={{ opacity:1 }}
									exit={{ opacity:0 }}>
									<PortfolioItem title={proj.title} desc={proj.desc} href={proj.href} />
								</motion.div>
						)})}
					</AnimatePresence>
				</motion.div>
			</main>
		</>
	);
}
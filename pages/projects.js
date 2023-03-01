import Head from 'next/head'
import PortfolioItem from '@/components/PortfolioItem'
import Filter from '@/components/Filter'
import { useState, useEffect } from 'react'
import {projects} from '@/public/js/projectList'

export default function Projects() {
	const [filtered, setFiltered] = useState([]);
	const [activeTag, setActiveTag] = useState('all');

	useEffect(() => {
		setFiltered(projects);
	}, []);

	return (
		<>
			<Head>
			</Head>

			<main className="container flex flex-col justify-center items-center align-middle p-24 min-h-full min-w-full bg-orange-100">
				<h1>Projects page</h1>
				<Filter projects={projects} setFiltered={setFiltered} activeTag={activeTag} setActiveTag={setActiveTag} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
					{filtered.map((proj) => {
						return (<PortfolioItem title={proj.title} desc={proj.desc} href={proj.href} />)
					})}
				</div>
			</main>
		</>
	);
}
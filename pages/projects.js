import link from 'next/link'
import Head from 'next/head'
import PortfolioItem from '../components/PortfolioItem'
import useSWR from 'swr'

// See link for info on client side data fetching
// https://nextjs.org/docs/basic-features/data-fetching/client-side
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Projects() {

	// Fetching data from projectList.json
	const { data, error, isLoading } = useSWR('/api/project-data', fetcher)
  if (error) return <div>Failed to load</div> // maybe change this
  if (isLoading) return <div>Loading...</div>	// maybe change this

	const projectsJson = JSON.parse(data);

	return (
		<>
			<Head>

			</Head>

			<main className="flex flex-col justify-between align-middle p-24 min-h-full bg-orange-100">
				<h1>Projects page</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
					{projectsJson.map((proj) => {
						return (<PortfolioItem title={proj.title} desc={proj.desc} href={proj.href} />)
					})}
				</div>
			</main>
		</>
	);
}
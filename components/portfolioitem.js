import Link from 'next/link'

function PortfolioItem({ title, desc, href }) {
	return (
		<div class="p-4 m-4 text-center">
			<Link
				href={href}
				className="text-neutral-800 hover:underline font-bold text-xl">
				{title}
			</Link>
			<p className="text-neutral-500 font-light text-base">
				{desc}
			</p>
		</div>
	);
}

export default PortfolioItem;
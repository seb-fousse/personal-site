import useSWR from 'swr'
import Image from 'next/image'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function LocalWeather() {
  const { data, error } = useSWR('/api/stats/recently-played', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1 className="text-xl">Recently Played</h1>
      <a href={data[0].href} className="hover:underline">
        <p>{data[0].artist} - {data[0].title}</p>
      </a>
      <Image 
        src={data[0].coverImage.url} 
        alt={`Album cover for ${data[0].artist} - ${data[0].title}`} 
        width={128}
        height={128}
      />
    </div>
  )
}
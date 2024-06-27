import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function LocalWeather() {
  const { data, error } = useSWR('/api/stats/current-weather', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1 className="text-xl">Current Weather</h1>
      <span>
        <FontAwesomeIcon icon={data.icon} />
      </span>
      <span> - {data.type} - {Math.round(parseFloat(data.temp))} ºC</span>
    </div>
  )
}
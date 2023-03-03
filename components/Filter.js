import { useEffect } from 'react'
import { motion } from 'framer-motion'

function Filter({ projects, setFiltered, activeTag, setActiveTag }) {

  const TAGS=['All', 'Art', 'Objects', 'Photo', 'Video', 'Tech']

  useEffect(() => {
    if (activeTag === 'All') {
      setFiltered(projects);
      return;
    }
    const filtered = projects.filter((project) =>
      project.tags.includes(activeTag)
    );
    setFiltered(filtered);
  }, [activeTag]);

  return (
    <div className="filter-container flex flex-row flex-wrap justify-center font-semibold text-xl text-neutral-800">

      {TAGS.map(tag => (
        <div
          className="mx-1 my-2 p-2 items-center flex flex-col"
          onClick={() => setActiveTag(tag)}
          tabIndex={0}
          key={tag}>

          <div className="cursor-pointer">
            {tag}
          </div>

          {tag === activeTag ?
            <motion.div layoutId="selector">
              <div
                className="h-2 w-2 rounded-full bg-neutral-800">
              </div>
            </motion.div> : null
          }
        </div>
      ))}
    </div>
  )
}

export default Filter;
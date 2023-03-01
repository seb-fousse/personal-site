import { useEffect } from 'react'

function Filter({ projects, setFiltered, activeTag, setActiveTag }) {

  useEffect(() => {
    if(activeTag === 'all'){
      setFiltered(projects);
      return;
    }
    const filtered = projects.filter((project) => 
      project.tags.includes(activeTag)
    );
    setFiltered(filtered);
  }, [activeTag]);

  return (
    <div className="filter-container flex flex-row flex-wrap justify-center text-neutral-800">
      <button onClick={() => setActiveTag('all')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">All</button>
      <button onClick={() => setActiveTag('art')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">Art</button>
      <button onClick={() => setActiveTag('obj')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">Objects</button>
      <button onClick={() => setActiveTag('pho')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">Photo</button>
      <button onClick={() => setActiveTag('tec')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">Tech</button>
      <button onClick={() => setActiveTag('vid')} className="mx-4 px-4 border-2 border-neutral-800 active:bg-neutral-800 active:text-orange-100">Video</button>
    </div>
  )
}

export default Filter;
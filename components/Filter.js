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
      <button onClick={() => setActiveTag('all')} className={activeTag==='all' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>All</button>
      <button onClick={() => setActiveTag('art')} className={activeTag==='art' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>Art</button>
      <button onClick={() => setActiveTag('obj')} className={activeTag==='obj' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>Objects</button>
      <button onClick={() => setActiveTag('pho')} className={activeTag==='pho' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>Photo</button>
      <button onClick={() => setActiveTag('tec')} className={activeTag==='tec' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>Tech</button>
      <button onClick={() => setActiveTag('vid')} className={activeTag==='vid' ? "text-orange-100 bg-neutral-800 mx-4 px-4 border-2" : "mx-4 px-4 border-2 border-neutral-800"}>Video</button>
    </div>
  )
}

export default Filter;
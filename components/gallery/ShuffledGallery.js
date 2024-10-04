import { motion } from "framer-motion";
import { Children, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ShuffledGallery({ title, data }) {
  return (
    <ImageShuffle data={data}>
      <section className="grid h-dvh w-screen place-content-center bg-white cursor-default">
        <div className="items-center align-middle gap-2 text-neutral-800 text-wrap text-center m-24">
          <p className="text-xl font-bold uppercase">{title}</p>
        </div>
      </section>
    </ImageShuffle>
  );
}

const ImageShuffle = ({ children, data }) => {
  const itemTransform = useRef("");
  const imageRenderCount = useRef(data.length);
  const [imageIndexForModal, setImageIndexForModal] = useState(null);

  useEffect(() => {
    const itemPositions = data.map(() => ({ x: 0, y: 0, z: 0 }));
    const padX = window.innerWidth / 4;
    const padY = window.innerHeight / 3;
    itemPositions.current = data.map((item, index) => ({
      x: `${Math.round(Math.random() * (window.innerWidth - padX))}px`,
      y: `${Math.round(Math.random() * (window.innerHeight - padY))}px`,
      z: index,
    }));

    itemPositions.current.forEach((item, index) => {
      const element = document.querySelector(
        `[data-draggable-item-index="${index}"]`
      );
      if (element) {
        element.style.left = item.x;
        element.style.top = item.y;
        element.style.zIndex = item.z;
      } else {
        console.warn(`Element with index ${index} not found`);
      }
    });
  }, []);

  const handleDragStart = (e) => {
    e.target.style.zIndex = imageRenderCount.current;
  };

  const handleDragEnd = (e) => {
    itemTransform.current = e.target.style.transform;
    imageRenderCount.current = imageRenderCount.current + 1;
  };

  const handleMouseDown = (e) => {
    itemTransform.current = e.target.style.transform;
  };

  const handleMouseUp = (e) => {
    const index = e.target.getAttribute("data-draggable-item-index");
    if (itemTransform.current == e.target.style.transform) {
      // If mouse down and mouse up happen at the same location
      console.log("clicked", index, itemTransform.current);
      setImageIndexForModal(index);
    } else {
      console.log("dragged", index);
    }
  };

  return (
    <div className="relative overflow-hidden h-dvh flex justify-center items-center">
      {Children.map(children, child =>
        <div className={imageIndexForModal ? "blur" : ""}>
          {child}
        </div>
      )}
      {data.map((item, index) => (
        <motion.div
          className="absolute flex justify-center align-middle text-center cursor-pointer"
          drag
          key={index}
          data-draggable-item-index={index}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          dragMomentum={false}
        >
          <Image
            className={`pointer-events-none object-contain ${imageIndexForModal ? "blur" : ""} md:max-w-96 md:max-h-96 max-w-52 max-h-52`}
            width="1024"
            height="1024"
            src={item.src}
            alt={item.alt}
            placeholder="blur"
            blurDataURL={item.blurPlaceholder}
          />
        </motion.div>
      ))}
      {imageIndexForModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content change this to display image etc*/}
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setImageIndexForModal(null)}
              >
                Cancel
              </button>
              {imageIndexForModal}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

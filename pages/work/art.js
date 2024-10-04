import StackedGallery from '@/components/gallery/StackedGallery'
import data from '@/public/data/work/art.json';

export default function Art() {
  return (
    <div>
      <StackedGallery title="Selection of Art From 2019" data={data}/>
    </div>
  );
}
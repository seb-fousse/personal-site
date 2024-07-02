import ShuffledGallery from '@/components/ShuffledGallery'
import data from '@/public/data/work/art.json';

export default function Art() {
  return (
    <div>
      <ShuffledGallery title="Selection of Art From 2019" data={data}/>
    </div>
  );
}
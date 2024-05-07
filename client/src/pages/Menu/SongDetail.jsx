import { useParams } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import { getTrackDetailAPI } from '@/apis/everyoneDataAPI.jsx';


const SongDetail = () => {
    const [data,setData] = useState(null);  


    const { id } = useParams();
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await getTrackDetailAPI(id);
                console.log('response:', response);
                setData(response);
                
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchAlbum();
    },
    [id]);

    
  return (
    <div>
          <h1 className="text-3xl mb-5 font-poppins font-bold">{data && data.name}</h1>
          <img src={data && data.album.images[0].url} alt={data && data.album.name} className='h-[200px]'/>
      </div>
  )
}

export default SongDetail

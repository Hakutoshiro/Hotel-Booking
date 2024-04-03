import { useState } from "react"

export default function PlaceMainImg({  allPhotos }) {
    const [photos,setPhotos] = useState([]) 
    const [ready,setReady] = useState(false)

    if(!ready && allPhotos){
        setPhotos(allPhotos);
        setReady(true);
    }

    return (
        <div className="flex w-32 h-32 bg-gray-300  shrink-0">
            {photos.length > 0 &&
                <img src={import.meta.env.VITE_BACKEND_URL + '/uploads/' + photos[0]} alt="" />
            }
        </div>
    )
}
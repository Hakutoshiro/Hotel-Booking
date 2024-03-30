import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function AddedPlaces() {
    const [places, setPlaces] = useState([])
    const getPlaces = async () => {
        const { data } = await axios.get('/places');
        setPlaces(data);
    }
    useEffect(() => {
        getPlaces()
    }, [])
    return (
        <div className="my-4 flex flex-col gap-4 h-auto">
            {places.length > 0 && places.map((place,index) => (
                <div className="" key={index}>
                    <Link to={'/account/places/new/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300  shrink-0">
                            {place.photos.length > 0 &&
                                <img src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                            }
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
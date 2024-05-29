import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function IndexPage(){
    const [places,setPlaces] = useState([]);

    const getAllPlaces = async () =>{
        const {data} = await axios.get('/places/getallPlaces/allPlaces');
        setPlaces(data);
    }

    useEffect(() => {
        getAllPlaces();
    },[])

    return (
        <div className="mt-16 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length>0 && places.map((place,index) => {
                return (
                    <Link to={'/place/'+place._id} className="flex flex-col " key={index}>
                        {place.photos.length>0 && (
                            <img 
                            className="rounded-2xl object-cover aspect-square pb-3"
                            src={place.photos[0]} alt="IMG <3" />
                        )}
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm ">{place.title}</h3>
                        <div className="mt-2">
                            <span className="font-bold">₹ {place.price} </span>per night
                        </div>
                    </Link >
                )
            })}
        </div>
    );
}
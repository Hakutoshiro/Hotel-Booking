import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingComponent from "../components/BookingComponent";
import PlacePhotoGallery from "../components/PlacePhotoGallery";
import PlaceOnMap from "../components/PlaceOnMap";



export default function ShowPlacePage() {
    const { id } = useParams();
    const [placeInfo, setPlaceInfo] = useState(null)
    
    const getPlaceInfo = async () => {
        if (!id) return;
        else {
            const { data } = await axios.get('/places/' + id);
            setPlaceInfo(data);
        }
    }
    useEffect(() => {
        getPlaceInfo();
    }, []);

    

    if (!placeInfo) return '';
    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-6 text-start">
            <h1 className="text-3xl ">{placeInfo.title}</h1>
            <PlaceOnMap placeInfo={placeInfo}/>
            
            <PlacePhotoGallery placeInfo={placeInfo} />

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                <div className="">
                    <div className="my-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        {placeInfo.description}
                    </div>
                    <div className="grid ">
                        <div className="text-start">
                            CheckIn: {placeInfo.checkIn} <br />
                            checkOut: {placeInfo.checkOut} <br />
                            Max Number of Guests: {placeInfo.maxGuests}

                        </div>
                    </div>
                </div>
                <div className="mt-6 w-80">
                    <BookingComponent placeInfo={placeInfo} />
                </div>
            </div>
            {placeInfo.extraInfo && 
            <div className="bg-white -mx-6 rounded-2xl py-4 px-8 mt-3 mb-1">
                <h2 className="text-2xl font-semibold">Extra Info</h2>
                <div className="text-sm text-gray-700 leading-4 mt-2">
                    {placeInfo.extraInfo}
                </div>
            </div>
            }
        </div>
    )
}
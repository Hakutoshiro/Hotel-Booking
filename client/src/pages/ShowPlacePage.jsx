import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingComponent from "../components/BookingComponent";



export default function ShowPlacePage() {
    const { id } = useParams();
    const [placeInfo, setPlaceInfo] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black h-auto text-white">
                <div className="">
                    <h2 className="text-3xl bg-black w-4/6 ">{placeInfo.title}</h2>
                    <button className="flex fixed px-4 py-2 rounded-2xl top-4 right-4 bg-white text-black items-center" onClick={ev => setShowAllPhotos(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                        Close Photos
                    </button>
                </div>
                {placeInfo.photos?.length > 0 &&
                    placeInfo.photos?.map((photo, index) => {
                        return <div key={index} className="bg-black">
                            <img className="mx-auto py-2 max-h-96" src={import.meta.env.VITE_BACKEND_URL + "/uploads/" + photo} alt="" />
                        </div>
                    })
                }
            </div>
        )
    }

    if (!placeInfo) return '';
    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-6 text-start">
            <h1 className="text-3xl ">{placeInfo.title}</h1>
            <div className="flex gap-1 items-center my-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                <a
                    target="_blank"
                    href={"https://maps.google.com/?q=" + placeInfo.address}
                    className="my-2 block font-semibold underline "
                >{placeInfo.address}</a>
            </div>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden cursor-pointer" onClick={() => setShowAllPhotos(true)} >
                    <div className=" ">

                        {placeInfo.photos?.[0] &&
                            (
                                <div>
                                    <img className="w-full aspect-square object-cover" src={import.meta.env.VITE_BACKEND_URL + "/uploads/" + placeInfo.photos[0]} />
                                </div>
                            )
                        }

                    </div>
                    <div className="grid  ">

                        {placeInfo.photos?.[1] &&
                            (
                                <img className="w-full aspect-square object-cover" src={import.meta.env.VITE_BACKEND_URL + "/uploads/" + placeInfo.photos[1]} alt=""
                                />
                            )
                        }
                        <div className=" overflow-hidden">
                            {placeInfo.photos?.[2] &&
                                (
                                    <img className="w-full aspect-square object-cover pt-2" src={import.meta.env.VITE_BACKEND_URL + "/uploads/" + placeInfo.photos[2]} alt=""
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>

                    Show More Photos
                </button>
            </div>
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
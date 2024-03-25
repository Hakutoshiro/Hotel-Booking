import { useContext, useEffect, useState } from "react";
import Perks from "../components/Perks";
import UploadPhotos from "../components/UploadPhotos";
import { PhotosContext } from "../sharedContext/PhotosContext";
import axios from "axios";
import {Navigate} from "react-router-dom";

export default function PlacesPageForm(){

    const {setAddedPhotos:prevAddedPhotos} = useContext(PhotosContext);
        
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect,setRedirect] = useState(false);

    const getPhotos = async () => {
        await setAddedPhotos(prevAddedPhotos);
    }

    useEffect(()=>{
        getPhotos();
    },[prevAddedPhotos,setAddedPhotos])

    const inputHeader = (text) => {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    const inputDescription = (text) => {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    const preInput = (title, description) => {
        return (
            <>
                {inputHeader(title)}
                {inputDescription(description)}
            </>
        )
    }

    const handleSubmitBtn = async (ev) => {
        ev.preventDefault();
        await axios.post('/places',{
            title,address,description,
            perks,checkIn,checkOut,
            extraInfo ,maxGuests,addedPhotos
        } )
        setRedirect(true);
    }
    if(redirect){
        return <Navigate to={'/account/places'} />;
    }

    return (
        <form onSubmit={handleSubmitBtn}>
                        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos', 'more = better')}
                        <UploadPhotos />
                        {preInput('Description', 'description of the place')}
                        <textarea
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            className="block p-2.5 w-full h-32 text-sm text-gray-900 rounded-lg border border-gray-300 resize-none" />
                        {preInput('Perks', 'select all the perks of your place')}
                        <div className="grid mt-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra info', 'house rules, etc')}
                        <textarea
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                            className="block p-2.5 w-full  text-sm text-gray-900 rounded-lg border border-gray-300 resize-none" />
                        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="14" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input type="number" className="mt-3"
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(Number(ev.target.value))}
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night</h3>
                                <input type="number" className="mt-3" />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>

                    </form>
    )
}
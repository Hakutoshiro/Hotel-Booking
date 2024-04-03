import { useContext, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import { UserContext } from "../sharedContext/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingComponent({ placeInfo }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guestsNo, setGuestsNo] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const { user } = useContext(UserContext)
    const [ready, setReady] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [resData, setResData] = useState(null);
    let numberOfNights = 0;

    const bookThisPlace = async () =>{
        const bookingData = {
            place:placeInfo._id,
            user,
            checkIn,
            checkOut,
            guestsNo,
            name,
            mobile,
            price:placeInfo.price * numberOfNights
        }
        const {data} = await axios.post('/bookings/addBooking', bookingData);
        setResData(data);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={'/account/bookings/_/'+resData._id} />
    }

    if (!ready && user) {
        setName(user.name)
        setReady(true);
    }

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl  ">
            <div className="text-2xl text-center">
                Price: ₹{placeInfo.price} /per night
            </div>
            <div className="border mt-4 rounded-2xl ">
                <div className="grid grid-cols-2">
                    <div className="    py-3 px-2 border-r">
                        <label htmlFor="">Check In:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="   py-3 px-2">
                        <label htmlFor="">Check Out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="  py-3 px-2 border-t">
                    <label htmlFor="">Number of Guests:</label>
                    <input type="number"
                        className="w-full"
                        value={guestsNo}
                        onChange={ev => setGuestsNo(ev.target.value)}
                    />
                </div>
                {ready && numberOfNights > 0 && (
                    <>
                        <div className="py-3 px-2 border-t">
                            <label htmlFor="">Name</label>
                            <input type="text"
                                className="w-full"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                        </div>
                        <div className="py-3 px-2 border-t">
                        <label htmlFor="">Mobile Number:</label>
                        <input type="tel"
                            className="w-full"
                            value={mobile}
                            onChange={ev => setMobile(ev.target.value)}
                        />
                    </div>
                    </>
                )}
            </div>
            <button className="primary mt-4"
                onClick={bookThisPlace}
            >
                Book this Place
                {numberOfNights > 0 && (
                    <span>
                        {" ₹" + numberOfNights * placeInfo.price}
                    </span>
                )}
            </button>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import PlaceMainImg from "../components/PlaceMainImg";
import { differenceInCalendarDays } from "date-fns"
import DatesComponent from "../components/DatesComponent";

export default function MyBookingsPage() {
    const [bookingData, setBookingData] = useState();

    const getBookingData = async () => {
        const { data } = await axios.get('/bookings/');
        setBookingData(data);
    }
    useEffect(() => {
        getBookingData();
    }, [])
    return (
        <div className="my-4 flex flex-col gap-4 h-auto">
            {bookingData?.length > 0 && bookingData.map((booking, index) => (
                <Link to={`/account/bookings/_/${booking._id}`} key={index} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="">
                        <PlaceMainImg allPhotos={booking.place.photos} />
                    </div>
                    <div className="py-3 pr-3 grow">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        <DatesComponent booking={booking} />
                        <div className="text-xl flex ">
                            <div className=" flex gap-1">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>

                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night. |
                            </div>
                            <div className="flex gap-1 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                <span className="text-2xl">
                                    Total price: ${booking.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
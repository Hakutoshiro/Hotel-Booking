import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceOnMap from "../components/PlaceOnMap";
import DatesComponent from "../components/DatesComponent";
import { differenceInCalendarDays } from "date-fns"
import PlacePhotoGallery from "../components/PlacePhotoGallery";


export default function BookingPageDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="mx-auto my-8 w-4/5">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <PlaceOnMap placeInfo={booking.place} className="my-2 block"></PlaceOnMap>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <div className=" flex gap-1 border-t border-gray-400 pt-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night.
          </div>
          <DatesComponent booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlacePhotoGallery placeInfo={booking.place}/>
    </div>
  );
}
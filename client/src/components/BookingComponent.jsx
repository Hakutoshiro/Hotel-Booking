export default function BookingComponent(placeInfo) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl  ">
            <div className="text-2xl text-center">
                Price: ₹{placeInfo.price} /per night
            </div>
            <div className="border mt-4 rounded-2xl ">
                <div className="grid grid-cols-2">
                    <div className="    py-3 px-2 border-r">
                        <label htmlFor="">Check In:</label>
                        <input type="date" />
                    </div>
                    <div className="   py-3 px-2">
                        <label htmlFor="">Check Out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className="  py-3 px-2 border-t">
                    <label htmlFor="">Number of Guests:</label>
                    <input type="number" className="w-full" value={1} />
                </div>
            </div>
            <button className="primary mt-4">Book this Place</button>
        </div>
    )
}
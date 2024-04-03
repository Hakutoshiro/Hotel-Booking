import { useContext, useState } from "react"
import { UserContext } from "../sharedContext/UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios"
import PlacesPage from "./PlacesPage";
import MyBookingsPage from "./MyBookingsPage";
import BookingPageDetails from "./BookingPageDetails";
import AccountPageNavbar from "../components/AccountPageNavbar";


export default function AccountPage(){
    const {user,ready,setUser}=useContext(UserContext);
    const[redirect,setRedirect] = useState(false)
    let {subpages,id}= useParams();
    if(subpages===undefined)subpages='profile'
    
    async function logout(){
        await axios.post('/logout')
        setRedirect(true);
        setUser(null);
    }

    if(!ready) {
        return 'Loading...';
    }
    
    if(ready && !user && !redirect) 
    {
        return <Navigate to={'/login'}/>
    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <AccountPageNavbar subpages={subpages}/>
            {subpages==='profile' && 
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <br />
                    <button onClick={logout} className="bg-primary text-white w-full mx-auto rounded-xl px-4 mt-4 py-1">Logout</button>
                </div>
            }
            {subpages==='places' &&
                <PlacesPage/>
            }
            {
                subpages==='bookings' && !id && (
                    <MyBookingsPage />
                )
            }
            {
                subpages==='bookings' && id && (
                    <BookingPageDetails id={id} />
                )
            }
        </>
    )
}
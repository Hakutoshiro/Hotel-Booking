import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] =useState(false);
    const getUser = async () =>{
        const {data} =await   axios.get('/profile')
            setUser(data);
            setReady(true);
    }
    useEffect( ()=>
    {
        if(!user){
            getUser();
        }
    })
    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
}
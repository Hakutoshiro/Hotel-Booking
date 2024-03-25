import { createContext, useState } from "react";

export const PhotosContext = createContext({});

export function PhotosContextProvider({children}){
    const [setAddedPhotos,handleSetAddedPhotos] = useState([]);

    return (
        <PhotosContext.Provider value={{setAddedPhotos,handleSetAddedPhotos}}>
            {children}
        </PhotosContext.Provider>
    )
}
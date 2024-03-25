import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PhotosContext } from "../sharedContext/PhotosContext";

export default function UploadPhotos() {
    const {setAddedPhotos:prevAddedPhotos,handleSetAddedPhotos}  = useContext(PhotosContext);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photolink, setPhotolink] = useState('');

    const sendPhotos = async () =>{
        await handleSetAddedPhotos(addedPhotos);
    }
    const handleAddPhotos = async (ev) => {
        ev.preventDefault();
        if( !photolink )return ;
        const { data: filename } = await axios.post('/photoUpload/upload-by-link', { link: photolink })
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        setPhotolink('');
    }

    const uploadPhoto = async(ev) =>{
        const files =ev.target.files
        const fdata = new FormData();
        for(let i=0;i<files.length;i++){
            fdata.append('photos', files[i]);
        }
        const {data:filenames}= await axios.post('/photoUpload/upload',fdata,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        });
    }
    useEffect(() => {sendPhotos(),[addedPhotos]})
    return (
        <>
            <div className="flex gap-2">
                <input
                    value={photolink}
                    onChange={ev => setPhotolink(ev.target.value)}
                    type="text" placeholder={'Add using a link ....jpg'} />
                <button onClick={ev => handleAddPhotos(ev)} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map((photo, index) => {
                    return (

                        <img key={index} src={'http://localhost:4000/uploads/' + photo} className="rounded-xl h-32 w-full object-cover" />
                    )
                })}
                <label className=" h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" multiple onChange={uploadPhoto} className="hidden" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                </label>
            </div>
            {/* {prevAddedPhotos.length && console.log(prevAddedPhotos)} */}
        </>
    )
} 
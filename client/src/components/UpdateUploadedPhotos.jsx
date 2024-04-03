import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PhotosContext } from "../sharedContext/PhotosContext";
import { useParams } from "react-router-dom";

export default function UpdateUploadedPhotos() {
    const { setAddedPhotos: prevAddedPhotos, handleSetAddedPhotos } = useContext(PhotosContext);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photolink, setPhotolink] = useState('');
    const { id } = useParams()

    const sendPhotos = async () => {

        const { data } = await axios.get('/places/photos/' + id)
        handleSetAddedPhotos([...data]);
        setAddedPhotos([...data]);
    }
    const handlePhotoOrder = (index) => {
        [addedPhotos[0], addedPhotos[index]] = [addedPhotos[index], addedPhotos[0]]
        setAddedPhotos([...addedPhotos])
        handleSetAddedPhotos([...addedPhotos])
    } 

    const handleDeletePhotos = async (index) => {
        await axios.delete('/photoUpload/_/'+addedPhotos[index])
        let change = addedPhotos.filter((_, i) => { return i !== index })
        setAddedPhotos([...change])
        handleSetAddedPhotos([...change]);
    }

    const handleAddPhotos = async (ev) => {
        ev.preventDefault();
        if (!photolink) return;
        const { data: filename } = await axios.post('/photoUpload/upload-by-link', { link: photolink })
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        handleSetAddedPhotos([...addedPhotos, filename]);
        setPhotolink('');
    }


    const uploadPhoto = async (ev) => {
        const files = ev.target.files
        const fdata = new FormData();
        for (let i = 0; i < files.length; i++) {
            fdata.append('photos', files[i]);
        }
        const { data: filenames } = await axios.post('/photoUpload/upload', fdata, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        });
        handleSetAddedPhotos([...addedPhotos, ...filenames]);
    }
    useEffect(() => { sendPhotos() }, [])
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
                        <div className="flex  relative ">
                            <img
                                key={index} src={import.meta.env.VITE_BACKEND_URL+'/uploads/' + photo}
                                className="rounded-xl h-32 w-full object-cover"
                                onClick={ev => handlePhotoOrder(index)}
                            />
                            <button className="absolute bottom-1 right-1 text-white bg-black py-1 px-1 rounded-2xl bg-opacity-50"
                                onClick={ev => handleDeletePhotos(index)}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="w-6 h-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>

                        </div>
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
        </>
    )
} 
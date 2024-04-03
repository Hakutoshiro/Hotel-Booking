import { Link, useParams } from "react-router-dom"
import PlacesPageForm from "./PlacesPageForm"
import AddedPlaces from "../components/AddedPlaces";


export default function PlacesPage() {

    const { action } = useParams();

    return (
        <div>
            {action !== "new" &&
                <>
                    <div className="text-center mb-20">
                        <Link to={'/account/places/new'} className="inline-flex  gap-1 bg-primary text-white rounded-full py-1 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add New Place
                        </Link>
                    </div>
                    <AddedPlaces  />
                </>
            }

            {action === "new" &&
                (
                    <PlacesPageForm />
                )
            }
        </div>
    )
}
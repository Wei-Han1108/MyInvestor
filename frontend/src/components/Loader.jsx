import { Spinner } from "flowbite-react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen animate-spin"> 
            <Spinner />
        </div>
    )
}

export default Loader
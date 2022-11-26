import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ redirect }){
    const user = useContext(UserContext);

    if(user?.loading){
        return(
            <div className='w-screen h-screen flex items-center justify-center'>
                <CircularProgress />
            </div>
        )
    }

    if(user?.user){
        return redirect;
    }

    return <Navigate to='/login' />
}
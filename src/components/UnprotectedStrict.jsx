import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function UnprotectedStrict({ redirect }){
    const user = useContext(UserContext);

    if(user?.loading){
        return(
            <div className='w-screen h-screen flex items-center justify-center'>
                <CircularProgress />
            </div>
        )
    }

    if(user?.user){
        return  <Navigate to='/home' />;
    }

    return redirect;
}
import React, { useState, useEffect, createContext } from 'react';
import { getUserDetails } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserContext = createContext();

export default function UserContextProvider({ children }){
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            try{
                const data = await getUserDetails(setLoading);
                setUser(data);
            }catch(e){
                setUser(null);
            }
            setLoading(false);
        }
        checkUser()
    }, [])

    return(
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}
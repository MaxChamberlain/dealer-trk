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
            if(!document.cookie.includes('user_id')) {
                setLoading(false);
                if(location.pathname !== '/login' && location.pathname !== '/register'){
                    navigate('/login')
                }
            }
            try{
                const data = await getUserDetails(setLoading);
                if(data){
                    setUser(data);
                    if(location.pathname === '/login' || location.pathname === '/register'){
                        navigate('/home')
                    }
                }else{
                    if(location.pathname !== '/login' && location.pathname !== '/register'){
                        navigate('/login')
                    }
                }
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
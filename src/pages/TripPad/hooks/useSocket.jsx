import { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client';
import { UserContext } from '../../../contexts/UserContext'
import { initializeSocketListeners } from '../utils/socketHandler';

export function useSocket(setDocs, setCellsBeingEdited){
    const [socket, setSocket] = useState(null);    
    const { user } = useContext(UserContext)

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL + '?company_id=' + document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1])
        setSocket(newSocket); 
        return () => {
            newSocket.emit('stopEditing', null, user);
            newSocket.close();
        };
    }, [setSocket, document.cookie]);

    useEffect(() => {
        if (socket) {
            initializeSocketListeners(socket, setDocs, setCellsBeingEdited);
        }
    }, [socket]);


    return [socket, setSocket]
}
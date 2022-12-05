import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavDates = () => {

    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');
    
    useEffect(() => {
        //get url params
        if(!startDate || !endDate){
            var d = new Date();
            var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
            let secondDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1);
            urlParams.set('startDate', secondDay.toISOString().split('T')[0]);
            urlParams.set('endDate', new Date(new Date(new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
            navigate(`?${urlParams.toString()}`, { replace: true });
        }
        //if endDate is before startDate, set endDate to startDate
        if(new Date(startDate) > new Date(endDate)){
            urlParams.set('endDate', startDate);
            navigate(`?${urlParams.toString()}`, { replace: true });
        }
    }, [])

    const handleDateChange = (date, type) => {
        if(type === 'start'){
            urlParams.set('startDate', new Date(date).toISOString().split('T')[0]);
        }else{
            urlParams.set('endDate', new Date(date).toISOString().split('T')[0]);
        }
        window.location.search = urlParams.toString();
    }

    return [startDate, endDate, handleDateChange]
}
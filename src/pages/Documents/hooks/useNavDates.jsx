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
            urlParams.set('startDate', firstDay.toLocaleDateString('en-US'));
            urlParams.set('endDate', new Date(new Date(new Date()).setDate(new Date().getDate() + 1)).toLocaleDateString('en-US'));
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
            urlParams.set('startDate', new Date(date).toLocaleDateString('en-US'));
        }else{
            urlParams.set('endDate', new Date(date).toLocaleDateString('en-US'));
        }
        window.location.search = urlParams.toString();
    }

    return [startDate, endDate, handleDateChange]
}
import { useState, useEffect } from 'react';
import { getCompanyDetails, getDocumentTypes, getDocumentsByCompanyId } from '../../../utils/api';

export const useDocs = (setLoading, setError, company) => {
    const [ documents, setDocuments ] = useState(null);

    // get the first day of this month
    const startDate = new Date();
    startDate.setDate(2);
    startDate.setHours(0, 0, 0, 0);

    // get the last day of this month
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);

    console.log(startDate, endDate)

    useEffect(() => {
        getDocumentsByCompanyId(setLoading, setError, company.company_id, startDate, endDate).then((e) => {
            if(!e) return null;
            // get all dates in this month into an array
            let dates = [];
            for(let i = 1; i <= endDate.getDate(); i++){
                dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), i).toLocaleDateString('en-US'));
            }
            const count = dates.map((date) => {
                return{
                    date: date,
                    Sales: e.filter((e) => {
                        return new Date(e.metadata.created_at).toLocaleDateString('en-US') === date;
                    }).length
                }
            })
            
            let countOfDaysCovered = 0

            dates.forEach(e => {
                //convert number to day of week word
                const day = new Date(e).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                if(company.company_working_days.includes(day)){
                    countOfDaysCovered++;
                }
            })

            let days = (Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)) + 1) - 1;
            if(new Date(startDate).getMonth() + 1 === 12) countOfDaysCovered--

            let pace = Math.floor((e.filter(e => new Date(e.metadata.created_at).getDate() < new Date().getDate()).length / days) * countOfDaysCovered);

            setDocuments({
                documents: e,
                chart: {
                    sales: count
                },
                pace
            });
        })
    }, [])

    return [ documents, setDocuments ]
}
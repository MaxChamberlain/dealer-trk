import { useState, useEffect } from 'react';
import { getCompanyDetails, getDocumentTypes, getDocumentsByCompanyId } from '../../../utils/api';
import { properNumber } from '../../../utils/textDisplay';

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

    useEffect(() => {
        getDocumentsByCompanyId(setLoading, setError, company.company_id, startDate, endDate).then((e) => {
            if(!e) return null;
            // get all dates in this month into an array
            let dates = [];
            for(let i = 1; i <= endDate.getDate(); i++){
                dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), i).toLocaleDateString('en-US'));
            }
            
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

            let average = Math.floor(e.length / days);

            const count = dates.map((date) => {
                return{
                    date: date,
                    Sales: e.filter((e) => {
                        return new Date(e.metadata.created_at).toLocaleDateString('en-US') === date;
                    }).length,
                    pace: Math.floor((e.filter(e => new Date(e.metadata.created_at).getDate() < new Date(date).getDate()).length / days) * countOfDaysCovered),
                    "Average To Date": Math.floor((e.filter(e => new Date(e.metadata.created_at).getDate() < new Date(date).getDate()).length / days)),
                }
            })

            const existingSources = [...new Set(e.map(e => e.data.vehicle.v_source))]
            const salesBySource = existingSources.map((source, i) => {
                return{
                    name: source,
                    Sales: e.filter(e => e.data.vehicle.v_source === source).length,
                    Margin: properNumber(e?.filter(e => e.data.vehicle.v_source === source)?.reduce((a, b) => a + parseInt(b?.data?.vehicle?.v_margin || 0), 0) || 0),
                    color: `hsl(${i * 360 / existingSources.length}, 70%, 50%)`,
                }
            })
            
            let totalMargin = 0;
            e.forEach(obj => {
                totalMargin += parseInt(obj?.data?.vehicle?.v_margin || 0);
            });

            let averageMargin = Math.floor(totalMargin / e.length);

            let marginPace = Math.floor(totalMargin/days) * countOfDaysCovered;

            let amtCertified = e.filter(x => {
                return x.data.vehicle.v_is_certified === true;
            })?.length || 0

            let cert = {
                certified: e.filter(x => {
                    return x.data.vehicle.v_is_certified === true;
                }).reduce((a, b) => a + parseInt(b?.data?.vehicle?.v_margin || 0), 0) / amtCertified,
                uncertified: e.filter(x => {
                    return x.data.vehicle.v_is_certified === false;
                }).reduce((a, b) => a + parseInt(b?.data?.vehicle?.v_margin || 0), 0) / (e.length - amtCertified),
            }

            setDocuments({
                documents: e,
                chart: {
                    sales: count,
                    salesBySource,
                },
                pace,
                average,
                totalMargin,
                averageMargin,
                marginPace,
                amtCertified,
                cert
            });
        })
    }, [])

    return [ documents, setDocuments ]
}
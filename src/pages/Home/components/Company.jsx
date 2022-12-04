import { proper } from '../../../utils/textDisplay';
import { useDocs } from '../hooks/useDocs';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Company({ company }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ documents, setDocuments ] = useDocs(setLoading, setError, company);
    return (
        <div className='w-[98%] mx-auto'>
            <div className='w-full mx-auto mt-6 p-2 bg-[#4992DB] rounded shadow-md text-white text-2xl font-bold'>
                {proper(company.company_name)}
            </div>
            <div className='text-base font-normal mb-6 flex flex-wrap gap-4 justify-around items-center'>
                <div className='w-full p-6 shadow-md bg-white rounded'>
                    <div className='font-bold text-center w-full'>Sales - {documents?.chart?.sales ? documents.chart.sales.reduce((a, b) => a + b.Sales, 0) : 0} Total</div>
                    <div className='mx-auto w-full'>
                        <ResponsiveContainer width='100%' height={300}>
                            <AreaChart width={'100%'} height={300} data={documents?.chart?.sales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="Sales" stroke="#4992DB" activeDot={{ r: 8 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='p-6 shadow-md bg-white rounded'>
                    <div className='font-bold text-center w-full'>You are on pace for</div>
                    <div className='font-bold text-center w-full text-xl my-2'>{documents?.pace || 0} Sales</div>
                    <div className='font-bold text-center w-full'>this month</div>
                </div>
            </div>
        </div>
    )
}
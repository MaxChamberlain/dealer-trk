import { proper } from '../../../utils/textDisplay';
import { useDocs } from '../hooks/useDocs';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

export default function Company({ company }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ documents, setDocuments ] = useDocs(setLoading, setError, company);
    return (
        <div className='w-[98%] mx-auto'>
            <div className='text-base font-normal mb-6 flex gap-4 mt-4 justify-around items-center w-full h-full'>
                <div className='w-2/3 p-6 shadow-md bg-white rounded'>
                    <div className='font-bold text-center w-full'>Sales - {documents?.chart?.sales ? documents.chart.sales.reduce((a, b) => a + b.Sales, 0) : 0} Total</div>
                    <div className='mx-auto w-full'>
                        <ResponsiveContainer width='100%' height={315}>
                            <ComposedChart width={730} height={250} data={documents?.chart?.sales}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="Average To Date" stroke="#ffbb00" fill='#ffbb00' activeDot={{ r: 8 }} baseLine={-150} />
                                <Bar dataKey="Sales" barSize={20} fill="#4992DB" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='flex flex-col gap-4 w-1/3 h-full'>
                    <div className='p-6 shadow-md bg-[#4992DB] text-white rounded h-full text-lg'>
                        <div className='font-bold text-center w-full'>Average and Pace</div>
                    </div>
                    <div className='p-6 shadow-md bg-white rounded'>
                        <div className='font-bold text-center w-full'>You are on pace for</div>
                        <div className='font-bold text-center w-full text-2xl my-2'>{documents?.pace || 0} Sales</div>
                        <div className='font-bold text-center w-full'>by the end of this month</div>
                    </div>
                    <div className='p-6 shadow-md bg-white rounded'>
                        <div className='font-bold text-center w-full'>You are averaging</div>
                        <div className='font-bold text-center w-full text-2xl my-2'>{documents?.average || 0} Sales</div>
                        <div className='font-bold text-center w-full'>per day this month</div>
                    </div>
                </div>
            </div>
            <div className='text-base font-normal mb-6 flex gap-4 mt-4 justify-around items-center w-full h-full'>
                <div className='flex flex-col gap-4 w-1/3 h-full'>
                    <div className='p-2 shadow-md bg-[#4992DB] text-white rounded h-full text-lg'>
                        <div className='font-bold text-center w-full'>Sales by Source</div>
                    </div>
                    <div className='p-6 shadow-md bg-white rounded'>
                        <ResponsiveContainer width='100%' height={350}>
                            <RadialBarChart 
                                width={730} 
                                height={250} 
                                innerRadius="10%" 
                                outerRadius="120%" 
                                data={documents?.chart?.salesBySource} 
                                startAngle={180} 
                                endAngle={0}
                            >
                                <RadialBar minAngle={15} label={{ fill: '#fff', position: 'insideStart' }} background clockWise={true} dataKey='Sales' nameKey='name' name='name'>
                                    {
                                        documents?.chart?.salesBySource?.sort((a, b) => b.Sales - a.Sales).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)
                                    }
                                </RadialBar>
                                <Legend iconSize={10} />
                                <Tooltip content={CustomToolTip} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='w-2/3 p-6 shadow-md bg-white rounded'>
                </div>
            </div>
        </div>
    )
}

function renderCustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, color, value }){
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const linex = cx + (radius * 1.65) * Math.cos(-midAngle * RADIAN);
    const liney = cy + (radius * 1.65) * Math.sin(-midAngle * RADIAN);
  
    return (
        <>
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            
            <text x={linex} y={liney} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {name} - {value}
            </text>
        </>
    );
  };

function CustomToolTip({ active, payload, label }) {
    if (active) {
        return (
            <div className="p-2 bg-white rounded-sm border border-[#ccc]">
                <p className="label">{`${payload[0].payload.name}`}</p>
                <p className="label">{`${payload[0].payload.Sales}`} Sales</p>
                <p className="label">${`${payload[0].payload.Margin}`} Total Margin</p>
            </div>
        );
    }

    return null;
}
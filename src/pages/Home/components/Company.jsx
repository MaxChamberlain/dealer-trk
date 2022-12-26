import { proper, properNumber } from '../../../utils/textDisplay';
import { useDocs } from '../hooks/useDocs';
import { useState } from 'react';
import { BarChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Company({ company }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ documents, setDocuments ] = useDocs(setLoading, setError, company);
    const navigate = useNavigate();
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
                <div className='flex flex-col gap-4 w-1/2 h-full'>
                    <div className='p-2 shadow-md bg-[#4992DB] text-white rounded h-full text-lg'>
                        <div className='font-bold text-center w-full'>Sales by Source</div>
                    </div>
                    <div className='p-6 shadow-md bg-white rounded'>
                        <ResponsiveContainer width='100%' height={350}>
                            <BarChart
                                width={730}
                                height={250}
                                data={documents?.chart?.salesBySource}
                                margin={{
                                    top: 5,
                                    right: 60,
                                    left: 20,
                                    bottom: 35,
                                }}
                            >
                                <XAxis dataKey="name" style={{ fontSize: 12 }} interval={0} angle={45} textAnchor='start'  />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Sales" fill="#4992DB" onClick={e => navigate(`/documents?source=${e.name}&`)} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='w-1/4 h-[460px] justify-start flex flex-col items-between'>
                    <div className='p-2 shadow-md bg-[#4992DB] text-white rounded text-lg'>
                        <div className='font-bold text-center w-full'>Margin</div>
                    </div>
                    <div>
                        <div className='p-5 shadow-md bg-white rounded mt-4'>
                            <div className='font-bold text-center w-full'>Total Margin <span className='text-gray-600 font-normal'>(sum of all margins)</span></div>
                            <div className='font-bold text-center w-full text-2xl my-2'>${properNumber(documents?.totalMargin || 0)}</div>
                        </div>
                        <div className='p-5 shadow-md bg-white rounded mt-4'>
                            <div className='font-bold text-center w-full'>Average Margin <span className='text-gray-600 font-normal'></span></div>
                            <div className='font-bold text-center w-full text-2xl my-2'>${properNumber(documents?.averageMargin || 0)}</div>
                        </div>
                        <div className='p-5 shadow-md bg-white rounded mt-4'>
                            <div className='font-bold text-center w-full'>You are on pace for <span className='text-gray-600 font-normal'></span></div>
                            <div className='font-bold text-center w-full text-2xl my-2'>${properNumber(documents?.marginPace || 0)}</div>
                            <div className='font-bold text-center w-full'>in margin this month <span className='text-gray-600 font-normal'></span></div>
                        </div>
                    </div>
                </div>
                <div className='w-1/4 h-[460px] justify-start flex flex-col items-between'>
                    <div className='p-2 shadow-md bg-[#4992DB] text-white rounded text-lg'>
                        <div className='font-bold text-center w-full'>Certified vs Non-Certified</div>
                    </div>
                    <div>
                        <div className='p-5 shadow-md bg-white rounded mt-4'>
                            <div className='font-bold text-center w-full'>Out of {documents?.documents?.length} vehicles sold this month<span className='text-gray-600 font-normal'></span></div>
                            <div className='font-bold text-center w-full text-2xl my-2 relative'>
                                <CircularProgress
                                    variant="determinate"
                                    value={documents?.amtCertified / documents?.documents?.length * 100}
                                    size={100}
                                    thickness={3}
                                    className='mx-auto'
                                />
                                <div className='font-bold text-center w-full text-2xl absolute top-1/2 -translate-y-1/2'>{documents?.amtCertified || 0}</div>
                            </div>
                            <div className='font-bold text-center w-full'>are certified<span className='text-gray-600 font-normal'></span></div>
                        </div>
                        <div className='p-9 shadow-md bg-white rounded mt-4'>
                            <div className='font-bold text-center w-full'>Certified vehicles have averaged</div>
                            <div className='font-bold text-center w-full text-2xl my-2'>${Math.floor((documents?.cert?.certified - documents?.cert?.uncertified))} {documents?.cert?.certified - documents?.cert?.uncertified > 0 ? 'More' : 'less'} <span className='text-gray-600 font-normal'>({Math.floor((documents?.cert?.certified / documents?.cert?.uncertified) * 100)}%) </span></div>
                            <div className='font-bold text-center w-full'>per vehicle than Non-Certified vehicles</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
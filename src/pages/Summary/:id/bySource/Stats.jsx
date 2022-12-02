
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventIcon from '@mui/icons-material/Event';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShieldIcon from '@mui/icons-material/Shield';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { proper, properNumber } from '../../../../utils/textDisplay';
import { CircularProgress } from '@mui/material';

export default function Stats({docs}){
    return(
        <>
        <div className='flex justify-around text-black px-6 py-6 bg-white rounded-lg drop-shadow pb-12'>
            <div className='h-full relative flex flex-col items-center justify-start'>
                <div className='flex gap-x-4 items-center font-bold'>
                    <ShieldIcon style={{ height: 50, width: 35 }} />
                    Total Certified
                </div>
                <div className='mt-16 text-center text-3xl relative mb-10'>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        {docs?.filter((doc) => doc.data.vehicle.v_is_certified)?.length || 0}
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        <CircularProgress
                            variant='determinate'
                            value={((docs?.filter((doc) => doc.data.vehicle.v_is_certified)?.length || 0) / (docs?.length || 1)) * 100}
                            size={150}
                            thickness={2}
                            sx={{
                                color: '#4992DB',
                                position: 'absolute', 
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                    background: '#3f51b5',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <div className='h-full relative flex flex-col items-center justify-start'>
                <div className='flex gap-x-4 items-center font-bold'>
                    <ShieldIcon style={{ height: 50, width: 35 }} />
                    Trades % of Sales
                </div>
                <div className='mt-16 text-center text-3xl relative mb-10'>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        {((docs?.filter((doc) => doc.data.vehicle.v_is_trade).length / docs?.length) * 100).toFixed(0)}%
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        <CircularProgress
                            variant='determinate'
                            value={((docs?.filter((doc) => doc.data.vehicle.v_is_trade).length / docs?.length) * 100).toFixed(2)}
                            size={150}
                            thickness={2}
                            sx={{
                                color: '#4992DB',
                                position: 'absolute', 
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                    background: '#3f51b5',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <div className='h-full relative flex flex-col items-center justify-start'>
                <div className='flex gap-x-4 items-center font-bold'>
                    <ShieldIcon style={{ height: 50, width: 35 }} />
                    Avg Margin
                </div>
                <div className='mt-16 text-center text-3xl relative mb-10'>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        ${properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length).toFixed(0))}
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        <CircularProgress
                            variant='determinate'
                            value={
                                (docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length) 
                                / 
                                (docs?.sort((a, b) => parseInt(b.data.vehicle?.v_margin || 0) - parseInt(a.data.vehicle?.v_margin || 0))[0]?.data.vehicle?.v_margin || 1)
                            * 100}
                            size={150}
                            thickness={2}
                            sx={{
                                color: '#4992DB',
                                position: 'absolute', 
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                    background: '#3f51b5',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
                                                    
            <div className='h-full relative flex flex-col items-center justify-start'>
                <div className='flex gap-x-4 items-center font-bold'>
                    <AttachMoneyIcon style={{ height: 50, width: 35 }} />
                    Avg Market %
                </div>
                <div className='mt-16 text-center text-3xl relative mb-10'>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        {properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length).toFixed(2))}%
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                        <CircularProgress
                            variant='determinate'
                            value={100 * (docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length) / (docs?.sort((a, b) => parseInt(b.data.vehicle?.v_market_percent || 0) - parseInt(a.data.vehicle?.v_market_percent || 0))[0]?.data.vehicle?.v_market_percent || 0)}
                            size={150}
                            thickness={2}
                            sx={{
                                color: '#4992DB',
                                position: 'absolute', 
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                    background: '#3f51b5',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>

            <div className='grid grid-cols-5 mt-4 h-full w-full text-lg gap-2 text-black font-bold'>
                                                    
                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-start'>
                    <div className='flex gap-x-4 items-center font-bold'>
                        <AttachMoneyIcon style={{ height: 50, width: 35 }} />
                        Total Margin
                    </div>
                    <div className='mt-10 text-center text-3xl'>
                        ${properNumber(docs?.reduce((acc, doc) => acc + parseInt(doc?.data?.vehicle?.v_margin || 0), 0) || 0)}
                    </div>
                </div>
                                                    
                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-start'>
                    <div className='flex gap-x-4 items-center font-bold'>
                        <AttachMoneyIcon style={{ height: 50, width: 35 }} />
                        Amount of Trades
                    </div>
                    <div className='mt-10 text-center text-3xl'>
                    {docs?.filter((doc) => doc.data.vehicle.v_is_trade).length}
                    </div>
                </div>
                                                    
                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-start'>
                    <div className='flex gap-x-4 items-center font-bold'>
                        <AttachMoneyIcon style={{ height: 50, width: 35 }} />
                        Avg Days
                    </div>
                    <div className='mt-10 text-center text-3xl'>
                        {(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) / docs?.length).toFixed(2)}
                    </div>
                </div>
        
                <div className='flex flex-col gap-y-2'>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            <EventIcon style={{ height: 50, width: 35 }} />
                            Top Vehicle Year
                        </div>
                        <div className='mt-4'>
                            {[...new Set(docs?.map((doc) => doc.data.vehicle.v_year))].sort((a, b) => b - a).slice(0,1).map((year) => {
                                return(
                                    <div className='flex justify-between text-3xl'>
                                        <div>{year}</div>
                                        <div className='ml-4'>{docs?.filter((doc) => doc.data.vehicle.v_year === year).length}</div>
                                    </div>
                                )  
                            })}
                        </div>
                    </div>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            <DirectionsBusIcon style={{ height: 50, width: 35 }} />
                            Top Vehicle Make
                        </div>
                        <div className='mt-4'>
                            {[...new Set(docs?.map((doc) => doc.data.vehicle.v_make))].sort((a, b) => b - a).slice(0,1).map((make) => {
                                return(
                                    <div className='flex justify-between text-3xl'>
                                        <div>{make}</div>
                                        <div className='ml-4'>{docs?.filter((doc) => doc.data.vehicle.v_make === make).length}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow'>
                    <div className='flex gap-x-4 items-center w-full justify-center'>
                        <DirectionsCarIcon style={{ height: 35, width: 35 }} />
                        Top 5 Vehicles
                    </div>
                    <div className='mt-4'>
                        {[...new Set(docs?.map((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}`))].sort((a, b) => b - a).slice(0,5).map((make, i) => {
                            return(
                                <div className='flex justify-between'>
                                    <div className='text-3xl'>{i + 1}</div>
                                    <div className='ml-4 text-left w-full mt-1'>{make}</div>
                                    <div className='ml-4'>{docs?.filter((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}` === make).length}</div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventIcon from '@mui/icons-material/Event';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShieldIcon from '@mui/icons-material/Shield';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { proper, properNumber } from '../../../../utils/textDisplay';
import { CircularProgress, LinearProgress} from '@mui/material';

export default function Stats({docs}){
    return(
        <>
            <div className='flex justify-center flex-wrap mt-4 h-full w-full text-lg gap-4 text-black font-bold'>
                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-start' style={{ minWidth: '20rem' }}>
                    <div className='w-full flex items-center justify-between mb-4'>
                        <div className='flex gap-x-4 items-center font-bold justify-between w-full'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center'>
                                    <LinearProgress
                                        variant='determinate'
                                        value={((docs?.filter((doc) => doc.data.vehicle.v_is_certified)?.length || 0) / (docs?.length || 1)) * 100}
                                        sx={{
                                            color: '#4992DB',
                                            height: 80,
                                            width: 8,
                                            '& .MuiLinearProgress-bar': {
                                                background: '#3f51b5',
                                            },
                                            "& span.MuiLinearProgress-bar": {
                                            transform: `translateY(${100-((docs?.filter((doc) => doc.data.vehicle.v_is_certified)?.length || 0) / (docs?.length || 1)) * 100}%) !important` //has to have !important
                                            }
                                        }}
                                        className='mr-6'
                                        />
                                </div>
                                <div className='flex items-center justify-center'>
                                    {docs?.filter((doc) => doc.data.vehicle.v_is_certified)?.length || 0}
                                </div>
                            </div>
                        </div>
                        Total Certified
                    </div>
                    
                    <div className='flex w-full items-center justify-between mb-4'>
                        <div className='flex items-center'>
                            <div className='flex items-center justify-center'>
                                <LinearProgress
                                    variant='determinate'
                                    value={((docs?.filter((doc) => doc.data.vehicle.v_is_trade)?.length || 0) / (docs?.length || 1)) * 100}
                                    sx={{
                                        color: '#4992DB',
                                        height: 80,
                                        width: 8,
                                        '& .MuiLinearProgress-bar': {
                                            background: '#3f51b5',
                                        },
                                        "& span.MuiLinearProgress-bar": {
                                        transform: `translateY(${100-((docs?.filter((doc) => doc.data.vehicle.v_is_trade)?.length || 0) / (docs?.length || 1)) * 100}%) !important` //has to have !important
                                        }
                                    }}
                                    className='mr-6'
                                />
                            </div>
                            <div>
                                {(((docs?.filter((doc) => doc.data.vehicle.v_is_trade)?.length || 0) / docs?.length) * 100).toFixed(0)}%
                            </div>
                        </div>
                        Took a Trade
                    </div>
                    
                    <div className='flex items-center justify-between w-full mb-4'>
                        <div className='flex items-center'>
                            <div className='flex items-center'>
                                <LinearProgress
                                    variant='determinate'
                                    value={
                                        ((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length) 
                                        / 
                                        (docs?.sort((a, b) => parseInt(b.data.vehicle?.v_margin || 0) - parseInt(a.data.vehicle?.v_margin || 0))[0]?.data.vehicle?.v_margin || 1)) || 0
                                    }
                                    sx={{
                                        color: '#4992DB',
                                        height: 80,
                                        width: 8,
                                        '& .MuiLinearProgress-bar': {
                                            background: '#3f51b5',
                                        },
                                        "& span.MuiLinearProgress-bar": {
                                        transform: `translateY(${
                                            100 - (((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length) 
                                            / 
                                            (docs?.sort((a, b) => parseInt(b.data.vehicle?.v_margin || 0) - parseInt(a.data.vehicle?.v_margin || 0))[0]?.data.vehicle?.v_margin || 1)) * 100)
                                        }%) !important` //has to have !important
                                        }
                                    }}
                                    className='mr-6'
                                />
                            </div>
                            <div>
                                ${properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length).toFixed(0))}
                            </div>
                        </div>
                        Avg Margin
                    </div>
                                                            
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div>
                                <LinearProgress
                                    variant='determinate'
                                    value={100 - (((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length)))}
                                    sx={{
                                        color: '#4992DB',
                                        height: 80,
                                        width: 8,
                                        '& .MuiLinearProgress-bar': {
                                            background: '#3f51b5',
                                        },
                                        "& span.MuiLinearProgress-bar": {
                                        transform: `translateY(${(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length) > 100 ? 0 : (100 - (docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length))}%) !important` //has to have !important
                                        }
                                    }}
                                    className='mr-6'
                                />
                            </div>
                            <span>
                                {properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length).toFixed(2))}%
                            </span>
                        </div>
                        Avg Market %
                    </div>
                </div>

                <div className='flex flex-col items-center justify-between' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Total Margin
                        </div>
                        <div className='text-centertext-xl'>
                            ${properNumber(docs?.reduce((acc, doc) => acc + parseInt(doc?.data?.vehicle?.v_margin || 0), 0) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Amount of Trades
                        </div>
                        <div className='text-centertext-xl'>
                        {docs?.filter((doc) => doc.data.vehicle.v_is_trade).length}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg Days
                        </div>
                        <div className='text-centertext-xl'>
                            {(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) / docs?.length).toFixed(2)}
                        </div>
                    </div>
                </div>                                                    
            </div>
        </>
    )
}
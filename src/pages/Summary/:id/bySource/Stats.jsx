
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventIcon from '@mui/icons-material/Event';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShieldIcon from '@mui/icons-material/Shield';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { proper, properNumber } from '../../../../utils/textDisplay';
import { CircularProgress, LinearProgress} from '@mui/material';
import { getPace } from './utils/companyParser'

export default function Stats({docs, company, dateRange}){
    const pace = getPace(company, dateRange, docs)
    return(
        <>
            <div className='grid grid-cols-4 mt-6 h-full w-full text-lg gap-4 text-black font-bold'>
                <div className='h-full text-black px-6 py-6 gap-y-4 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-start' style={{ minWidth: '20rem' }}>
                    <div className='w-full grid grid-cols-2 justify-between items-center text-center'>
                        <div className='flex gap-x-4 items-center font-bold justify-between w-full'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center'>
                                    <LinearProgress
                                        variant='determinate'
                                        value={(((docs?.filter((doc) => doc.data.vehicle.v_is_certified && !doc.rollback)?.length || 0) - (docs?.filter(doc => doc.data.vehicle.v_is_certified && doc.rollback).length || 0)) / (docs?.length || 1)) * 100}
                                        sx={{
                                            color: '#4992DB',
                                            height: 80,
                                            width: 8,
                                            '& .MuiLinearProgress-bar': {
                                                background: '#3f51b5',
                                            },
                                            "& span.MuiLinearProgress-bar": {
                                            transform: `translateY(${100-(((docs?.filter((doc) => doc.data.vehicle.v_is_certified && !doc.rollback)?.length || 0) - (docs?.filter((doc) => doc.data.vehicle.v_is_certified && doc.rollback)?.length || 0)) / (docs?.length || 1)) * 100}%) !important` //has to have !important
                                            }
                                        }}
                                        className='mr-6'
                                        />
                                </div>
                                <div className='flex items-center justify-center'>
                                    {(docs?.filter((doc) => doc.data.vehicle.v_is_certified && !doc.rollback)?.length || 0) - (docs?.filter((doc) => doc.data.vehicle.v_is_certified && doc.rollback)?.length || 0)}
                                </div>
                            </div>
                        </div>
                        Total Certified
                    </div>
                    
                    <div className='w-full grid grid-cols-2 justify-between items-center text-center'>
                        <div className='flex items-center'>
                            <div className='flex items-center justify-center'>
                                <LinearProgress
                                    variant='determinate'
                                    value={((docs?.filter((doc) => doc.data.vehicle.v_is_trade && !doc.rollback)?.length || 0) - (docs?.filter((doc) => doc.data.vehicle.v_is_trade && doc.rollback)?.length || 0)) / (docs?.length || 1)}
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
                    
                    <div className='w-full grid grid-cols-2 justify-between items-center text-center'>
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
                        Avg PVR
                    </div>
                                                            
                    <div className='w-full grid grid-cols-2 justify-between items-center text-center'>
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
                            Total Gross
                        </div>
                        <div className='text-center'>
                            ${properNumber(docs?.reduce((acc, doc) => acc + parseInt(doc?.data?.vehicle?.v_margin || 0), 0) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Amount of Trades
                        </div>
                        <div className='text-center'>
                        {docs?.filter((doc) => doc.data.vehicle.v_is_trade).length}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg Days In Stock
                        </div>
                        <div className='text-center'>
                            {(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) / docs?.length).toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-between' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Pace
                        </div>
                        <div className='text-center'>
                            {pace} sales
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg Recon
                        </div>
                        <div className={'text-center'}>
                        ${properNumber((docs?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_final_acv || 0) - parseInt(b.data.vehicle.v_acv || 0)), 0) / docs?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Average Price {Math.sign((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_sell_price || 0), 0) - docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_start_price || 0), 0)) / docs?.length) === -1 ? 'Drop' : 'Gain'} from Start to Sale
                        </div>
                        <div className='text-center'>
                            ${properNumber(((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_sell_price || 0), 0) - docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_start_price || 0), 0)) / docs?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                </div>     

                <div className='flex flex-col items-center justify-between' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg MMR Diff  (Out - In)
                        </div>
                        <div className='text-center'>
                            ${properNumber(((docs?.reduce((acc, doc) => acc + (doc.data.vehicle?.v_final_mmr && doc.data.vehicle?.v_initial_mmr) ?  parseInt(doc.data.vehicle?.v_final_mmr || 0) - parseInt(doc.data.vehicle?.v_initial_mmr || 0) : 0, 0)) / docs?.filter(e => e.data.vehicle?.v_final_mmr && e.data.vehicle?.v_initial_mmr)?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full mb-4'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg CarGurus Diff (Out - In)
                        </div>
                        <div className={'text-center'}>
                            ${properNumber(((docs?.reduce((acc, doc) => acc + (doc.data.vehicle?.v_final_carg_h && doc.data.vehicle?.v_initial_carg_h) ?  parseInt(doc.data.vehicle?.v_final_carg_h || 0) - parseInt(doc.data.vehicle?.v_initial_carg_h || 0) : 0, 0)) / docs?.filter(e => e.data.vehicle?.v_final_carg_h && e.data.vehicle?.v_initial_carg_h)?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Average Price Diff Per Day In Stock
                        </div>
                        <div className='text-center'>
                            {docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) > 0 ? `$${properNumber(((docs?.reduce((acc, doc) => acc + (parseInt(doc.data.vehicle?.v_sell_price || 0) - parseInt(doc.data.vehicle?.v_start_price || 0)), 0) / docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0))).toFixed(2) || 0)}` : 'N/A'}
                        </div>
                    </div>
                </div>                                                                 
            </div>
        </>
    )
}
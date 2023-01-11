
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventIcon from '@mui/icons-material/Event';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShieldIcon from '@mui/icons-material/Shield';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { proper, properNumber } from '../../../../utils/textDisplay';
import { CircularProgress, LinearProgress, Table, TableCell, TableRow, TableHead, TableBody} from '@mui/material';
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

                <div className='flex flex-col items-center justify-between gap-4' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Total Gross
                        </div>
                        <div className='text-center'>
                            ${properNumber(docs?.reduce((acc, doc) => acc + parseInt(doc?.data?.vehicle?.v_margin || 0), 0) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
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

                <div className='flex flex-col items-between h-full justify-between gap-4' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Pace
                        </div>
                        <div className='text-center'>
                            {pace} sales
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg Recon
                        </div>
                        <div className={'text-center'}>
                            ${properNumber((docs?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_final_acv || 0) - parseInt(b.data.vehicle.v_acv || 0)), 0) / docs?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                </div>     

                <div className='flex flex-col items-center justify-between gap-4' style={{ minWidth: '20rem' }}>
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg MMR Change  (Out - In)
                        </div>
                        <div className='text-center'>
                            ${properNumber(((docs?.filter(e => e.data.vehicle?.v_final_mmr > 0 && e.data.vehicle?.v_initial_mmr > 0)?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_final_mmr || 0) - parseInt(doc.data.vehicle?.v_initial_mmr || 0), 0)) / docs?.filter(e => e.data.vehicle?.v_final_mmr && e.data.vehicle?.v_initial_mmr)?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg CarGurus Change (Out - In)
                        </div>
                        <div className={'text-center'}>
                            ${properNumber(((docs?.filter(e => e.data.vehicle?.v_final_carg_h > 0 && e.data.vehicle?.v_initial_carg_h > 0)?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_final_carg_h || 0) - parseInt(doc.data.vehicle?.v_initial_carg_h || 0), 0)) / docs?.filter(e => e.data.vehicle?.v_final_carg_h && e.data.vehicle?.v_initial_carg_h)?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                                                        
                    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                        <div className='flex gap-x-4 items-center font-bold'>
                            Avg Price Change from Start to Sale
                        </div>
                        <div className='text-center'>
                            ${properNumber(((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_sell_price || 0), 0) - docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_start_price || 0), 0)) / docs?.length)?.toFixed(2) || 0)}
                        </div>
                    </div>
                </div>                                                       
            </div>

            <div className='flex flex-col items-center justify-between gap-4 w-full mt-4' style={{ minWidth: '20rem' }}>
                <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Amount of Vehicles</TableCell>
                                <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Avg Price Change from Start to Sale</TableCell>
                                <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Avg Market %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ fontSize: '1.125rem'}}>&lt; 10 Days</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => e?.data?.vehicle?.v_days < 10).length}</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>${
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days < 10)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_sell_price - b.data.vehicle.v_start_price) ,0) 
                                        / 
                                        docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days < 10)?.length) || 0
                                    ).toFixed(2)
                                }
                                </TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days < 10)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_market_percent) , 0)) / docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days < 10).length
                                    ).toFixed(0)
                                }%
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontSize: '1.125rem'}}>10-20 Days</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => e?.data?.vehicle?.v_days < 20 && e?.data?.vehicle?.v_days >= 10).length}</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>${
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 10 && e?.data?.vehicle?.v_days < 20)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_sell_price - b.data.vehicle.v_start_price) ,0) 
                                        / 
                                        docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 10 && e?.data?.vehicle?.v_days < 20)?.length) || 0
                                    ).toFixed(2)
                                }
                                </TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 10 && e?.data?.vehicle?.v_days < 20)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_market_percent) , 0)) / docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 10 && e?.data?.vehicle?.v_days < 20).length
                                    ).toFixed(0)
                                }%
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontSize: '1.125rem'}}>20-30 Days</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => e?.data?.vehicle?.v_days >= 20 && e?.data?.vehicle?.v_days < 30).length}</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>${
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 20 && e?.data?.vehicle?.v_days < 30)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_sell_price - b.data.vehicle.v_start_price) ,0) 
                                        / 
                                        docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 20 && e?.data?.vehicle?.v_days < 30)?.length) || 0
                                    ).toFixed(2)
                                }
                                </TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 20 && e?.data?.vehicle?.v_days < 30))?.reduce((a, b) => a + parseInt(b.data.vehicle.v_market_percent) , 0) / docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 20 && e?.data?.vehicle?.v_days < 30).length
                                    ).toFixed(0)
                                }%
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontSize: '1.125rem'}}>30+ Days</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => e?.data?.vehicle?.v_days >= 30).length}</TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>${
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 30)?.reduce((a, b) => a + parseInt(b.data.vehicle.v_sell_price - b.data.vehicle.v_start_price) ,0) 
                                        / 
                                        docs?.filter(e => e?.data?.vehicle?.v_sell_price && e?.data?.vehicle?.v_start_price)?.filter(e => e?.data?.vehicle?.v_days >= 30)?.length) || 0
                                    ).toFixed(2)
                                }
                                </TableCell>
                                <TableCell style={{ fontSize: '1.125rem'}}>{
                                    (
                                        (docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 30))?.reduce((a, b) => a + parseInt(b.data.vehicle.v_market_percent) , 0) / docs?.filter(e => e?.data?.vehicle?.v_market_percent > 0)?.filter(e => e?.data?.vehicle?.v_days >= 30).length
                                    ).toFixed(0)
                                }%
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>     
            </div>     

<div className='flex flex-col items-center justify-between gap-4 w-full mt-4' style={{ minWidth: '20rem' }}>
    <div className='h-full text-black px-6 py-6 bg-white rounded-lg drop-shadow relative flex flex-col items-center justify-between w-full'>
        {console.log(docs?.filter(e => !e.data.vehicle.v_year))}
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Year</TableCell>
                    <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Amount of Vehicles</TableCell>
                    <TableCell style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Avg MSRP vs Sell Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear()}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear())?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear() - 1}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 1)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 1 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 1 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear() - 2}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 2)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 2 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 2 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear() - 3}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 3)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 3 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 3 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear() - 4}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 4)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 4 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 4 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>{new Date().getFullYear() - 5}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 5)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 5 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) == new Date().getFullYear() - 5 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ fontSize: '1.125rem'}}>Before {new Date().getFullYear() - 5}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>{docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) < new Date().getFullYear() - 5)?.length}</TableCell>
                    <TableCell style={{ fontSize: '1.125rem'}}>${(docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) < new Date().getFullYear() - 5 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.reduce((a, b) => a + (parseInt(b.data.vehicle.v_msrp - b.data.vehicle.v_sell_price)) , 0) / docs?.filter(e => (e?.data?.vehicle?.v_year || e?.data?.vehicle?.v_vehicle?.split(' ')[0]) < new Date().getFullYear() - 5 && e.data.vehicle.v_msrp && e.data.vehicle.v_sell_price)?.length).toFixed(2)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>     
</div>     
        </>
    )
}
import { proper, properNumber } from '../../../utils/textDisplay';
import { Divider, Button, Table, TableRow, TableCell, TableHead, TableBody, TextField } from '@mui/material';
import { useState } from 'react';
import { addDocumentNotes } from '../../../utils/api';

export default function DocumentItem({ doc, index, doc_id, docNotes}){
    const [ open, setOpen ] = useState(false);
    const [ notes, setNotes ] = useState(docNotes);

    return(
        <>
            <TableRow className={`
                ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}
            >
                <TableCell>
                    {doc.vehicle?.v_stock_no ? doc.vehicle.v_stock_no : 'N/A'}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_year} {doc.vehicle?.v_make?.toUpperCase() || ''} {doc.vehicle?.v_model?.toUpperCase() || ''} {doc.vehicle?.v_package?.toUpperCase() || ''}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_vin_no ? doc.vehicle.v_vin_no : 'N/A'}
                </TableCell>
                <TableCell>
                    ${doc.vehicle?.v_margin ? properNumber(doc.vehicle.v_margin) : 'N/A'}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_days ? properNumber(doc.vehicle.v_days) : 'N/A'}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_source ? proper(doc.vehicle.v_source) : 'N/A'}
                </TableCell>
                <TableCell>
                    <div className='text-center'>
                        {doc.vehicle?.v_initial_mmr ? '$' + properNumber(doc.vehicle.v_initial_mmr) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                    <div className='w-full h-px bg-stone-400'></div>
                    <div className='text-center'>
                    {doc.vehicle?.v_initial_carg_h ? '$' + properNumber(doc.vehicle.v_initial_carg_h) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                </TableCell>
                <TableCell>
                <div className='text-center'>
                        {doc.vehicle?.v_final_mmr ? '$' + properNumber(doc.vehicle.v_final_mmr) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                    <div className='w-full h-px bg-stone-400'></div>
                    <div className='text-center'>
                    {doc.vehicle?.v_final_carg_h ? '$' + properNumber(doc.vehicle.v_final_carg_h) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                </TableCell>
                <TableCell>
                <div className='text-center'>
                        {(doc.vehicle?.v_final_mmr && doc.vehicle?.v_initial_carg_h) ? '$' + properNumber(doc.vehicle.v_final_mmr - doc.vehicle?.v_initial_mmr) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                    <div className='w-full h-px bg-stone-400'></div>
                    <div className='text-center'>
                    {(doc.vehicle?.v_final_carg_h && doc.vehicle?.v_initial_carg_h)? '$' + properNumber(doc.vehicle?.v_final_carg_h - doc.vehicle.v_initial_carg_h) :
                        <span className='italic text-stone-500'>N/A</span>}
                    </div>
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_certified ? 'Yes' : 'No'}
                </TableCell>    
                <TableCell>
                    {doc.vehicle?.v_start_price ? '$' + properNumber(doc.vehicle.v_start_price) :
                        <span className='italic text-stone-500'>N/A</span>}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_sell_price ? '$' + properNumber(doc.vehicle.v_sell_price) :
                        <span className='italic text-stone-500'>N/A</span>}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_market_percent ? properNumber(doc.vehicle.v_market_percent) + '%' :
                        <span className='italic text-stone-500'>N/A</span>}
                </TableCell>
                <TableCell>
                    {doc.vehicle?.v_was_trade ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                    {doc.trade?.v_trade_vehicle ? proper(doc.vehicle.v_trade_vehicle) :
                        <span className='italic'>N/A</span>}
                </TableCell>
                <TableCell>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => setOpen(was => !was)}
                    >
                        {open ? 'Close' : 'Open'}
                    </Button>
                </TableCell>
            </TableRow>
            {open &&
            <>
                <TableRow className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}
                >
                    <TableCell colSpan={14}>
                         <TextField
                            label='Notes'
                            variant='outlined'
                            fullWidth
                            defaultValue={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </TableCell>
                    <TableCell colSpan={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{
                                height: '3rem',
                                width: '100%'
                            }}
                            onClick={() => addDocumentNotes(doc_id, notes)}
                        >
                            Submit Notes
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}
                >
                    <TableCell colSpan={16}>
                        {doc?.vehicle?.v_final_carg_h_options ? <>
                            <div className='flex flex-col w-full p-4'>
                                <div className='flex flex-row w-full justify-between text-md font-bold text-center'>
                                    <span>Great <br /> {doc.vehicle.v_final_carg_h_options?.greatPrice}</span>
                                    <span>Good <br /> {doc.vehicle.v_final_carg_h_options?.goodPrice}</span>
                                    <span>Fair <br /> {doc.vehicle.v_final_carg_h_options?.fairPrice}</span>
                                    <span>High <br /> {doc.vehicle.v_final_carg_h_options?.highPrice}</span>
                                    <span>Over <br /> {doc.vehicle.v_final_carg_h_options?.overPrice}</span>
                                </div>
                                <div className='w-full h-6 mt-6 relative' style={{
                                    background: 'linear-gradient(90deg, rgba(0,163,50,1) 0%, rgba(255,160,0,1) 71%, rgba(255,0,0,1) 100%)',
                                }}>
                                    <div className='absolute top-0 left-0 h-full'
                                        style={{
                                            marginLeft: `${(doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.overPrice ? 1 :
                                                            doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.highPrice ? 0.75 :
                                                            doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.fairPrice ? 0.5 :
                                                            doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.goodPrice ? 0.25 :
                                                            0
                                            ) * 100}%`
                                        }}
                                    >
                                        <div className='relative'>
                                            <div className='absolute -bottom-2 right-0 w-6 h-6'>
                                                <svg>
                                                    <path d="M 0 0 L 15 15 L 30 0 Z" fill="#1776D1" />
                                                </svg>
                                            </div>
                                            <div className='absolute top-6 right-0 w-6 h-6'>
                                                <svg>
                                                    <path d="M 0 15L30 15L15 0Z" fill="#1776D1" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> :
                            <span className='italic'>No CarGurus Information Present</span>
                        }
                    </TableCell>
                </TableRow>
            </>
            }
        </>
    )
}
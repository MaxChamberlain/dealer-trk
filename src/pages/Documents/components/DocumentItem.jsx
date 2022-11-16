import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import { Divider, Button, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

export default function DocumentItem({ doc, index, company }){
    return(
        <TableRow className={`${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}>
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
                {company}
            </TableCell>
        </TableRow>
    )
}
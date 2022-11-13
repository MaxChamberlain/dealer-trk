import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import { Divider, Button, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

export default function DocumentItem({ doc, index }){
    return(
        <TableRow className={`${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}>
            <TableCell>
                {doc.v_stock_no}
            </TableCell>
            <TableCell>
                {doc.v_year} {proper(doc.v_make)} {proper(doc.v_model)} {proper(doc.v_package)}
            </TableCell>
            <TableCell>
                {doc.v_vin_no}
            </TableCell>
            <TableCell>
                ${properNumber(doc.v_margin)}
            </TableCell>
            <TableCell>
                {properNumber(doc.v_days)}
            </TableCell>
            <TableCell>
                {proper(doc.v_source)}
            </TableCell>
            <TableCell>
                <div className='text-center'>
                    {doc.v_initial_mmr ? '$' + properNumber(doc.v_initial_mmr) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
                <div className='w-full h-px bg-stone-400'></div>
                <div className='text-center'>
                {doc.v_initial_carg_h ? '$' + properNumber(doc.v_initial_carg_h) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
            </TableCell>
            <TableCell>
            <div className='text-center'>
                    {doc.v_final_mmr ? '$' + properNumber(doc.v_final_mmr) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
                <div className='w-full h-px bg-stone-400'></div>
                <div className='text-center'>
                {doc.v_final_carg_h ? '$' + properNumber(doc.v_final_carg_h) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
            </TableCell>
            <TableCell>
            <div className='text-center'>
                    {doc.v_final_mmr ? '$' + properNumber(doc.v_final_mmr - doc.v_initial_mmr) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
                <div className='w-full h-px bg-stone-400'></div>
                <div className='text-center'>
                {doc.v_final_carg_h ? '$' + properNumber(doc.v_final_carg_h - doc.v_initial_carg_h) :
                    <span className='italic text-stone-500'>N/A</span>}
                </div>
            </TableCell>
            <TableCell>
                {doc.v_certified ? 'Yes' : 'No'}
            </TableCell>    
            <TableCell>
                {doc.v_start_price ? '$' + properNumber(doc.v_start_price) :
                    <span className='italic text-stone-500'>N/A</span>}
            </TableCell>
            <TableCell>
                {doc.v_sell_price ? '$' + properNumber(doc.v_sell_price) :
                    <span className='italic text-stone-500'>N/A</span>}
            </TableCell>
            <TableCell>
                {doc.v_market_percent ? properNumber(doc.v_market_percent) + '%' :
                    <span className='italic text-stone-500'>N/A</span>}
            </TableCell>
            <TableCell>
                {doc.v_was_trade ? 'Yes' : 'No'}
            </TableCell>
            <TableCell>
                {doc.v_trade_vehicle ? proper(doc.v_trade_vehicle) :
                    <span className='italic'>N/A</span>}
            </TableCell>
            <TableCell>
                {doc.company_name}
            </TableCell>
        </TableRow>
    )
}
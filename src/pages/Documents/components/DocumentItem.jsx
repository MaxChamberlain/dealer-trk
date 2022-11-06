import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import { Divider, Button, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

export default function DocumentItem({ doc, index }){
    const [ isOpen, setIsOpen ] = useState(false);
    console.log(index)
    return(
        // <div id='document-list-item' className={`z-[9990] w-full bg-white drop-shadow p-4 ${isOpen ? 'my-16' : 'mb-4'}`}>
        //     <div className="flex justify-between items-center">
        //         <div>
        //             <span className='font-bold text-xl'>
        //                 {doc.v_year} {proper(doc.v_make)} {proper(doc.v_model)} <span className='font-normal text-gray-700'>- {doc.document_type_name}</span>
        //             </span>
        //             <br />
        //             <span className='text-base text-gray-600'>
        //                 {doc.v_vin_no}
        //             </span>
        //         </div>
        //         {isOpen || <div className='flex justify-end mt-8 mb-4 text-gray-400 italic'>
        //             {doc.company_name}
        //         </div>}
        //         <div className='text-base text-gray-600 flex flex-col items-end'>
        //             <i>Created {new Date(doc.date_created).toLocaleString('en-US')} </i>
        //             <i>Modified {new Date(doc.date_modified).toLocaleString('en-US')} </i>
        //         </div>
        //     </div>
        //     <div>
                // <Table>
                        <TableRow className={index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}>
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
                                {doc.v_initial_mmr ? '$' + properNumber(doc.v_initial_mmr) :
                                    <span className='italic text-stone-500'>N/A</span>}
                            </TableCell>
                            <TableCell>
                                {doc.v_initial_carg_h ? '$' + properNumber(doc.v_initial_carg_h) :
                                    <span className='italic text-stone-500'>N/A</span>}
                            </TableCell>
                            <TableCell>
                                {doc.v_final_mmr ? '$' + properNumber(doc.v_final_mmr) :
                                    <span className='italic text-stone-500'>N/A</span>}
                            </TableCell>
                            <TableCell>
                                {doc.v_final_carg_h ? '$' + properNumber(doc.v_final_carg_h) :
                                    <span className='italic text-stone-500'>N/A</span>}
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
                /* </Table> */
        //     </div>
        // </div>
    )
}
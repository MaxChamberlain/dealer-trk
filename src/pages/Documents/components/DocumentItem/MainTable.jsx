import { proper, properNumber } from '../../../../utils/textDisplay';
import { Button, TableRow, TableCell } from '@mui/material';

export default function MainTable({ doc, index, hovering, notes, doc_id, open, setOpen, setHovering }){
    return(
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
                    {doc.vehicle?.v_is_certified ? 'Yes' : 'No'}
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
                <TableCell className='relative'
                    onMouseEnter={() => doc.vehicle?.v_is_trade ? setHovering({...hovering, trade: true}) : null}
                    onMouseLeave={() => doc.vehicle?.v_is_trade ? setHovering({...hovering, trade: false}) : null}
                >
                    {doc.vehicle?.v_is_trade ? 
                        <Button
                            variant='outlined'
                            size='small'
                            style={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            Yes
                        </Button>
                        :
                        <span>No</span>
                    }
                    {hovering.trade &&
                        <div className='absolute right-2/3 top-0 z-50 bg-white border border-gray-300 rounded-md shadow-xl text-2xl p-2 whitespace-nowrap'>
                            <div className='text-base font-bold'>
                                {doc?.trade?.v_trade_year} {doc?.trade?.v_trade_make?.toUpperCase() || ''} {doc?.trade?.v_trade_model?.toUpperCase() || ''} {doc?.trade?.v_trade_package?.toUpperCase() || ''} {doc?.trade?.v_trade_pkg?.toUpperCase() || ''}
                            </div>
                            <div className='text-sm'>
                                {doc?.trade?.v_trade_vin_no}
                            </div>
                            <div className='text-sm'>
                                {properNumber(doc?.trade?.v_trade_miles || '')} Miles
                            </div>
                            <div className='text-sm'>
                                ${properNumber(doc?.trade?.v_trade_acv || '')} Trade Value
                            </div>
                        </div>
                    }
                </TableCell>
                <TableCell className='relative'
                    onMouseEnter={() => notes ? setHovering({...hovering, notes: true}) : null}
                    onMouseLeave={() => notes ? setHovering({...hovering, notes: false}) : null}
                >
                    {notes ? 
                        <Button
                            variant='outlined'
                            size='small'
                            style={{
                                color: 'black',
                                borderColor: 'black'
                            }}
                        >
                            View
                        </Button>
                        :
                        <span>N/A</span>
                    }
                    {hovering.notes &&
                        <div className='absolute right-2/3 top-0 z-50 bg-white border border-gray-300 rounded-md shadow-xl text-2xl p-2 whitespace-nowrap font-bold'>
                            <div className='text-sm'>
                                {notes}
                            </div>
                        </div>
                    }
                </TableCell>
                <TableCell>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => setOpen(was => was.includes(doc_id) ? was.filter(id => id !== doc_id) : [...was, doc_id])}
                    >
                        {open.includes(doc_id) ? 'Close' : 'Open'}
                    </Button>
                </TableCell>
            </TableRow>
    )
}
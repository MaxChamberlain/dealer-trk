import { useLocation } from 'react-router-dom';
import { getDocumentsByCompanyId, getCompanyDetails } from '../../../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { proper, properNumber } from '../../../utils/textDisplay';
import { Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function Overview(){
    const [ docs, setDocs ] = useState(null);
    const [ company, setCompany ] = useState(null);

    const URLParams = new URLSearchParams(useLocation().search);
    const start = URLParams.get('start');
    const end = URLParams.get('end');
    const companyId = window.location.pathname.split('/')[2];

    useEffect(() => {
        getDocumentsByCompanyId(() => {}, () => {}, companyId, start, end).then((res) => {
            console.log(res)
            setDocs(res);
        })
        getCompanyDetails(() => {}, () => {}).then((res) => {
            setCompany(res.find((company) => company.company_id === companyId))
        })
    }, [])

    return(
        <div className='p-6'>
            <motion.div className="rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                    background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)',
                }}
                    initial={{ width: '0%', x: -100 }}
                    animate={{ width: '100%', x: 0 }}
                    exit={{ width: '0%', x: -100 }}
                >
                    <span>Summary Overview {company ? 'for ' + proper(company?.company_name || 'No Company Name') : ''}</span>
                    <span>{start === end ? start : start + ' - ' + end}</span>
                </motion.div>
                    <div>
                            <div className='p-3 rounded-lg drop-shadow bg-white mt-6'>
                                <div className='flex justify-between'>
                                    <div className='text-2xl'>TOTAL - ALL SOURCES</div>
                                    <div className='text-2xl'>{docs?.length} Total Sales</div>
                                </div>
                                <Table>
                                    <TableHead className='w-full'
                                        sx={{
                                            '& th': {
                                                fontSize: 15
                                            }
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>Total Certified</TableCell>
                                            <TableCell>Total Margin</TableCell>
                                            <TableCell>Average Margin</TableCell>
                                            <TableCell>Average Days</TableCell>
                                            <TableCell>Average Market %</TableCell>
                                            <TableCell>Amount of Trades</TableCell>
                                            <TableCell>Trades % Total of Sales</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody
                                        sx={{
                                            '& td': {
                                                fontSize: 15
                                            }
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>{docs?.filter((doc) => doc.data.vehicle.v_is_certified).length}</TableCell>
                                            <TableCell>${properNumber(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0)?.toFixed(2) || 0)}</TableCell>
                                            <TableCell>${properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.length).toFixed(2))}</TableCell>
                                            <TableCell>{(docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) / docs?.length).toFixed(2)}</TableCell>
                                            <TableCell>{properNumber((docs?.reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.length).toFixed(2))}%</TableCell>
                                            <TableCell>{docs?.filter((doc) => doc.data.vehicle.v_is_trade).length}</TableCell>
                                            <TableCell>{((docs?.filter((doc) => doc.data.vehicle.v_is_trade).length / docs?.length) * 100).toFixed(2)}%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} className='text-center'>
                                            <div className='flex justify-between mt-4 w-full text-sm'>
                                                <div>
                                                    <div className='flex gap-x-4 items-center font-bold'>
                                                        <DirectionsCarIcon style={{ height: 50, width: 35 }} />
                                                        Top 5 Vehicles
                                                    </div>
                                                    <div>
                                                        {[...new Set(docs?.map((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}`))].sort((a, b) => a.localeCompare(b)).slice(0,5).map((make) => {
                                                            return(
                                                                <div className='flex justify-between'>
                                                                    <div>{make}</div>
                                                                    <div className='ml-4'>{docs?.filter((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}` === make).length}</div>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className='flex gap-x-4 items-center font-bold'>
                                                        <DirectionsCarIcon style={{ height: 50, width: 35 }} />
                                                        Top Vehicle Year
                                                    </div>
                                                    <div>
                                                        {[...new Set(docs?.map((doc) => doc.data.vehicle.v_year))].sort((a, b) => a.localeCompare(b)).slice(0,1).map((year) => {
                                                            return(
                                                                <div className='flex justify-between'>
                                                                    <div>{year}</div>
                                                                    <div className='ml-4'>{docs?.filter((doc) => doc.data.vehicle.v_year === year).length}</div>
                                                                </div>
                                                            )  
                                                        })}
                                                    </div>
                                                </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                    {[...new Set(docs?.map((doc) => doc.data.vehicle.v_source))].sort((a, b) => a.localeCompare(b)).map((type) => {
                        return(
                            <div className='p-3 rounded-lg drop-shadow bg-white mt-6'>
                                <div className='flex justify-between'>
                                    <div className='text-2xl'>{proper(type || 'OTHER')}</div>
                                    <div className='text-2xl'>{docs?.filter((doc) => doc.data.vehicle.v_source === type).length} Total Sales</div>
                                </div>
                                <Table>
                                    <TableHead className='w-full'
                                        sx={{
                                            '& th': {
                                                fontSize: 15
                                            }
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>Total Certified</TableCell>
                                            <TableCell>Total Margin</TableCell>
                                            <TableCell>Average Margin</TableCell>
                                            <TableCell>Average Days</TableCell>
                                            <TableCell>Average Market %</TableCell>
                                            <TableCell>Amount of Trades</TableCell>
                                            <TableCell>Trades % Total of Sales</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody
                                        sx={{
                                            '& td': {
                                                fontSize: 15
                                            }
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell>{docs?.filter((doc) => doc.data.vehicle.v_source === type).filter((doc) => doc.data.vehicle.v_is_certified).length}</TableCell>
                                            <TableCell>${properNumber(docs?.filter((doc) => doc.data.vehicle.v_source === type).reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0).toFixed(2))}</TableCell>
                                            <TableCell>${properNumber((docs?.filter((doc) => doc.data.vehicle.v_source === type).reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_margin || 0), 0) / docs?.filter((doc) => doc.data.vehicle.v_source === type).length).toFixed(2))}</TableCell>
                                            <TableCell>{(docs?.filter((doc) => doc.data.vehicle.v_source === type).reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_days || 0), 0) / docs?.filter((doc) => doc.data.vehicle.v_source === type).length).toFixed(2)}</TableCell>
                                            <TableCell>{properNumber((docs?.filter((doc) => doc.data.vehicle.v_source === type).reduce((acc, doc) => acc + parseInt(doc.data.vehicle?.v_market_percent || 0), 0) / docs?.filter((doc) => doc.data.vehicle.v_source === type).length).toFixed(2))}%</TableCell>
                                            <TableCell>{docs?.filter((doc) => doc.data.vehicle.v_source === type).filter((doc) => doc.data.vehicle.v_is_trade).length}</TableCell>
                                            <TableCell>{((docs?.filter((doc) => doc.data.vehicle.v_source === type).filter((doc) => doc.data.vehicle.v_is_trade).length / docs?.filter((doc) => doc.data.vehicle.v_source === type).length) * 100).toFixed(2)}%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <div className='flex justify-between mt-4 w-full text-sm'>

                                                    <div>
                                                        <div className='flex gap-x-4 items-center font-bold'>
                                                            <DirectionsCarIcon style={{ height: 50, width: 35 }} />
                                                            Top 5 Vehicles
                                                        </div>
                                                        <div>
                                                            {[...[...new Set(docs?.filter((doc) => doc.data.vehicle.v_source === type).map((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}`))].sort((a, b) => a.localeCompare(b)), '- None -', '- None -', '- None -', '- None -', '- None -'].slice(0,5).map((make) => {
                                                                return(
                                                                    <div className='flex justify-between'>
                                                                        <div>{make}</div>
                                                                        <div className='ml-4'>{make === '- None -' ? '' : docs?.filter((doc) => doc.data.vehicle.v_source === type).filter((doc) => `${doc.data.vehicle.v_make} ${doc.data.vehicle.v_model}` === make).length}</div>
                                                                    </div>
                                                                )
                                                            }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className='flex gap-x-4 items-center font-bold'>
                                                            <DirectionsCarIcon style={{ height: 50, width: 35 }} />
                                                            Top Vehicle Year
                                                        </div>
                                                        <div>
                                                            {[...new Set(docs?.filter((doc) => doc.data.vehicle.v_source === type).map((doc) => doc.data.vehicle.v_year))].sort((a, b) => a.localeCompare(b)).slice(0,1).map((year) => {
                                                                return(
                                                                    <div className='flex justify-between'>
                                                                        <div>{year}</div>
                                                                        <div className='ml-4'>{docs?.filter((doc) => doc.data.vehicle.v_source === type).filter((doc) => doc.data.vehicle.v_year === year).length}</div>
                                                                    </div>
                                                                )  
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}
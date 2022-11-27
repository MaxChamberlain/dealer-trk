import { useLocation } from 'react-router-dom';
import { getDocumentsByCompanyId, getCompanyDetails } from '../../../../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { proper, properNumber } from '../../../../utils/textDisplay';
import Stats from './Stats';
import { Button, ButtonGroup } from '@mui/material';

export default function Overview(){
    const [ docs, setDocs ] = useState(null);
    const [ company, setCompany ] = useState(null);
    const [ sources, setSources ] = useState([]);
    const [ availSources, setAvailSources ] = useState([]);

    const URLParams = new URLSearchParams(useLocation().search);
    const start = URLParams.get('start');
    const end = URLParams.get('end');
    const companyId = window.location.pathname.split('/')[2];

    useEffect(() => {
        getDocumentsByCompanyId(() => {}, () => {}, companyId, start, end).then((res) => {
            console.log(res.map(e => e.data.vehicle?.v_margin))
            setDocs(res);
            setAvailSources([...new Set(res.map(doc => doc.data.vehicle.v_source))])
        })
        getCompanyDetails(() => {}, () => {}).then((res) => {
            setCompany(res.find((company) => company.company_id === companyId))
        })
    }, [])

    return(
        <div className='p-6'>
            <motion.div className="rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                    background: 'linear-gradient(90deg, hsla(350, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)',
                }}
                    initial={{ width: '0%', x: -100 }}
                    animate={{ width: '100%', x: 0 }}
                    exit={{ width: '0%', x: -100 }}
                >
                    <span>Summary Overview {company ? 'for ' + proper(company?.company_name || 'No Company Name') : ''}</span>
                    <span>{start === end ? start : start + ' - ' + end}</span>
                </motion.div>
                <div className='w-full bg-white mt-4'>
                    <ButtonGroup fullWidth>
                        <Button variant={(sources.length === 0 || availSources.every(e => e ? sources.includes(e) : sources.includes('Other'))) ? 'contained' : 'outlined'} onClick={() => {
                            if(sources.length !== 0){
                                setSources([...availSources, 'Other'])
                            }
                        }}>All</Button>
                        {availSources.map((source, index) => {
                            if(source === undefined) source = 'Other'
                            return(
                                <Button key={index} variant={sources.includes(source) ? 'contained' : 'outlined'} onClick={() => {
                                    if(sources.includes(source)){
                                        setSources(sources.filter((s) => s !== source));
                                    } else {
                                        setSources([...sources, source]);
                                    }
                                }}>{source}</Button>
                            )
                        })}
                    </ButtonGroup>
                </div>
                    <div>
                            <div className='p-3 mt-6'>
                                <div className="rounded-t-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                                    background: '#4992DB',
                                }}>
                                    <div className='text-2xl'>TOTAL - ALL SOURCES</div>
                                    <div className='text-2xl'>{
                                        sources.length > 0 ? docs.filter(e => e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')).length : docs?.length
                                    } Total Sales</div>
                                </div>
                                <Stats docs={sources.length > 0 ? docs.filter(e => e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')) : docs} />
                            </div>
                    {[...new Set(docs?.map((doc) => doc.data.vehicle.v_source))].filter(e => sources.length > 0 ? (e ? sources.includes(e) : sources.includes('Other')) : true).sort((a, b) => a.localeCompare(b)).map((type, i) => {
                        return(
                            <div className='p-3 rounded-lg mt-6'>
                                <div className="rounded-t-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                                    background: `rgb(${100 - (i * 20)},150,${250 - (i * 10)})`,
                                }}>
                                    <div className='text-2xl'>{proper(type || 'OTHER')}</div>
                                    <div className='text-2xl'>{docs.filter((doc) => doc.data.vehicle.v_source === type).length} Total Sales</div>
                                </div>
                                <Stats docs={docs.filter((doc) => doc.data.vehicle.v_source === type)} />
                                
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}
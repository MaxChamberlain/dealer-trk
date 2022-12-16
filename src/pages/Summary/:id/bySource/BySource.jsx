import { useLocation } from 'react-router-dom';
import { getDocumentsByCompanyId, getCompanyDetails } from '../../../../utils/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { proper, properNumber } from '../../../../utils/textDisplay';
import Stats from './Stats';
import { Button, ButtonGroup, Tabs, Tab } from '@mui/material';

export default function BySource(){
    const [ docs, setDocs ] = useState(null);
    const [ company, setCompany ] = useState(null);
    const [ sources, setSources ] = useState([]);
    const [ availSources, setAvailSources ] = useState([]);
    const [ page, setPage ] = useState('All');

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
        <div className='p-6 pt-16'>
            <Tabs 
                value={page}
                onChange={(e, v) => setPage(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                className='bg-white mb-6 absolute top-12 left-0 right-0'
            >
                <Tab label="All (Total)" value='All' />
                {availSources.map((type, i) => {
                    if(type === undefined) type = 'Other'
                    return(
                        <Tab key={i} label={proper(type)} value={type} />
                    )
                })}
            </Tabs>
            <motion.div className={`${page === 'All' ? 'rounded-t-lg' : 'rounded-lg'} p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between flex-col items-center bg-[#1976D2]`}
                    initial={{ width: '0%', x: -100 }}
                    animate={{ width: '100%', x: 0 }}
                    exit={{ width: '0%', x: -100 }}
                >
                    <span>Summary By Source {company ? 'for ' + proper(company?.company_name || 'No Company Name') : ''}</span>
                    <span>{start === end ? new Date(start).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : new Date(start).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + new Date(end).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </motion.div>
                {page === 'All' && <div className='w-full bg-white p-4 shadow-md rounded-b-lg'>
                    <div className='w-full font-bold text-xl p-2 text-center'>
                        Add To / Remove From Total
                    </div>
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
                </div>}
                    <div>
                            {page === 'All' ? <div className='p-3 mt-6'>
                                <div className="rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                                    background: '#4992DB',
                                }}>
                                    <div className='text-2xl'>TOTAL - ALL SOURCES</div>
                                    <div className='text-2xl'>{
                                        sources.length > 0 ? docs.filter(e => e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')).length : docs?.length
                                    } Total Sales</div>
                                </div>
                                <Stats docs={sources.length > 0 ? docs.filter(e => e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')) : docs} />
                            </div>
                            :
                            <div className='rounded-lg mt-6'>
                                <div className="rounded-t-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between" style={{
                                    background: '#4992DB',
                                }}>
                                    <div className='text-2xl'>{page}</div>
                                    <div className='text-2xl'>{docs.filter((doc) => doc.data.vehicle.v_source === page).length} Total Sales <span className='text-[#eee]'>({Math.floor((docs.filter((doc) => doc.data.vehicle.v_source === page).length / docs.length) * 100)}% of total)</span></div>
                                </div>
                                <Stats docs={docs.filter((doc) => doc.data.vehicle.v_source === page)} />
                            </div>
                            }
                </div>
        </div>
    )
}
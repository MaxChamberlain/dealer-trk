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

    const URLParams = new URLSearchParams(useLocation().search);
    const start = URLParams.get('start');
    const end = URLParams.get('end');
    const companyId = window.location.pathname.split('/')[2];

    useEffect(() => {
        getDocumentsByCompanyId(() => {}, () => {}, companyId, start, end).then((res) => {
            setDocs(res);
            setAvailSources([...new Set(res.map(doc => doc.data.vehicle.v_source))])
        })
        getCompanyDetails(() => {}, () => {}).then((res) => {
            setCompany(res.find((company) => company.company_id === companyId))
        })
    }, [])

    useEffect(() => {
        setSources(availSources)
    }, [availSources])
    console.log(sources)

    return(<>
        <div className={`flex justify-between text-2xl text-black bg-white py-4 px-6 drop-shadow`}>
            <div className='font-bold flex items-center'>{proper(company?.company_name || 'No Company Name')}</div>
            <br/>
            <div className='flex flex-col items-end text-xl'> 
                <span className='text-[#444]'>Summary By Source</span>
                <span className='text-[#444]'>{start === end ? new Date(start).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : new Date(start).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + ' - ' + new Date(end).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
        </div>
        <div className='p-6'>
            <div className='w-full bg-white p-4 drop-shadow rounded-lg'>
                <div className='w-full font-bold text-xl p-2 text-center'>
                    Add To / Remove From Total
                </div>
                <div className='w-full text-xl p-2 text-center'>
                    <Button
                        onClick={() => setSources(availSources)}
                    >
                        Select All
                    </Button>
                    /
                    <Button
                        onClick={() => setSources([])}
                    >
                        Deselect All
                    </Button>
                </div>
                <ButtonGroup fullWidth>
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
                <div className='mt-6'>
                    <div className="rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden flex justify-between drop-shadow" style={{
                        background: '#4992DB',
                    }}>
                        <div className='text-2xl'>TOTAL {availSources.every(e => sources.includes(e)) ? '- ALL SOURCES' : ''}</div>
                        <div className='text-2xl'>{
                            (sources.length > 0 ? docs.filter(e => (e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')) && !e.rollback).length : docs?.filter(e => !e.rollback)?.length) -
                            (sources.length > 0 ? docs.filter(e => (e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')) && e.rollback).length : docs?.filter(e => e.rollback)?.length)
                        } Total Sales</div>
                    </div>
                    <Stats company={company} dateRange={{startDate: start, endDate: end}} docs={sources.length > 0 ? docs.filter(e => e.data.vehicle.v_source ? sources.includes(e.data.vehicle.v_source) : sources.includes('Other')) : docs} />
                </div>
            </div>
        </div>
    </>
    )
}
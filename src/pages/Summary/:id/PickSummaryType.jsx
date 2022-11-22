import { getCompanyDetails, getDocumentsByCompanyId } from '../../../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { proper } from '../../../utils/textDisplay';
import overview from '../../../assets/overview.png';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Box, TextField } from '@mui/material';
import { motion } from 'framer-motion';

export default function PickSummaryType(){
    const [ company, setCompany ] = useState(null);
    const [ found, setFound ] = useState(true);
    const [ date, setDate ] = useState({
        start: new Date(),
        end: new Date()
    });

    useEffect(() => {
        const companyId = window.location.pathname.split('/')[2];
        getCompanyDetails(() => {}, () => {}).then((res) => {
            const comp = res.find((company) => company.company_id === companyId)
            if(!comp){
                setFound(false);
            }else{
                setCompany(res.find((company) => company.company_id === companyId))
            }
        })
    }, [])


    const navigate = useNavigate();
    const location = useLocation();

    const handleDateChange = (newDate, partition) => {
        setDate(was => {
            return {
                ...was,
                [partition]: newDate
            }
        });
    }

    return(
        <div className="p-6">
            {found ? <>
                <motion.div className="rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden" style={{
                    background: 'linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
                }}
                    initial={{ width: '0%', x: -100 }}
                    animate={{ width: '100%', x: 0 }}
                    exit={{ width: '0%', x: -100 }}
                >
                    View Your Summary {company ? 'for ' + proper(company?.company_name || 'No Company Name') : ''}
                </motion.div>

                <div className='w-full flex justify-end mt-6 align-center z=[9999]' id='filter-bar-docs'>
                    <div className='w-fit bg-white justify-start p-4 rounded drop-shadow flex items-center'>
                        <Box sx={{ width: 350 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    label="Start Date"
                                    maxDate={date.end}
                                    value={date.start}
                                    onChange={(newValue) => handleDateChange(newValue, 'start')}
                                    renderInput={(params) => <TextField {...params} style={{
                                        width: '100%',
                                    }} />}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ width: 350 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    
                                    label="End Date"
                                    minDate={date.start}
                                    value={date.end}
                                    onChange={(newValue) => handleDateChange(newValue, 'end')}
                                    renderInput={(params) => <TextField {...params} style={{
                                        width: '100%',
                                    }} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </div>
                </div>

                <div className="mt-6 text-white text-4xl grid grid-cols-4">
                    <div className="w-full rounded-lg p-6 bg-[#ff8000] shadow-lg cursor-pointer hover:brightness-110"
                        onClick={() => navigate(location.pathname + '/overview?start=' + date.start.toLocaleDateString('en-US') + '&end=' + date.end.toLocaleDateString('en-US'))}
                    >
                        <div className='flex items-center justify-between'>
                            <span>Overview</span>
                            <img src={overview} alt="overview" className="w-16 h-16 invert" />
                        </div>
                        <span className='text-2xl'>
                            A brief overview of all documents and data for this company.
                        </span>
                    </div>
                </div>
            </> :
            <div className="w-full rounded-lg p-6 text-white text-4xl bg-red-700 text-center">
                No Company Found With ID "{window.location.pathname.split('/')[2]}""
            </div>
            }
        </div>
    )
}
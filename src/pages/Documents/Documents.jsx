import { Button, ButtonGroup, Tabs, Tab, Box, Backdrop, CircularProgress, LinearProgress, OutlinedInput, TextField, Autocomplete, Fab } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { getCompanyDetails, getDocumentTypes, getDocumentsByCompanyIds } from '../../utils/api';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DocumentItem from './components/DocumentItem';
import AddDocument from './components/AddDocument';
import './style.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { proper } from '../../utils/textDisplay';

export default function Documents(){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ tab, setTab ] = useState(0);
    const [ companyDetails, setCompanyDetails ] = useState(null);
    const [ documentTypes, setDocumentTypes ] = useState(null);
    const [ documents, setDocuments ] = useState(null);
    const [ filter, setFilter ] = useState('')
    const [ startDate, setStartDate ] = useState(//first day of this week
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
    );
    const [ endDate, setEndDate ] = useState(new Date().toLocaleString('en-US'));
    const [ createdBy, setCreatedBy ] = useState('Any');
    const [ search, setSearch ] = useState('');
    const [ addDocument, setAddDocument ] = useState(false);
    console.log(companyDetails)

    useEffect(() => {
        getCompanyDetails(setLoading, setError).then((res) => {
            setCompanyDetails(res);
            getDocumentsByCompanyIds(setLoading, setError).then((e) => {
                console.log(e)
                setDocuments(e);
            })
        })
        getDocumentTypes(setLoading, setError).then((res) => {
            setDocumentTypes(res);
        })
        window.addEventListener('resize', () => {
            document.getElementById('document-container-scrollable').style.height = `calc(100vh - ${document.getElementById('filter-bar-docs').offsetTop + document.getElementById('filter-bar-docs').offsetHeight}px)`
        })
    }, [])

    return(
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.1 }}
        >
            <Backdrop open={loading} style={{ zIndex: 9999, backgroundColor: 'transparent' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ width: '100%', bgcolor: '#fff' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={(e, x) => setTab(x)} aria-label="basic tabs example">
                    {loading ? <Box sx={{width: '96%', height: '100%', paddingTop: 2.8, paddingLeft: '2%'}}><LinearProgress /></Box> : 
                        documentTypes && [ { document_type_name: 'All Documents' }, ...documentTypes].map((x, i) => {
                            return <Tab label={x.document_type_name} />
                        })
                    }
                    </Tabs>
                </Box>
            </Box>
            <ButtonGroup fullWidth={true} style={{
                margin: '16px 0',
                padding: '0 16px',
                backgroundColor: '#fff',
            }}>
                {loading && <Box sx={{width: '100%', height: '100%', paddingTop: 1.2}}><LinearProgress /></Box>}
                <Button
                    variant={filter === '' ? 'contained' : 'outlined'}
                    onClick={() => setFilter('')}
                >All</Button>
                {companyDetails && companyDetails.map((company) => {
                    return(
                        <Button 
                            key={company.company_id}
                            variant={filter === company.company_name ? 'contained' : 'outlined'}
                            onClick={() => setFilter(company.company_name)}
                        >
                            {company.company_name}
                        </Button>
                    )
                })}
            </ButtonGroup>
            <div className='w-full p-6 flex align-center z=[9999]' id='filter-bar-docs'>
                <div className='w-full bg-white justify-start p-4 rounded drop-shadow flex items-center'>
                    <div className='flex w-1/2'>
                        <OutlinedInput 
                            fullWidth={true}
                            placeholder='Search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                        />
                        <div className='w-fit px-4 border-r border-b border-t rounded-tr rounded-br h-full' style={{
                            borderColor: '#bbb'
                        }}>
                            <SearchIcon 
                                style={{
                                    color: 'rgba(0,0,0,0.6)',
                                    margin: '15px auto',
                                }}
                            />
                        </div>
                    </div>
                    <Box sx={{ width: '200px', margin: '0 10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                
                                label="Start Date"
                                maxDate={endDate}
                                value={startDate}
                                onChange={(newValue) => {
                                setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ width: '200px', marginRight: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                
                                label="End Date"
                                minDate={startDate}
                                value={endDate}
                                onChange={(newValue) => {
                                setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Autocomplete
                        fullWidth={true}
                        id="combo-box-demo"
                        options={documents ? ['Any', ...new Set(documents.map((x) => 
                                `${proper(x.user_fname)} ${proper(x.user_lname)}`
                        ))] : []}
                        sx={{ width: 300, zIndex: 9999 }}
                        renderInput={(params) => <TextField style={{zIndex: 9999}} {...params} label="Created By" />}
                        onChange={(e, x) => setCreatedBy(x)}
                        defaultValue='Any'
                        disableClearable={true}
                    />
                    <Button
                        color="primary"
                        aria-label="add"
                        variant='contained' style={{
                            marginLeft: '10px',
                            width: '10%',
                            height: '100%',
                        }}
                        onClick={() => setAddDocument(was => !was)}
                    >
                        <AddIcon /> Add Document
                    </Button>
                </div>
            </div>
            <div id='document-container-scrollable' className='p-6 overflow-scroll z-[9990]' style={{ top: 302 }}>
                {addDocument && <AddDocument companyDetails={companyDetails} />}
                {documents && documents
                    .filter(e => filter === '' ? e : e.company_name.toLowerCase() === filter.toLowerCase())
                    .filter(e => search === '' ? e : `${e.v_make}${e.v_model}${e.v_vin_no}${e.company_name}`.toLowerCase().includes(search.toLowerCase().replace(/\s/g , '')))
                    .filter(e => new Date(e.date_created) >= new Date(startDate).setHours(0,0,0,0) && new Date(e.date_created) <= new Date(endDate).setHours(23,59,59,999))
                    .filter(e => createdBy === 'Any' ? e : e.created_by_user_id === createdBy)
                    .map((x, i) => {
                    return <DocumentItem
                        key={i}
                        doc={x}
                    />
                })}
            </div>
        </motion.div>
    )
}
import { Button, ButtonGroup, Tabs, Tab, Box, Backdrop, CircularProgress, LinearProgress, OutlinedInput, TextField, Autocomplete, TableBody, Select, MenuItem, Table, TableHead, TableRow, TableCell, Card } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

export default function Documents(){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ tab, setTab ] = useState(0);
    const [ companyDetails, setCompanyDetails ] = useState(null);
    const [ documentTypes, setDocumentTypes ] = useState(null);
    const [ documents, setDocuments ] = useState(null);
    const [ filter, setFilter ] = useState('All Companies')
    const [ createdBy, setCreatedBy ] = useState('Any');
    const [ search, setSearch ] = useState('');
    const [ addDocument, setAddDocument ] = useState(false);
    const [ open, setOpen ] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);
    const startDate = urlParams.get('startDate');
    const endDate = urlParams.get('endDate');

    const navigate = useNavigate();

    useEffect(() => {
      //get url params
      if(!startDate || !endDate){
        urlParams.set('startDate', new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toISOString().split('T')[0]);
        urlParams.set('endDate', new Date(new Date(new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
        navigate(`?${urlParams.toString()}`, { replace: true });
      }
      //if endDate is before startDate, set endDate to startDate
      if(new Date(startDate) > new Date(endDate)){
        urlParams.set('endDate', startDate);
        navigate(`?${urlParams.toString()}`, { replace: true });
      }
    }, [])

    const handleDateChange = (date, type) => {
        if(type === 'start'){
            urlParams.set('startDate', new Date(date).toISOString().split('T')[0]);
        }else{
            urlParams.set('endDate', new Date(date).toISOString().split('T')[0]);
        }
        window.location.search = urlParams.toString();
    }

    useEffect(() => {
        const init = async () => {
            setTimeout(() => {
                getCompanyDetails(setLoading, setError).then((res) => {
                    setCompanyDetails(res);
                    getDocumentsByCompanyIds(setLoading, setError, urlParams.get('startDate'), urlParams.get('endDate')).then((e) => {
                        setDocuments(e);
                    })
                })
            }, 100)
        }
        init()
        getDocumentsByCompanyIds(setLoading, setError, startDate, endDate).then((e) => {
            setDocuments(e);
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
            <Box sx={{ width: '100%', bgcolor: '#fff'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                    <Tabs value={tab} onChange={(e, x) => setTab(x)} aria-label="basic tabs example">
                    {loading ? <Box sx={{width: '96%', height: '100%', paddingTop: 2.8, paddingLeft: '2%'}}><LinearProgress /></Box> : 
                        documentTypes && [ { document_type_name: 'All Documents' }, ...documentTypes].map((x, i) => {
                            return <Tab label={x.document_type_name} />
                        })
                    }
                    </Tabs>
                    <Select style={{
                        margin: '5px',
                        backgroundColor: '#fff',
                        width: '50%',
                        height: 40
                    }} value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                        {loading && <Box sx={{width: '100%', height: '100%', paddingTop: 1.2}}><LinearProgress /></Box>}
                        <MenuItem
                            value='All Companies'
                        >All Companies</MenuItem>
                        {companyDetails && companyDetails.map((company) => {
                            return(
                                <MenuItem 
                                    key={company.company_id}
                                    value={company.company_id}
                                >
                                    {company.company_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </Box>
            </Box>
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
                                value={new Date(startDate)}
                                onChange={(newValue) => handleDateChange(newValue, 'start')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ width: '200px', marginRight: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                
                                label="End Date"
                                minDate={startDate}
                                value={new Date(endDate)}
                                onChange={(newValue) => handleDateChange(newValue, 'end')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Autocomplete
                        fullWidth={true}
                        id="combo-box-demo"
                        options={documents ? ['Any', ...new Set(documents.users.map((x) => 
                                x.user_id
                        ))] : []}
                        sx={{ width: 300, zIndex: 9999 }}
                        renderInput={(params) => <TextField style={{zIndex: 9999}} {...params} label="Created By" />}
                        onChange={(e, x) => setCreatedBy(x)}
                        defaultValue='Any'
                        disableClearable={true}
                        getOptionLabel={(x) => {
                            let item = documents?.users?.find(e => e.user_id === x)
                            return `${proper(item?.user_fname || x)} ${proper(item?.user_lname || '')}`
                        }}
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
            <div id='document-container-scrollable' className='py-6 overflow-scroll z-[9990]' style={{ top: 302 }}>
                {addDocument && <AddDocument setDocuments={setDocuments} companyDetails={companyDetails} setAdding={setAddDocument} docs={documents?.data} />}
                <div className='w-full p-2 bg-white'>
                    <Button
                        color="primary"
                        aria-label="add"
                        variant='contained'
                        onClick={() => setOpen(was => documents && (documents.data.map(e => e.document_id).every(e => was.includes(e)) ? [] : documents.data.map(e => e.document_id)))}
                    >
                        {documents && (documents.data.map(e => e.document_id).every(e => open.includes(e)) ? documents.data.map(e => e.document_id) && 'Close All' : 'Open All')}
                    </Button>
                </div>
                <Table className='shadow-lg' size='small' padding='small'>
                    <TableHead className='bg-stone-200'>
                        <TableRow>
                            <TableCell>
                                Stock No.
                            </TableCell>
                            <TableCell>
                                Vehicle
                            </TableCell>
                            <TableCell>
                                VIN No.
                            </TableCell>
                            <TableCell>
                                Margin
                            </TableCell>
                            <TableCell>
                                Days In Stock
                            </TableCell>
                            <TableCell> 
                                Source
                            </TableCell>
                            <TableCell>
                                <div>
                                    Initial MMR
                                </div>
                                <div className='w-full h-px bg-stone-500'></div>
                                <div>
                                    Initial CarGurus
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    Final MMR
                                </div>
                                <div className='w-full h-px bg-stone-500'></div>
                                <div>
                                    Final CarGurus
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    MMR Diff
                                </div>
                                <div className='w-full h-px bg-stone-500'></div>
                                <div>
                                    CarGurus Diff
                                </div>
                            </TableCell>
                            <TableCell>
                                Certified? 
                            </TableCell>
                            <TableCell>
                                Start Price
                            </TableCell>
                            <TableCell>
                                Sell Price
                            </TableCell>
                            <TableCell>
                                Market %
                            </TableCell>
                            <TableCell>
                                Trade
                            </TableCell>
                            <TableCell>
                                Notes
                            </TableCell>
                            <TableCell>
                                Store
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents && documents.data && documents.data
                            .filter(e => filter === 'All Companies' ? e : e.company_id === filter)
                            .filter(e => search === '' ? e : `${e.data.vehicle.v_make}${e.data.vehicle.v_model}${e.data.vehicle.v_vin_no}${e.data.vehicle.company_name}`.toLowerCase().includes(search.toLowerCase().replace(/\s/g , '')))
                            .filter(e => createdBy === 'Any' ? e : e.metadata.created_by_user_id === createdBy)
                            .sort((a, b) => {
                                if (a.metadata.created_at < b.metadata.created_at) {
                                    return 1;
                                }
                                if (a.metadata.created_at > b.metadata.created_at) {
                                    return -1;
                                }
                                return 0;
                            })
                            .map((x, i) => {
                            return <DocumentItem
                                    open={open}
                                    setOpen={setOpen}
                                    index={i}
                                    key={x.document_id}
                                    doc={x.data}
                                    doc_id={x.document_id}
                                    docNotes={x.notes}
                                    company={companyDetails ? companyDetails.find(e => e.company_id === x.company_id).company_name : {}}
                                    docDates={x.metadata}
                                />
                        })}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    )
}
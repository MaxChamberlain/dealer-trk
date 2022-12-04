import { Button, Backdrop, CircularProgress, TableBody, Table } from '@mui/material';
import TableHeaders from './components/TableHeaders';
import MainSelect from './components/MainSelect';
import FiltersAndAdd from './components/FiltersAndAdd';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import DocumentItem from './components/DocumentItem/DocumentItem';
import AddDocument from './components/AddDocument/AddDocument';
import './style.css'
import { useNavDates } from './hooks/useNavDates'
import { useDocs } from './hooks/useDocs'

export default function Documents(){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ tab, setTab ] = useState(0);
    const [ filter, setFilter ] = useState('All Companies')
    const [ createdBy, setCreatedBy ] = useState('Any');
    const [ search, setSearch ] = useState('');
    const [ addDocument, setAddDocument ] = useState(false);
    const [ open, setOpen ] = useState([]);
    const [ selComp, setSelComp ] = useState(null);
    const [ onlyCert, setOnlyCert ] = useState(0);

    const [ sourceFilter, setSourceFilter ] = useState('Any');

    const [ startDate, endDate ] = useNavDates()
    const [companyDetails, documentTypes, documents, setDocuments] = useDocs(startDate, endDate, setLoading, setError)

    useEffect(() => {
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
            <MainSelect setSelComp={setSelComp} filter={filter} setFilter={setFilter} tab={tab} setTab={setTab} companyDetails={companyDetails} loading={loading} documentTypes={documentTypes} />
            <FiltersAndAdd setSourceFilter={setSourceFilter} companyDetails={companyDetails} onlyCert={onlyCert} setOnlyCert={setOnlyCert} search={search} setSearch={setSearch} documents={documents} setAddDocument={setAddDocument} setCreatedBy={setCreatedBy} />

            <div id='document-container-scrollable' className='py-6 overflow-scroll z-[9990]' style={{ top: 302 }}>

                {addDocument && <AddDocument selComp={selComp} setDocuments={setDocuments} companyDetails={companyDetails} setAdding={setAddDocument} docs={documents?.data} />}

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
                    <TableHeaders />
                    <TableBody>
                        {documents && documents.data && documents.data
                            .filter(e => filter === 'All Companies' ? e : e.company_id === filter)
                            .filter(e => search === '' ? e : `${e.data.vehicle.v_make}${e.data.vehicle.v_model}${e.data.vehicle.v_vin_no}${e.data.vehicle.company_name}`.toLowerCase().includes(search.toLowerCase().replace(/\s/g , '')))
                            .filter(e => createdBy === 'Any' ? e : e.metadata.created_by_user_id === createdBy)
                            .filter(e => onlyCert % 3 === 0 ? e : onlyCert % 3 === 1 ? e.data.vehicle.v_is_certified : !e.data.vehicle.v_is_certified)
                            .filter(e => sourceFilter === 'Any' ? e : (e?.data?.vehicle?.v_source?.toUpperCase() || '') === sourceFilter.toUpperCase())
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
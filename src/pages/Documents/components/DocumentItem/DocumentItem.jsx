import { useState } from 'react';
import MainTable from './MainTable';
import Metadata from './Metadata';
import Notes from './Notes';
import CarGurusChart from './CarGurusChart';
import { Snackbar, Alert } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

export default function DocumentItem({ doc, index, doc_id, docNotes, open, setOpen, docDates, setDocuments, rollback, userPermLevel }){
    const { user } = useContext(UserContext);
    const [ notes, setNotes ] = useState(docNotes);
    const [ hovering, setHovering ] = useState({
        notes: null,
        trade: null,
    });
    const [ editting, setEditting ] = useState(false);
    const [ changes, setChanges ] = useState({
        v_source: null,
    })
    const [ snackbar, setSnackbar ] = useState({
        open: false,
        message: '',
        severity: 'success',
    })

    return(
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({open: false, message: '', severity: 'success'})}
            >
                <Alert onClose={() => setSnackbar({open: false, message: '', severity: 'success'})} severity={snackbar.severity} sx={{ width: '100%', backgroundColor: '#62e327' }} >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <MainTable setChanges={setChanges} changes={changes} doc={doc} index={index} hovering={hovering} notes={notes} doc_id={doc_id} open={open} setOpen={setOpen} setHovering={setHovering} editting={editting} rollback={rollback} />
            {open.includes(doc_id) &&
            <>
                <Metadata userPermLevel={userPermLevel} index={index} docDates={docDates} editting={editting} setEditting={setEditting} docId={doc_id} changes={changes} setChanges={setChanges} setSnackbar={setSnackbar} setDocuments={setDocuments} />
                <Notes userPermLevel={userPermLevel} notes={notes} setNotes={setNotes} doc_id={doc_id} />
                <CarGurusChart index={index} doc={doc} />
            </>
            }
        </>
    )
}
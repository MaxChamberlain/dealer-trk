import { useState } from 'react';
import MainTable from './MainTable';
import Metadata from './Metadata';
import Notes from './Notes';
import CarGurusChart from './CarGurusChart';

export default function DocumentItem({ doc, index, doc_id, docNotes, setMousePos, open, setOpen, docDates }){
    const [ notes, setNotes ] = useState(docNotes);
    const [ hovering, setHovering ] = useState({
        notes: null,
        trade: null,
    });
    const [ editting, setEditting ] = useState(false);
    const [ changes, setChanges ] = useState({
        v_source: null,
    })

    return(
        <>
            <MainTable setChanges={setChanges} doc={doc} index={index} hovering={hovering} notes={notes} doc_id={doc_id} open={open} setOpen={setOpen} setHovering={setHovering} editting={editting} />
            {open.includes(doc_id) &&
            <>
                <Metadata index={index} docDates={docDates} editting={editting} setEditting={setEditting} docId={doc_id} changes={changes} />
                <Notes notes={notes} setNotes={setNotes} doc_id={doc_id} />
                <CarGurusChart index={index} doc={doc} />
            </>
            }
        </>
    )
}
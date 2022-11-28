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

    return(
        <>
            <MainTable doc={doc} index={index} hovering={hovering} notes={notes} doc_id={doc_id} open={open} setOpen={setOpen} setHovering={setHovering} />
            {open.includes(doc_id) &&
            <>
                <Metadata index={index} docDates={docDates} />
                <Notes notes={notes} setNotes={setNotes} doc_id={doc_id} />
                <CarGurusChart index={index} doc={doc} />
            </>
            }
        </>
    )
}
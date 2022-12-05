import { TableRow, TableCell, Button } from '@mui/material';
import { changeSource } from '../../../../utils/api';

export default function Metadata({ index, docDates, setEditting, editting, docId, changes }){
    return(
        <TableRow className={`
            ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'} h-16`}
        >
            <TableCell></TableCell>
            <TableCell colSpan={1}>
                Created {docDates.created_at ? new Date(docDates.created_at).toLocaleDateString() : 'N/A'} <br /> {docDates.created_at ? new Date(docDates.created_at).toLocaleTimeString() : 'N/A'}
            </TableCell>
            <TableCell colSpan={1}>
                Updated {docDates.updated_at ? new Date(docDates.updated_at).toLocaleDateString() : 'N/A'} <br /> {docDates.updated_at ? new Date(docDates.updated_at).toLocaleTimeString() : 'N/A'}
            </TableCell>
            <TableCell colSpan={11}>

            </TableCell>
            <TableCell colSpan={2}>
                <Button
                    variant={editting === docId ? 'contained' : "outlined"}
                    size="small"
                    fullWidth
                    onClick={editting !== docId ? 
                        () => setEditting(docId)
                    :
                        () => {changeSource(docId, changes); setEditting(null)}
                    }
                    style={{
                        color: editting === docId ? 'white' : 'black',
                        borderColor: 'black',
                    }}
                >
                    {editting === docId ? 'Save' : "Edit"}
                </Button>
            </TableCell>
        </TableRow>
    )
}
import { TableRow, TableCell, Button } from '@mui/material';
import { changeSource, deleteDoc } from '../../../../utils/api';

export default function Metadata({ index, docDates, setEditting, editting, docId, changes, setChanges, setSnackbar, setDocuments}){
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
            <TableCell colSpan={editting === docId ? 7 : 11}>

            </TableCell>
            {editting === docId &&
                <TableCell colSpan={2}>
                    <Button
                        variant={"outlined"}
                        size="small"
                        fullWidth
                        onClick={() => { 
                            deleteDoc(docId, setSnackbar, setDocuments)
                        }}
                        style={{
                            color: 'red',
                            borderColor: 'red',
                        }}
                    >
                        Delete
                    </Button>
                </TableCell>
            }
            {editting === docId &&
                <TableCell colSpan={2}>
                    <Button
                        variant={"outlined"}
                        size="small"
                        fullWidth
                        onClick={() => { 
                            setEditting(null)
                            setChanges({v_source: null})
                        }}
                        style={{
                            color: 'black',
                            borderColor: 'black',
                        }}
                    >
                        Cancel
                    </Button>
                </TableCell>
            }
            <TableCell colSpan={2}>
                <Button
                    variant={editting === docId ? 'contained' : "outlined"}
                    size="small"
                    fullWidth
                    onClick={editting !== docId ? 
                        () => setEditting(docId)
                    :
                        () => {changeSource(docId, changes, setSnackbar, setDocuments); setEditting(null)}
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
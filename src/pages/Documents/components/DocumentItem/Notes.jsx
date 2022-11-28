import { addDocumentNotes } from '../../../../utils/api';
import { TableRow, TableCell, Button, TextField } from '@mui/material';

export default function Notes({ index, setNotes, notes, doc_id }){
    return(
        <TableRow className={`
            ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}
        >
            <TableCell></TableCell>
            <TableCell colSpan={13}>
                 <TextField
                    label='Notes'
                    variant='outlined'
                    fullWidth
                    defaultValue={notes}
                    onChange={e => setNotes(e.target.value)}
                />
            </TableCell>
            <TableCell colSpan={2}>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    style={{
                        height: '3rem',
                        width: '100%'
                    }}
                    onClick={() => addDocumentNotes(doc_id, notes)}
                >
                    Submit Notes
                </Button>
            </TableCell>
        </TableRow>        
    )
}
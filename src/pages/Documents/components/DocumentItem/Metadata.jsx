import { TableRow, TableCell } from '@mui/material';

export default function Metadata({ index, docDates }){
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
            <TableCell colSpan={14}>

            </TableCell>
        </TableRow>
    )
}
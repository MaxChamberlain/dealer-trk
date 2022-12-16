import { TableHead, TableRow, TableCell } from '@mui/material';

export default function TableHeaders(){
    return(
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
                        Exit CarGurus
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
                    IMV 
                </TableCell>
                <TableCell>
                    MSRP 
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
                    Details
                </TableCell>
            </TableRow>
        </TableHead>
    )
}
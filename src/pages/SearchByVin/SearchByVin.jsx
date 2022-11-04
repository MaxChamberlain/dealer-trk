import { FormControl, Button, InputLabel, OutlinedInput, CircularProgress } from '@mui/material';
import { searchGurusByVin } from '../../utils/search';
import { useState } from 'react';
import VehicleDetails from './components/VehicleDetails';

export default function SearchByVin(){
    const [vin, setVin] = useState('');
    const [zip, setZip] = useState('');
    const [price, setPrice] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ data, setData ] = useState(null);

    return(
        <div className='p-2'>
            <div className='bg-white rounded p-3 flex justify-around gap-x-2 shadow'>
                <FormControl fullWidth>
                    <InputLabel htmlFor="vin">VIN</InputLabel>
                    <OutlinedInput 
                        id="vin"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="zip">ZIP</InputLabel>
                    <OutlinedInput
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </FormControl>
                <FormControl style={{ width: '50%' }}>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <OutlinedInput
                        id="price"
                        value={price}
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormControl>
                <Button
                    sx={{width: '50%'}}
                    variant={(vin.length === 17 && zip.length === 5) ? 'contained' : 'outlined'}
                    onClick={() => {
                        (vin.length === 17 && zip.length === 5 && price) && searchGurusByVin(vin, zip, price, setLoading, setError, setData)
                    }}
                >
                    Search
                </Button>
            </div>
            <div className='bg-white p-4 rounded shadow mt-4'>
                {error &&
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                }
                {loading ?
                    <div className='w-full flex justify-center items-center'>
                        <CircularProgress />
                    </div>
                    :
                    data && <VehicleDetails data={data} />
                }
            </div>
        </div>
    )
}
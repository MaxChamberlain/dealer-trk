import { OutlinedInput, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, TextField, CircularProgress } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'

export default function Step1({ newVehicle, setNewVehicle, autoCompleteOptions, loading }){

    const years = []
    for(let i = new Date().getFullYear() + 2; i >= new Date().getFullYear() - 10; i--){
        years.push(i)
    }

    return(
    <div className='my-4 grid grid-cols-4 justify-center w-full'>
        <div className='p-2 w-full'>
            <InputLabel htmlFor="stock-no">Stock No.</InputLabel>
            <OutlinedInput
                id="stock-no"
                value={newVehicle.v_stock_no}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_stock_no: e.target.value })}
                fullWidth
            />
        </div>
        <div className='p-2 w-full'>
            <InputLabel htmlFor="Make">Vehicle</InputLabel>
            {loading ? 
                <div className='border border-stone-400 rounded p-1'>
                    <CircularProgress />
                </div>
            :
            <>
                <OutlinedInput
                    id="Vehicle"
                    value={newVehicle.v_vehicle}
                    onChange={(e) => setNewVehicle({ ...newVehicle, v_vehicle: e.target.value })}
                    fullWidth
                />
                <FormHelperText>Make sure to format the year like: 2022</FormHelperText>
                <FormHelperText>Make sure to include at least year and make</FormHelperText>
            </>
            }
        </div>
        <div className='p-2 w-full'>
            <InputLabel htmlFor="VIN">VIN No.</InputLabel>
            <OutlinedInput
                id="VIN"
                value={newVehicle.v_vin_no}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_vin_no: e.target.value })}
                fullWidth
            />
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="Certified">Certified?</InputLabel>
            <Checkbox
                id="Certified"
                checked={newVehicle.v_is_certified}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_is_certified: e.target.checked })}
            />
        </div>
    </div>
    )
}
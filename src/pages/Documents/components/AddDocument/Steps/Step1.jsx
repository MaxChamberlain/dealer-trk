import { OutlinedInput, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, TextField, CircularProgress } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'

export default function Step1({ newVehicle, setNewVehicle, autoCompleteOptions, loading }){

    const years = []
    for(let i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--){
        years.push(i)
    }

    return(
    <div className='my-4 grid grid-cols-7 justify-center w-full'>
        <div className='p-2 w-fit'>
            <InputLabel htmlFor="stock-no">Stock No.</InputLabel>
            <OutlinedInput
                id="stock-no"
                value={newVehicle.v_stock_no}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_stock_no: e.target.value })}
            />
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="Year">Vehicle Year</InputLabel>
            <Select
                fullWidth
                id="Year"
                value={newVehicle.v_year || new Date().getFullYear()}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_year: e.target.value })}
            >
                {years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
            </Select>
            <FormHelperText>e.g. 2020</FormHelperText>
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="Make">Vehicle Make</InputLabel>
            {loading ? 
                <div className='border border-stone-400 rounded p-1'>
                    <CircularProgress />
                </div>
            :
            <Autocomplete
                fullWidth
                disabled={loading}
                id="Make"
                options={autoCompleteOptions.makes}
                defaultValue={newVehicle.v_make}
                value={newVehicle.v_make}
                onChange={(e, newValue) => setNewVehicle({ ...newVehicle, v_make: newValue })}
                renderInput={(params) => <TextField {...params} label="Make" variant="outlined" onChange={(e, newValue) => setNewVehicle({ ...newVehicle, v_make: newValue })} />}
                freeSolo
                autoSelect
            />}
            <FormHelperText>e.g. Toyota</FormHelperText>
        </div>
        <div className='p-2'>   
            <InputLabel htmlFor="Model">Vehicle Model</InputLabel>
            {loading ? 
                <div className='border border-stone-400 rounded p-1'>
                    <CircularProgress />
                </div>
            :
            <Autocomplete
                fullWidth
                disabled={loading}
                id="Model"
                options={autoCompleteOptions.models}
                defaultValue={newVehicle.v_model}
                value={newVehicle.v_model}
                onChange={(e, newValue) => setNewVehicle({ ...newVehicle, v_model: newValue })}
                renderInput={(params) => <TextField {...params} label="Model" variant="outlined" />}
                freeSolo
            />}
            <FormHelperText>e.g. Camry</FormHelperText>
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="pkg">Vehicle Package</InputLabel>
            {loading ? 
                <div className='border border-stone-400 rounded p-1'>
                    <CircularProgress />
                </div>
            :
            <Autocomplete
                fullWidth
                disabled={loading}
                id="pkg"
                options={autoCompleteOptions.packages}
                defaultValue={newVehicle.v_package}
                value={newVehicle.v_package}
                onChange={(e, newValue) => setNewVehicle({ ...newVehicle, v_package: newValue })}
                renderInput={(params) => <TextField {...params} label="Package" variant="outlined" />}
                freeSolo
            />}
            <FormHelperText>e.g. SE</FormHelperText>
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="VIN">VIN No.</InputLabel>
            <OutlinedInput
                id="VIN"
                value={newVehicle.v_vin_no}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_vin_no: e.target.value })}
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
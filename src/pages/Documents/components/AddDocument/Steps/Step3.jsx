import { OutlinedInput, InputLabel, Select, MenuItem, FormHelperText, Box, TextField } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Checkbox from '@mui/material/Checkbox'
import { proper } from "../../../../../utils/textDisplay"

export default function Step3({ step, newVehicle, setNewVehicle, company, setCompany, companyDetails, selComp }){
    const storedCompany = document.cookie.split(';').filter((e) => e.includes('selected_company'))[0].split('=')[1];
    
    return(
        <>
            <div className="my-4 grid grid-cols-6 justify-around">
                <div className='p-2'>
                    <InputLabel htmlFor="trade">Did You Take A Trade?</InputLabel>
                    <Checkbox
                        id="trade"
                        checked={newVehicle.v_is_trade}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_is_trade: e.target.checked })}
                    />
                </div>
                {newVehicle.v_is_trade && <>
                    <div className='p-2'>
                        <InputLabel htmlFor="trdyear">Trade Vehicle Year</InputLabel>
                        <OutlinedInput
                            id="trdyear"
                            value={newVehicle.v_trade_year}
                            disabled={!newVehicle.v_is_trade}
                            type='number'
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_year: e.target.value })}
                        />
                        <FormHelperText>e.g. 2014</FormHelperText>
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="trdmake">Trade Vehicle Make</InputLabel>   
                        <OutlinedInput
                            id="trdmake"    
                            value={newVehicle.v_trade_make}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_make: e.target.value })}
                            /> 
                        <FormHelperText>e.g. Honda</FormHelperText>
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="trdmodel">Trade Vehicle Model</InputLabel>
                        <OutlinedInput
                            id="trdmodel"
                            value={newVehicle.v_trade_model}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_model: e.target.value })}
                        />
                        <FormHelperText>e.g. Civic</FormHelperText>
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="trdmls">Trade Vehicle Miles</InputLabel>   
                        <OutlinedInput
                            id="trdmls"    
                            value={newVehicle.v_trade_miles}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_miles: e.target.value })}
                            startAdornment="MI"
                        /> 
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="strtacv">Trade Vehicle ACV</InputLabel>   
                        <OutlinedInput
                            id="strtacv"    
                            value={newVehicle.v_trade_acv}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_acv: e.target.value })}
                            startAdornment="$"
                        /> 
                    </div>
                </>}
            </div>
            <div className='p-2'>
                <InputLabel htmlFor="notes">Notes</InputLabel>
                <OutlinedInput
                    fullWidth
                    id="notes"
                    value={newVehicle.v_notes}
                    onChange={(e) => setNewVehicle({ ...newVehicle, v_notes: e.target.value })}
                />
            </div>
            <div className='flex justify-between'>
                <div className='p-2'>
                    <InputLabel htmlFor="cmpn" required>Created At Date</InputLabel>
                    <Box sx={{ width: '200px', marginRight: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                value={newVehicle.created_at}
                                onChange={(newValue) => setNewVehicle({ ...newVehicle, created_at: newValue })}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="cmpn" required>Which company is this for?</InputLabel>
                    <Select    
                        fullWidth
                        id="cmpn"
                        value={company}
                        type='number'
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        defaultValue={companyDetails.filter((e) => e.company_id === storedCompany)[0]}
                    >
                        {companyDetails.map((e, i) => {
                            return <MenuItem key={i} value={e}>{e.company_name?.toUpperCase() || ''}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>This is required!</FormHelperText>
                </div>
            </div>
        </>
    )
}
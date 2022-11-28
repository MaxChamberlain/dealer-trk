import { OutlinedInput, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'

export default function Step3({ step, newVehicle, setNewVehicle, company, setCompany, companyDetails }){
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
                        <InputLabel htmlFor="trdmls">Trade Vehicle Package</InputLabel>   
                        <OutlinedInput
                            id="trdmls"    
                            value={newVehicle.v_trade_pkg}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_pkg: e.target.value })}
                        /> 
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
                    <div className='p-2'>
                        <InputLabel htmlFor="strtacv">Trade Vehicle End ACV</InputLabel>   
                        <OutlinedInput
                            id="strtacv"    
                            value={newVehicle.v_trade_end_acv}
                            disabled={!newVehicle.v_is_trade}
                            style={{
                                backgroundColor: newVehicle.v_is_trade ? 'white' : '#e0e0e0'
                            }}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_trade_end_acv: e.target.value })}
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
            <div className='p-2'>
                <InputLabel htmlFor="cmpn" required>Which company is this for?</InputLabel>
                <Select    
                    fullWidth
                    id="cmpn"
                    value={company}
                    type='number'
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    placeholder="Select a company"
                >
                    {companyDetails.map((e, i) => {
                        return <MenuItem key={i} value={e}>{e.company_name}</MenuItem>
                    })}
                </Select>
                <FormHelperText>This is required!</FormHelperText>
            </div>
        </>
    )
}
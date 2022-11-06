import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import Steps from './Steps';
import { searchGurusByVin } from "../../../utils/search"
import { FormControl, OutlinedInput, InputLabel, Autocomplete, TextField, Button, Menu, CircularProgress } from "@mui/material"

export default function DocumentItem({ companyDetails, setAdding }){
    const [ newVehicle, setNewVehicle ] = useState({
        v_is_certified: false,
        v_is_trade: false,
    })
    const [ company, setCompany ] = useState('Select A Company');
    const [ activeStep, setActiveStep ] = useState(0);
    const [ hasScraped, setHasScraped ] = useState(false);
    const [ loading, setLoading ] = useState({
        cg_high: false
    })
    
    return(
        <div id='document-list-item' className={`z-[9990] w-full bg-white drop-shadow p-4 mb-4`}>
        <div className="flex justify-end items-center">
            <div className='text-base text-gray-600 flex flex-col items-end mb-4'>
                <i>Created (Calculated Field) </i>
                <i>Modified (Calculated Field) </i>
            </div>
        </div>
        <div className="w-full justify-center">
        {loading.cg_high ? <div className='w-full flex justify-center'><CircularProgress /></div> : hasScraped ? null :<>
            <div className='text-2xl font-bold text-center mb-4 text-stone-600'>Let's see what we can find online</div>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <Autocomplete 
                    id="zip"
                    options={companyDetails.filter(e => e.company_zip)}
                    getOptionLabel={(option) => `${option.company_zip} (${option.company_name})`}
                    style={{ width: '25rem' }}
                    renderInput={(params) => <TextField {...params} label="ZIP Code" variant="outlined" />}
                    freeSolo
                />
                {/* <OutlinedInput id='zip' placeholder='ZIP' style={{
                    width: '25rem',
                }} /> */}
                <OutlinedInput
                    id='VIN' 
                    value={newVehicle.v_vin_no} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, v_vin_no: e.target.value })}
                    placeholder='VIN'
                    style={{
                        width: '25rem',
                        minWidth: '20rem',
                    }}
                />
                <Button 
                    color="primary"
                    variant="contained"
                    style={{
                        width: '25rem',
                        marginBottom: '2rem',
                    }}
                    onClick={() => {
                        searchGurusByVin(
                            newVehicle.v_vin_no, 
                            document.getElementById('zip').value?.split(' ')[0]?.trim() || '',
                            0, 
                            (e) => setLoading(was => {return {...was, cg_high: e}}), 
                            () => {}, 
                            (e) => {setNewVehicle({ 
                                ...newVehicle, 
                                v_final_carg_h: e.highPrice.replace(/[^0-9.]/g, ''),
                                v_make: e.vehicle_name?.split(' ')[1],
                                v_model: e.vehicle_name?.split(' ')[2],
                                v_year: e.vehicle_name?.split(' ')[0],
                                v_package: e.vehicle_name?.split(' ')[3] || '',
                            }); 
                            setHasScraped(true)}
                        )
                    }}
                >
                    Go
                </Button>
            </div>
        </> }
        </div>
        <div>
            {hasScraped  &&
                <Steps setAdding={setAdding} activeStep={activeStep} setActiveStep={setActiveStep} newVehicle={newVehicle} setNewVehicle={setNewVehicle} companyDetails={companyDetails} company={company} setCompany={setCompany} />
            }
        </div>
        </div>
    )
}
import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import Steps from './Steps';
import { searchGurusByVin } from "../../../utils/search"
import { FormControl, OutlinedInput, InputLabel, Autocomplete, TextField, Button, Menu, CircularProgress, Snackbar } from "@mui/material"
import React, { useEffect } from 'react';

export default function DocumentItem({ companyDetails, setAdding, docs, setDocuments }){
    const [ newVehicle, setNewVehicle ] = useState({
        v_is_certified: false,
        v_is_trade: false,
    })
    const [ company, setCompany ] = useState('Select A Company');
    const [ activeStep, setActiveStep ] = useState(0);
    const [ hasScraped, setHasScraped ] = useState(false);
    const [error, setError] = useState('');
    const [ loading, setLoading ] = useState({
        cg_high: false
    })
    const [ autoCompleteOptions, setAutoCompleteOptions ] = useState({
        makes : [],
        models: [],
        packages: []
    });

    useEffect(() => {
        if(newVehicle.v_make){
            setAutoCompleteOptions({
                ...autoCompleteOptions,
                models: [...new Set(docs?.filter(e => e.v_make?.toUpperCase() === newVehicle.v_make).map(doc => doc.v_model ? doc.v_model.toUpperCase() : ''))]
            })
        }
        if(newVehicle.v_model){
            setAutoCompleteOptions({
                ...autoCompleteOptions,
                packages: [...new Set(docs?.filter(e => e.v_make?.toUpperCase() === newVehicle.v_make && e.v_model.toUpperCase() === newVehicle.v_model).map(doc => doc.v_package ? doc.v_package.toUpperCase() : ''))]
            })
        }
    }, [newVehicle, docs])

    return(
        <div id='document-list-item' className={`z-[9990] w-full bg-white drop-shadow p-4 mb-4`}>
        <div className="flex justify-end items-center">
            <div className='text-base text-gray-600 flex flex-col items-end mb-4'>
                <i>Created (Calculated Field) </i>
                <i>Modified (Calculated Field) </i>
            </div>
        </div>
        <Snackbar
            open={error.length > 0}
            autoHideDuration={6000}
            onClose={() => setError('')}
            message={error}
            action={
                <React.Fragment>
                    <Button color="primary" size="small" onClick={() => setError('')}>
                        Close
                    </Button>
                </React.Fragment>
            }
        />
        <div className="w-full justify-center">
        {loading.cg_high ? null: hasScraped ? null :<>
            <div className='text-2xl font-bold text-center mb-4 text-stone-600'>Let's see what we can find online</div>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <TextField
                    id='StockNo' 
                    value={newVehicle.v_stock_no} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, v_stock_no: e.target.value })}
                    placeholder='Stock Number'
                    style={{
                        width: '25rem',
                        minWidth: '20rem',
                    }}
                />
                <Autocomplete 
                    id="zip"
                    options={companyDetails?.filter(e => e.company_zip)}
                    getOptionLabel={(option) => `${option.company_zip} (${option.company_name})`}
                    style={{ width: '25rem' }}
                    renderInput={(params) => <TextField {...params} label="ZIP Code" variant="outlined" />}
                    freeSolo
                />
                <TextField
                    id='VIN' 
                    value={newVehicle.v_vin_no} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, v_vin_no: e.target.value })}
                    placeholder='VIN'
                    style={{
                        width: '25rem',
                        minWidth: '20rem',
                    }}
                    error={newVehicle.v_vin_no ? docs?.map(e => e.data.vehicle.v_vin_no).includes(newVehicle.v_vin_no) : false }
                    helperText={newVehicle.v_vin_no ? docs?.map(e => e.data.vehicle.v_vin_no).includes(newVehicle.v_vin_no) ? 'This VIN is already in your documents!!' : null : null}
                />
                <Button 
                    color="primary"
                    variant="contained"
                    style={{
                        width: '25rem',
                        marginBottom: '2rem',
                    }}
                    onClick={() => {
                        setHasScraped(true)
                        searchGurusByVin(
                            newVehicle.v_vin_no, 
                            document.getElementById('zip').value?.split(' ')[0]?.trim() || '',
                            0, 
                            (e) => setLoading(was => {return {...was, cg_high: e}}), 
                            (e) => {setError(e)}, 
                            (e) => {setNewVehicle(was => { console.log(e); return { 
                                ...was,
                                v_final_carg_h: e.highPrice?.replace(/[^0-9.]/g, '') || '',
                                v_imv: e.IMV?.replace(/[^0-9.]/g, '') || '',
                                v_make: e.vehicleDetails?.make?.toUpperCase() || '',
                                v_model: e.vehicleDetails?.model?.toUpperCase() || '',
                                v_year: e.vehicleDetails?.year || '',
                                v_package: e.vehicleDetails?.trim_level?.toUpperCase() || '',
                                v_final_carg_h_options: {
                                    greatPrice: e.greatPrice?.replace(/[^0-9.]/g, '') || '',
                                    goodPrice: e.goodPrice?.replace(/[^0-9.]/g, '') || '',
                                    fairPrice: e.fairPrice?.replace(/[^0-9.]/g, '') || '',
                                    highPrice: e.highPrice?.replace(/[^0-9.]/g, '') || '',
                                    overPrice: e.overPrice?.replace(/[^0-9.]/g, '') || '',
                                }
                            }}); }
                        )
                    }}
                >
                    Go
                </Button>
            </div>
        </> }
        </div>
        <div>
            {hasScraped &&
                <Steps setDocuments={setDocuments} setAdding={setAdding} activeStep={activeStep} setActiveStep={setActiveStep} newVehicle={newVehicle} setNewVehicle={setNewVehicle} companyDetails={companyDetails} company={company} setCompany={setCompany} autoCompleteOptions={autoCompleteOptions} loadingIn={loading.cg_high} />
            }
        </div>
        </div>
    )
}
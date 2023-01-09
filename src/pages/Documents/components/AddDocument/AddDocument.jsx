import { proper, properNumber } from '../../../../utils/textDisplay';
import { useState } from 'react';
import Steps from './Steps';
import { searchGurusByVin } from "../../../../utils/search"
import { FormControl, OutlinedInput, InputLabel, Autocomplete, TextField, Button, Menu, CircularProgress, Snackbar, ButtonGroup } from "@mui/material"
import React, { useEffect } from 'react';
import { searchForRollbackVehicle } from '../../../../utils/api';
import DocumentItem from '../DocumentItem/DocumentItem';
import { insertRollback } from '../../../../utils/api';

export default function AddDocument({ companyDetails, setAdding, docs, setDocuments, selComp }){
    const [ newVehicle, setNewVehicle ] = useState({
        v_is_certified: false,
        v_is_trade: false,
        created_at: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(),
    })
    const [ rollbackVehicle, setRollbackVehicle ] = useState([])
    const [ company, setCompany ] = useState('Select A Company');
    const [ activeStep, setActiveStep ] = useState(0);
    const [ hasScraped, setHasScraped ] = useState(false);
    const [error, setError] = useState('');
    const [ loading, setLoading ] = useState({
        vehicleDetails: false,
        cargurus: false,
    })
    const [ rollback, setRollback ] = useState(false);
    const [ toRollback, setToRollback ] = useState({});
    const storedCompany = document.cookie.split(';').filter((e) => e.includes('selected_company'))[0].split('=')[1];

    useEffect(() => {
        if(storedCompany){
            let comp = companyDetails.filter(e => e.company_id === storedCompany)[0]
            setCompany(comp)
        }
    }, [])

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
            <div className='text-sm font-bold text-center text-stone-600'>
                <ButtonGroup>
                    <Button
                        color="primary"
                        variant={rollback ? 'outlined' : "contained"}
                        style={{
                            width: '15rem',
                            marginBottom: '2rem',
                        }}
                        onClick={() => {
                            setRollback(false)
                        }}
                    >
                        Start From Scratch
                    </Button>
                    <Button
                        color="primary"
                        variant={rollback ? "contained" : "outlined"}
                        style={{
                            width: '15rem',
                            marginBottom: '2rem',
                        }}
                        onClick={() => {
                            setRollback(true)
                        }}
                    >
                        Rollback
                    </Button>
                </ButtonGroup>
            </div>
            {!rollback ? <>
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
                        getOptionLabel={(option) => `${option.company_zip} (${proper(option?.company_name || '')})`}
                        style={{ width: '25rem' }}
                        renderInput={(params) => <TextField {...params} label="ZIP Code" variant="outlined" />}
                        freeSolo
                        defaultValue={storedCompany ? companyDetails?.find(e =>  e.company_id === storedCompany) : companyDetails?.find(e =>  e.company_zip === selComp?.company_zip)}
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
                                setLoading, 
                                (e) => {setError(e)}, 
                                (e) => {
                                    setCompany(selComp);
                                    setNewVehicle(was => { 
                                        return { 
                                            ...was,
                                            v_vehicle: `${e?.year || ''} ${e?.make?.toUpperCase() || ''} ${e?.model?.toUpperCase() || ''} ${e?.trim_level?.toUpperCase() || ''}`
                                        }
                                    }); 
                                },
                                (e) => {
                                    setNewVehicle(was => { 
                                        return { 
                                            ...was,
                                            v_final_carg_h: (selComp?.company_carg_preference ? e[selComp.company_carg_preference]?.replace(/[^0-9.]/g, '') : e?.highPrice?.replace(/[^0-9.]/g, '')) || '',
                                            v_imv: e?.IMV?.replace(/[^0-9.]/g, '') || '',
                                            v_final_carg_h_options: {
                                                greatPrice: e?.greatPrice?.replace(/[^0-9.]/g, '') || '',
                                                goodPrice: e?.goodPrice?.replace(/[^0-9.]/g, '') || '',
                                                fairPrice: e?.fairPrice?.replace(/[^0-9.]/g, '') || '',
                                                highPrice: e?.highPrice?.replace(/[^0-9.]/g, '') || '',
                                                overPrice: e?.overPrice?.replace(/[^0-9.]/g, '') || '',
                                            }
                                        }
                                    }); 
                                }
                            )
                        }}
                    >
                        Go
                    </Button>
                </div>
            </> :
            <>
                {rollbackVehicle.length > 0 ? <>
                    <div className='text-2xl font-bold text-center mb-4 text-stone-600'>This is what we found</div>
                    {rollbackVehicle.map((e, i) => {return <>
                        <div className='w-full flex flex-col justify-center items-center gap-4'>
                            <DocumentItem
                                setDocuments={setDocuments}
                                open={[]}
                                setOpen={() => {}}
                                index={1}
                                key={e.document_id}
                                doc={e.data}
                                doc_id={e.document_id}
                                docNotes={e.notes}
                                company={null}
                                docDates={e.metadata}
                            />
                        </div>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            style={{
                                margin: '2rem auto'
                            }}
                            onClick={() => {
                                insertRollback(e).then(() => {
                                    
                                })
                                setRollbackVehicle({})
                                setAdding(false)
                            }}
                        >
                            Choose
                        </Button>
                    </>})}
                    </>:<>
                    <div className='text-2xl font-bold text-center mb-4 text-stone-600'>Let's find the vehicle to rollback</div>
                    <div className='w-full flex flex-col justify-center items-center gap-4'>
                        <TextField
                            id='StockNo' 
                            value={rollbackVehicle.v_stock_no} 
                            onChange={(e) => setRollbackVehicle({ ...rollbackVehicle, v_stock_no: e.target.value })}
                            placeholder='Stock Number'
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
                                searchForRollbackVehicle(
                                    rollbackVehicle.v_stock_no,
                                    selComp?.company_id,
                                    setLoading,
                                ).then(e => {
                                    setRollbackVehicle(e);
                                })
                            }}
                        >
                            Go
                        </Button>
                    </div>
                </>}
            </>}
        </> }
        </div>
        <div>
            {hasScraped &&
                <Steps setParentLoading={setLoading} selComp={selComp} setDocuments={setDocuments} setAdding={setAdding} activeStep={activeStep} setActiveStep={setActiveStep} newVehicle={newVehicle} setNewVehicle={setNewVehicle} companyDetails={companyDetails} company={company} setCompany={setCompany} loadingIn={loading} />
            }
        </div>
        </div>
    )
}
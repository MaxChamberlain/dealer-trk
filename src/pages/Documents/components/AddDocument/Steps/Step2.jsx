import { OutlinedInput, InputLabel, InputAdornment, Autocomplete, TextField, MenuItem, Select, CircularProgress } from "@mui/material"
import { cancelSearch } from "../../../../../utils/search"

export default function Step2({ step, newVehicle, setNewVehicle, company, setCompany, companyDetails, loading, selComp, setLoading }){
    const sourceOptions = [
        'APPRAISAL',
        'AUCTION',
        'AUTO TRADER',
        'BID2BUY', 
        'CAROFFER', 
        'COMMERCIAL APPRAISAL',
        'ENTERPRISE',
        'KBB ICO REVIEW',
        'LEASE BUYOUT',
        'LEASE RETURN',
        'MANHEIM', 
        'ORDER UNIT',
        'RETIRED LOANER',
        'SUBARU', 
        'CORE',
        'DOMESTIC CAR',
        'DOMESTIC TRUCK',
        'IMPORT CAR',
        'IMPORT TRUCK',
        'LUXURY CAR',
        'LUXURY TRUCK',
        'G Unit',
        'EMPLOYEE / HOUSE',
        'NEW TRADE',
        'USED TRADE',
        'TRAC',
        'TCUV',
        ...companyDetails.map(e => e.company_name.toUpperCase())
    ].sort((a, b) => (a && b) ? a.localeCompare(b) : 0)
    return(
        <>
            <div className="my-4 grid grid-cols-5 gap-y-5 justify-center items-center">
                <div className='p-2'>
                    <InputLabel htmlFor="Margin">Margin</InputLabel>
                    <OutlinedInput
                        type="number"
                        id="Margin"
                        value={newVehicle.v_margin}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_margin: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="daysstock">Days In Stock</InputLabel>
                    <OutlinedInput
                        id="daysstock"
                        value={newVehicle.v_days}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_days: e.target.value })}
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="source">Source</InputLabel>
                    <Autocomplete  
                        id="source"
                        value={newVehicle.v_source ? newVehicle.v_source.toUpperCase() : ''}
                        onChange={(e, newValue) => setNewVehicle({ ...newVehicle, v_source: newValue.toUpperCase() })}
                        options={sourceOptions}
                        renderInput={(params) => <TextField {...params} />}
                        freeSolo
                        style={{
                            maxWidth: 210
                        }}
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="inmmr">Initial MMR</InputLabel>
                    <OutlinedInput
                        id="inmmr"
                        value={newVehicle.v_initial_mmr}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_initial_mmr: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="incarg">Initial CarGurus</InputLabel>
                    <OutlinedInput
                        id="incarg"
                        value={newVehicle.v_initial_carg_h}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_initial_carg_h: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="finmmr">Final MMR</InputLabel>
                    <OutlinedInput
                        id="finmmr"
                        value={newVehicle.v_final_mmr}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_final_mmr: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>  
                <div className='p-2'>
                    <InputLabel htmlFor="fincarg">Exit CarGurus</InputLabel>
                    {loading ? 
                        <div className='border border-stone-400 rounded p-1 flex justify-between'>
                            <CircularProgress />
                            <button onClick={() => cancelSearch(setLoading)}>Cancel</button>
                        </div>
                    :
                        <div className='flex'>
                            {(selComp?.company_carg_preference ? newVehicle?.v_final_carg_h_options[selComp.company_carg_preference] : newVehicle?.v_final_carg_h_options?.highPrice) ? <Select
                                fullWidth
                                id="fincarg"
                                value={newVehicle.v_final_carg_h}
                                type='number'
                                onChange={(e) => setNewVehicle({ ...newVehicle, v_final_carg_h: e.target.value })}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value={newVehicle.v_final_carg_h_options.greatPrice}>{newVehicle.v_final_carg_h_options.greatPrice} - Great Price</MenuItem>
                                <MenuItem value={newVehicle.v_final_carg_h_options.goodPrice}>{newVehicle.v_final_carg_h_options.goodPrice} - Good Price</MenuItem>
                                <MenuItem value={newVehicle.v_final_carg_h_options.fairPrice}>{newVehicle.v_final_carg_h_options.fairPrice} - Fair Price</MenuItem>
                                <MenuItem value={newVehicle.v_final_carg_h_options.highPrice}>{newVehicle.v_final_carg_h_options.highPrice} - High Price</MenuItem>
                                <MenuItem value={newVehicle.v_final_carg_h_options.overPrice}>{newVehicle.v_final_carg_h_options.overPrice} - Over Price</MenuItem>
                            </Select> :
                            <OutlinedInput
                                id="fincarg"
                                value={newVehicle.v_final_carg_h}
                                type='number'
                                onChange={(e) => setNewVehicle({ ...newVehicle, v_final_carg_h: e.target.value })}
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                            />}  
                        </div>
                    }
                </div>
                <div className='p-2'>   
                    <InputLabel htmlFor="sprice">Start Price</InputLabel>
                    <OutlinedInput
                        id="sprice"
                        value={newVehicle.v_start_price}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_start_price: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="sellprice">Sell Price</InputLabel>
                    <OutlinedInput
                        id="sellprice"
                        value={newVehicle.v_sell_price}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_sell_price: e.target.value })}
                        startAdornment={
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        }
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="mperce">Market %</InputLabel>
                    <OutlinedInput
                        id="mperce"
                        value={newVehicle.v_market_percent}
                        type='number'
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_market_percent: e.target.value })}
                        endAdornment={
                            <InputAdornment position="end">
                                %
                            </InputAdornment>
                        }

                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="imv">IMV</InputLabel>
                    {loading ? 
                        <div className='border border-stone-400 rounded p-1 flex justify-between'>
                            <CircularProgress />
                            <button onClick={() => cancelSearch(setLoading)}>Cancel</button>
                        </div>
                    :
                        <OutlinedInput
                            id="imv"
                            value={newVehicle.v_imv}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_imv: e.target.value })}
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                        />
                    }
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="strtacv">ACV</InputLabel>   
                    <OutlinedInput
                        id="strtacv"    
                        value={newVehicle.v_acv}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_acv: e.target.value })}
                        startAdornment="$"
                    /> 
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="endacv">Final ACV</InputLabel>   
                    <OutlinedInput
                        id="endacv"    
                        value={newVehicle.v_final_acv}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_final_acv: e.target.value })}
                        startAdornment="$"
                    /> 
                </div>
            </div>
        </>
    )
}
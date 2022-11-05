import { FormControl, OutlinedInput, InputLabel, Select, MenuItem, Button, Menu, CircularProgress } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'
import { useState } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import '../style.css'

export default function VehicleDetailsAddition({ step, newVehicle, setNewVehicle, company, setCompany, companyDetails }){

    const years = []
    for(let i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--){
        years.push(i)
    }

    return(
        step === 0 ?
            <div className='my-4 flex justify-between w-full'>
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
                        id="Year"
                        value={newVehicle.v_year || new Date().getFullYear()}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_year: e.target.value })}
                    >
                        {years.map(year => <MenuItem value={year}>{year}</MenuItem>)}
                    </Select>
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="Make">Vehicle Make</InputLabel>
                    <OutlinedInput
                        id="Make"wV
                        value={newVehicle.v_make}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_make: e.target.value })}
                    />
                </div>
                <div className='p-2'>   
                    <InputLabel htmlFor="Model">Vehicle Model</InputLabel>
                    <OutlinedInput
                        id="Model"
                        value={newVehicle.v_model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_model: e.target.value })}
                    />
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="pkg">Vehicle Package</InputLabel>
                    <OutlinedInput
                        id="pkg"
                        value={newVehicle.v_package}
                        onChange={(e) => setNewVehicle({ ...newVehicle, v_package: e.target.value })}
                    />
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
        :step === 1 ?
            <>
                <div className="my-4 grid grid-cols-5 gap-y-5 justify-center items-center">
                    <div className='p-2'>
                        <InputLabel htmlFor="Margin">Margin</InputLabel>
                        <OutlinedInput
                            type="number"
                            id="Margin"
                            value={newVehicle.v_margin}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_margin: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="source">Source</InputLabel>
                        <OutlinedInput
                            id="source"
                            value={newVehicle.v_source}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_source: e.target.value })}
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
                        <InputLabel htmlFor="sprice">Start Price</InputLabel>
                        <OutlinedInput
                            id="sprice"
                            value={newVehicle.v_start_price}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_start_price: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="sellprice">Sell Price</InputLabel>
                        <OutlinedInput
                            id="sellprice"
                            value={newVehicle.v_sell_price}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_sell_price: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="mperce">Market %</InputLabel>
                        <OutlinedInput
                            id="mperce"
                            value={newVehicle.v_market_percent}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_market_percent: e.target.value })}

                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="inmmr">Initial MMR</InputLabel>
                        <OutlinedInput
                            id="inmmr"
                            value={newVehicle.v_initial_mmr}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_initial_mmr: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="incarg">Initial CarGurus High</InputLabel>
                        <OutlinedInput
                            id="incarg"
                            value={newVehicle.v_initial_carg_h}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_initial_carg_h: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <InputLabel htmlFor="finmmr">Final MMR</InputLabel>
                        <OutlinedInput
                            id="finmmr"
                            value={newVehicle.v_final_mmr}
                            type='number'
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_final_mmr: e.target.value })}
                        />
                    </div>  
                    <div className='p-2'>
                        <InputLabel htmlFor="fincarg">Final CarGurus High</InputLabel>
                        <div className='flex'>
                            <OutlinedInput
                                id="fincarg"
                                value={newVehicle.v_final_carg_h}
                                type='number'
                                onChange={(e) => setNewVehicle({ ...newVehicle, v_final_carg_h: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </>
        : step === 2 &&
            <>
                <div className="my-4 flex justify-around">
                    <div className='p-2'>
                        <InputLabel htmlFor="trade">Was This A Trade?</InputLabel>
                        <Checkbox
                            id="trade"
                            checked={newVehicle.v_is_trade}
                            onChange={(e) => setNewVehicle({ ...newVehicle, v_is_trade: e.target.checked })}
                        />
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
                    </div>
                </div>
                <div className='p-2'>
                    <InputLabel htmlFor="cmpn">Which company is this for?</InputLabel>
                    <Select    
                        fullWidth
                        id="cmpn"
                        value={company}
                        type='number'
                        onChange={(e) => setCompany(e.target.value)}
                    >
                        {companyDetails.map((e, i) => {
                            return <MenuItem key={i} value={e}>{e.company_name}</MenuItem>
                        })}
                    </Select>
                </div>
            </>
    )
}
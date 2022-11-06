import { OutlinedInput, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'

export default function Step1({ step, newVehicle, setNewVehicle, company, setCompany, companyDetails }){

    const years = []
    for(let i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--){
        years.push(i)
    }

    return(
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
            <FormHelperText>e.g. 2020</FormHelperText>
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="Make">Vehicle Make</InputLabel>
            <OutlinedInput
                id="Make"wV
                value={newVehicle.v_make}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_make: e.target.value })}
            />
            <FormHelperText>e.g. Toyota</FormHelperText>
        </div>
        <div className='p-2'>   
            <InputLabel htmlFor="Model">Vehicle Model</InputLabel>
            <OutlinedInput
                id="Model"
                value={newVehicle.v_model}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_model: e.target.value })}
            />
            <FormHelperText>e.g. Camry</FormHelperText>
        </div>
        <div className='p-2'>
            <InputLabel htmlFor="pkg">Vehicle Package</InputLabel>
            <OutlinedInput
                id="pkg"
                value={newVehicle.v_package}
                onChange={(e) => setNewVehicle({ ...newVehicle, v_package: e.target.value })}
            />
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
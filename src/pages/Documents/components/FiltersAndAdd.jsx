import { useNavDates } from '../hooks/useNavDates'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { proper } from '../../../utils/textDisplay';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { OutlinedInput, Box, Button, TextField, Autocomplete } from '@mui/material';

export default function FiltersAndAdd({ search, setSearch, documents, setAddDocument, setCreatedBy }){
    const [ startDate, endDate, handleDateChange ] = useNavDates()

    return(
        <div className='w-full p-6 flex align-center z=[9999]' id='filter-bar-docs'>
            <div className='w-full bg-white justify-start p-4 rounded drop-shadow flex items-center'>
                <div className='flex w-1/2'>
                    <OutlinedInput 
                        fullWidth={true}
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                    />
                    <div className='w-fit px-4 border-r border-b border-t rounded-tr rounded-br h-full' style={{
                        borderColor: '#bbb'
                    }}>
                        <SearchIcon 
                            style={{
                                color: 'rgba(0,0,0,0.6)',
                                margin: '15px auto',
                            }}
                        />
                    </div>
                </div>
                <Box sx={{ width: '200px', margin: '0 10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            
                            label="Start Date"
                            maxDate={endDate}
                            value={new Date(startDate)}
                            onChange={(newValue) => handleDateChange(newValue, 'start')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ width: '200px', marginRight: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            
                            label="End Date"
                            minDate={startDate}
                            value={new Date(endDate)}
                            onChange={(newValue) => handleDateChange(newValue, 'end')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Autocomplete
                    fullWidth={true}
                    id="combo-box-demo"
                    options={documents ? ['Any', ...new Set(documents.users.map((x) => 
                            x.user_id
                    ))] : []}
                    sx={{ width: 300, zIndex: 9999 }}
                    renderInput={(params) => <TextField style={{zIndex: 9999}} {...params} label="Created By" />}
                    onChange={(e, x) => setCreatedBy(x)}
                    defaultValue='Any'
                    disableClearable={true}
                    getOptionLabel={(x) => {
                        let item = documents?.users?.find(e => e.user_id === x)
                        return `${proper(item?.user_fname || x)} ${proper(item?.user_lname || '')}`
                    }}
                />
                <Button
                    color="primary"
                    aria-label="add"
                    variant='contained' style={{
                        marginLeft: '10px',
                        width: '10%',
                        height: '100%',
                    }}
                    onClick={() => setAddDocument(was => !was)}
                >
                    <AddIcon /> Add Document
                </Button>
            </div>
        </div>
    )
}
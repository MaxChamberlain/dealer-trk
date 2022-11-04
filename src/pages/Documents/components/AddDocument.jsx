import { useState } from 'react';
import { Divider, Button, FormControl, InputLabel, OutlinedInput, MenuItem, Input, Select, Box, TextField } from '@mui/material';
import { proper } from '../../../utils/textDisplay';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { insertDocument } from '../../../utils/api';

export default function DocumentItem({ companyDetails }){
    const years = []
    for(let i = new Date().getFullYear(); i >= new Date().getFullYear() - 30; i--){
        years.push(i)
    }
    const [ vehicleDetails, setVehicleDetails ] = useState({
        head: {},
        body: {
            document_vehicle_trade_title_date: new Date(),
            document_vehicle_sale_title_date: new Date(),
            document_vehicle_payoff_date: new Date(),
            document_vehicle_funding_date: new Date(),
        }
    });
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const handleSave = () => {
        insertDocument(vehicleDetails, 1, setLoading, setError)
    }
    return(
        <div id='document-list-item' className={`z-[9990] w-full bg-white drop-shadow p-4 text-base mb-10`}>
            <div className="flex justify-between items-center">
                <div className='flex align-center'>
                    <FormControl>
                        <InputLabel htmlFor="Year">Vehicle Year</InputLabel>
                        <Select
                            style={{ width: 150 }}
                            id="Year"
                            value={vehicleDetails?.body.document_vehicle_year || ''}
                            onChange={(e) => setVehicleDetails(was => {
                                return {
                                    ...was,
                                    body: {
                                        ...was.body,
                                        document_vehicle_year: e.target.value
                                    }
                                }
                            })}
                        >
                            {years.map((year, i) => (
                                <MenuItem key={i} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginLeft: 10 }}>
                        <InputLabel htmlFor="Make">Vehicle Make</InputLabel>
                        <OutlinedInput
                            id="Make"
                            type="text"
                            value={vehicleDetails?.body.document_vehicle_make || ''}
                            onChange={(e) => setVehicleDetails(was => {
                                return {
                                    ...was,
                                    body: {
                                        ...was.body,
                                        document_vehicle_make: e.target.value
                                    }
                                }
                            })}
                        />
                    </FormControl>
                    <FormControl style={{ marginLeft: 10 }}>
                        <InputLabel htmlFor="Model">Vehicle Model</InputLabel>
                        <OutlinedInput
                            id="Model"
                            type="text"
                            value={vehicleDetails?.body.document_vehicle_model || ''}
                            onChange={(e) => setVehicleDetails(was => {
                                return {
                                    ...was,
                                    body: {
                                        ...was.body,
                                        document_vehicle_model: e.target.value
                                    }
                                }
                            })}
                        />
                    </FormControl>
                    <span>- Trip Pad</span>
                </div>
                <div className='text-base text-gray-600 flex flex-col items-end'>
                    <i>Created (Calculated Field) </i>
                    <i>Modified (Calculated Field) </i>
                </div>
            </div>
            <br />
            <FormControl style={{ marginLeft: 10 }}>
                <InputLabel htmlFor="Vin">Vehicle VIN</InputLabel>
                <OutlinedInput
                    id="Vin"
                    type="text"
                    value={vehicleDetails?.body.document_vehicle_vin || ''}
                    onChange={(e) => setVehicleDetails(was => {
                        return {
                            ...was,
                            body: {
                                ...was.body,
                                document_vehicle_vin: e.target.value.toUpperCase()
                            }
                        }
                    })}
                />
            </FormControl>
            <br />
            <br />
            <Divider />
            <br />
            <FormControl>
                <InputLabel htmlFor="company">Company</InputLabel>
                <Select id='company' style={{ width: 400 }}
                    value={vehicleDetails?.head.company_id || ''}
                    onChange={(e) => setVehicleDetails(was => {
                        return {
                            ...was,
                            head: {
                                ...was.head,
                                company_id: e.target.value
                            }
                        }
                    })}
                >
                    {companyDetails && companyDetails.map((company, index) => {
                        return(
                            <MenuItem value={company.company_id}>{company.company_name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>

            <div className='font-bold text-base mt-6'>General Vehicle Info</div>
                <Divider />
                <div className='grid items-center justify-center px-6 mt-3 grid-cols-5 gap-6'>
                    <div className='flex'>
                        <div className='flex flex-col mr-4'>
                            <span className='font-bold'>Cust. First Name: </span>
                            <Input 
                                placeholder='First Name'
                                id="cust_fname"
                                type="text"
                                value={vehicleDetails?.body.cust_fname || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            cust_fname: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                        <div clssName='flex flex-col'>
                            <span className='font-bold'>Cust. Last Name: </span>
                            <br />
                            <Input
                                placeholder='Last Name'
                                id="cust_lname"
                                type="text"
                                value={vehicleDetails?.body.cust_lname || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            cust_lname: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Make: </span>
                        <span>{vehicleDetails.body.document_vehicle_make ? proper(vehicleDetails.body.document_vehicle_make) : 'Calculated Field'}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Model: </span>
                        <span>{vehicleDetails.body.document_vehicle_model ? proper(vehicleDetails.body.document_vehicle_model) : 'Calculated Field'}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Year: </span>
                        <span>{vehicleDetails.body.document_vehicle_year ? vehicleDetails.body.document_vehicle_year : 'Calculated Field'}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Model Number: </span>
                        <br />
                        <Input
                            placeholder='Model NO.'
                            id="model_num"
                            type="text"
                            value={vehicleDetails?.body.document_vehicle_model_number || ''}
                            onChange={(e) => setVehicleDetails(was => {
                                return {
                                    ...was,
                                    body: {
                                        ...was.body,
                                        document_vehicle_model_number: e.target.value
                                    }
                                }
                            })}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Stock Number: </span>
                        <br />
                        <Input
                            placeholder='Stock NO.'
                            id="stock_num"
                            type="text"
                            value={vehicleDetails?.body.document_vehicle_stock_number || ''}
                            onChange={(e) => setVehicleDetails(was => {
                                return {
                                    ...was,
                                    body: {
                                        ...was.body,
                                        document_vehicle_stock_number: e.target.value
                                    }
                                }
                            })}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>VIN: </span>
                        <span>{vehicleDetails.body.document_vehicle_vin ? proper(vehicleDetails.body.document_vehicle_vin) : 'Calculated Field'}</span>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='mr-2 w-3/5'>
                        <div className='font-bold text-base mt-6'>Trade Details</div>
                        <Divider />
                        <div className='grid items-center justify-center px-6 mt-3 grid-cols-4'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Traded Vehicle Make: </span>
                            <Input
                                placeholder='Traded For Make'
                                id="trade_make"
                                type="text"
                                value={vehicleDetails?.body.document_vehicle_trade_make || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            document_vehicle_trade_make: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                        <div className='flex flex-col ml-4'>
                            <span className='font-bold'>Traded Vehicle Model: </span>
                            <Input
                                placeholder='Traded For Model'
                                id="trade_model"
                                type="text"
                                value={vehicleDetails?.body.document_vehicle_trade_model || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            document_vehicle_trade_model: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                        <div className='flex flex-col ml-4'>
                            <span className='font-bold'>Title Trade Date: </span>
                            <Box sx={{ width: '100%', marginRight: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        
                                        value={vehicleDetails?.body.document_vehicle_trade_title_date || new Date()}
                                        onChange={(newValue) => {
                                            setVehicleDetails(was => {
                                                return {
                                                    ...was,
                                                    body: {
                                                        ...was.body,
                                                        document_vehicle_trade_title_date: newValue.toLocaleDateString('en-US')
                                                    }
                                                }
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </div>
                        <div className='flex flex-col ml-4'>
                            <span className='font-bold'>Vehicle Trade Year: </span>
                            <Input
                                placeholder='Year'
                                id="trade_year"
                                type="text"
                                value={vehicleDetails?.body.document_vehicle_trade_year || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            document_vehicle_trade_year: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                        </div>
                    </div>
                    <div className='ml-2 w-1/4'>
                        <div className='font-bold text-base mt-6'>Financial</div>
                        <Divider />
                        <div className='grid items-center justify-center px-6 mt-3 grid-cols-2'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Vehicle Price: </span>
                                <div className='flex'>
                                    <span className='mr-px'>$</span> 
                                    <Input
                                        placeholder='Price'
                                        id="price"
                                        type="number"
                                        value={vehicleDetails?.body.document_vehicle_price || ''}
                                        onChange={(e) => setVehicleDetails(was => {
                                            return {
                                                ...was,
                                                body: {
                                                    ...was.body,
                                                    document_vehicle_price: parseInt(e.target.value)
                                                }
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Bank Name: </span>
                                <Input
                                    placeholder='bank'
                                    id="bank_name"
                                    type="text"
                                    value={vehicleDetails.body.document_bank_name ? vehicleDetails.body.document_bank_name.toUpperCase() : ''}
                                    onChange={(e) => setVehicleDetails(was => {
                                        return {
                                            ...was,
                                            body: {
                                                ...was.body,
                                                document_bank_name: e.target.value
                                            }
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='font-bold text-base mt-6'>Key Dates</div>
                    <Divider />
                    <div className='grid items-center justify-center px-6 mt-3 grid-cols-5'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Payoff Date: </span>
                            <Box sx={{ width: '100%', marginRight: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        
                                        value={vehicleDetails?.body.document_vehicle_payoff_date || new Date()}
                                        onChange={(newValue) => {
                                            setVehicleDetails(was => {
                                                return {
                                                    ...was,
                                                    body: {
                                                        ...was.body,
                                                        document_vehicle_payoff_date: newValue.toLocaleDateString('en-US')
                                                    }
                                                }
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Title Sale Date: </span>
                            <Box sx={{ width: '100%', marginRight: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        
                                        value={vehicleDetails?.body.document_vehicle_sale_title_date || new Date()}
                                        onChange={(newValue) => {
                                            setVehicleDetails(was => {
                                                return {
                                                    ...was,
                                                    body: {
                                                        ...was.body,
                                                        document_vehicle_sale_title_date: newValue.toLocaleDateString('en-US')
                                                    }
                                                }
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Title Trade Date: </span>
                            <Box sx={{ width: '100%', marginRight: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        
                                        value={vehicleDetails?.body.document_vehicle_trade_title_date || new Date()}
                                        onChange={(newValue) => {
                                            setVehicleDetails(was => {
                                                return {
                                                    ...was,
                                                    body: {
                                                        ...was.body,
                                                        document_vehicle_trade_title_date: newValue.toLocaleDateString('en-US')
                                                    }
                                                }
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </div>
                        <div className='flex flex-col w-5/6'>
                            <span className='font-bold'>Vehicle Trade Year: </span>
                            <Input
                                placeholder='Year'
                                id="trade_year"
                                type="text"
                                value={vehicleDetails?.body.document_vehicle_trade_year || ''}
                                onChange={(e) => setVehicleDetails(was => {
                                    return {
                                        ...was,
                                        body: {
                                            ...was.body,
                                            document_vehicle_trade_year: e.target.value
                                        }
                                    }
                                })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Vehicle Funding Date: </span>
                            <Box sx={{ width: '100%', marginRight: '10px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        
                                        value={vehicleDetails?.body.document_vehicle_funding_date || new Date()}
                                        onChange={(newValue) => {
                                            setVehicleDetails(was => {
                                                return {
                                                    ...was,
                                                    body: {
                                                        ...was.body,
                                                        document_vehicle_funding_date: newValue.toLocaleDateString('en-US')
                                                    }
                                                }
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </div>
                    </div>
                    <Button 
                        variant="contained"
                        color="primary"
                        className='mt-6'
                        onClick={handleSave}
                    >
                        Save
                    </Button>
        </div>
    )
}
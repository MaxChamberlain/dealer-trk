import { addCompanyPermission } from '../../../../utils/api';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

export default function NewUser({ company, setAdding }){
    const [permLevel, setPermLevel] = useState('view');
    return(<>
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[999] flex items-center justify-center'>
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[1000] flex items-center justify-center' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} onClick={() => setAdding(false)}></div>
            <div className='bg-white rounded p-4 z-[9999]'>
                <div className='font-bold text-2xl mb-4'>
                    Add a new user
                </div>
                <div className='flex justify-around'>
                    <div className='w-full'>
                        <TextField 
                            fullWidth
                            label='Add New User'
                            id={'newEmail'}
                        ></TextField>
                    </div>
                        <Select
                            label='Permission Level'
                            value={permLevel}
                            onChange={(e) => setPermLevel(e.target.value)}
                        >
                            <MenuItem
                                value='view'
                            >
                                View Only
                            </MenuItem>
                            <MenuItem
                                value='edit'
                            >
                                Edit
                            </MenuItem>
                        </Select>
                </div>
                <Button variant='contained' color='primary' style={{ marginTop: '1rem' }}
                    fullWidth
                    onClick={() => {
                        addCompanyPermission(company.company_id, document.getElementById('newEmail').value, permLevel)
                    }}
                >
                    Add User
                </Button>
            </div>
        </div>
    </>
    )
}
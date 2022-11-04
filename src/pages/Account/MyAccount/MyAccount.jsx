import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { proper, parsePhone } from '../../../utils/textDisplay';
import { getCompanyDetails } from '../../../utils/api';
import { Divider, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Fab, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function MyAccount(){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null); 
    const [ accDetails, setAccDetails ] = useState(null);
    const [ adding, setAdding ] = useState(false);
    const [ newCompany, setNewCompany ] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
    });

    const { user } = useContext(UserContext);

    useEffect(() => {
        setAccDetails({ user });
        getCompanyDetails(setLoading, setError).then(res => {
            setAccDetails(was => {
                return { ...was, companyData: res }
            });
        })
    }, [])

    return(
        <div className='flex w-full justify-around md:items-start md:flex-row flex-col p-4'>
            <Box sx={{ '& > :not(style)': { m: 1 } }} style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
            }}>
                <Fab color="primary" aria-label="add" onClick={() => setAdding(was => !was)}>
                    <AddIcon />
                </Fab>
            </Box>
            {adding && 
                <div className='fixed top-0 left-0 right-0 bottom-0 z-[9998] flex justify-center align-start pt-16'>
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30' onClick={() => setAdding(false)}></div>  
                    <div className='bg-white p-4 rounded z-[9999] h-fit'>
                        <div className='font-bold text-2xl mb-4'>
                            Create a Company
                        </div>
                        <Divider />
                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <div className='flex flex-col w-4/5'>
                                    <div className='font-bold'>
                                        Company Name
                                    </div>
                                    <input type="text" placeholder='The Car Place' 
                                        value={newCompany.name}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, name: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col w-1/5 ml-2'>
                                    <div className='font-bold'>
                                        Company Phone
                                    </div>
                                    <input type="text" placeholder='1234567890' 
                                        value={newCompany.phone}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, phone: parsePhone(e.target.value) }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                <div className='flex flex-col mt-4'>
                                    <div className='font-bold'>
                                        Company Street
                                    </div>
                                    <input type="text" placeholder='1234 Oak St' 
                                        value={newCompany.street}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, street: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company City
                                    </div>
                                    <input type="text" placeholder='Los Angeles' 
                                        value={newCompany.city}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, city: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company State
                                    </div>
                                    <input type="text" placeholder='CA' 
                                        value={newCompany.state}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, state: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company Zip
                                    </div>
                                    <input type="text" placeholder='12321' 
                                        value={newCompany.zip}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, zip: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                            </div>
                        </div>
                        <Button
                            fullWidth
                            disabled={Object.values(newCompany).some(val => val === '')}
                            variant="contained"
                            style={{ marginTop: 20 }}
                        >
                            Create Company
                        </Button>
                    </div>
                </div>
            }
            {accDetails && accDetails.user && 
                <div className='border bg-white drop-shadow-sm border-stone-300 p-4 rounded flex flex-col items-center w-full md:w-1/4'>
                    <div className='font-bold text-2xl'>
                        {proper(accDetails.user.user_fname)} {proper(accDetails.user.user_initial)} {proper(accDetails.user.user_lname)}
                    </div>
                    <div className='font-bold text-xl'>
                        {accDetails.user.user_email}
                    </div>
                    <div className='font-bold text-xl'>
                        {parsePhone(accDetails.user.user_phone)}
                    </div>
                </div>
            }
            <div className='flex p-4 md:p-0 md:pl-4 flex-col w-full md:w-3/4'>
                {accDetails && accDetails.companyData &&
                    accDetails.companyData.map(company => {
                        return(
                            <div className='border bg-white drop-shadow-sm border-stone-300 rounded flex flex-col p-4 mb-4'>
                                <div className='font-bold text-xl mb-2'>
                                    {proper(company.company_name)}
                                </div>
                                <Divider />
                                <TableContainer>
                                    <Table size="small" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    Street Address
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    City
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    State
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    Zip
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    Phone
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    {company.company_street ? proper(company.company_street) : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {company.company_city ? proper(company.company_city) : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {company.company_state ? proper(company.company_state) : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {company.company_zip ? proper(company.company_zip) : 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    {company.company_phone ? parsePhone(company.company_phone) : 'N/A'}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className='flex items-around w-full bg-stone-100 mt-2 p-2 shadow-inner'>
                                    <div className='mr-2 border-r-2 border-stone-300 w-1/4'>
                                        Your Roles:
                                    </div>
                                    <div className='flex border-r-2 border-stone-300 justify-center w-1/4'>
                                        View:
                                        <span className='mx-1'></span>
                                        <span>{company.permission_level.toString().split('')[0] === '0' ? 
                                            'None' : company.permission_level.toString().split('')[0] === '1' ? 
                                            'Basic' : company.permission_level.toString().split('')[0] === '3' ? 'Basic + Dollar Amounts' : 
                                            company.permission_level.toString().split('')[0] === '7' ? 'All' : 'N/A'
                                        }</span>
                                    </div>
                                    <div className='flex border-r-2 border-stone-300 justify-center w-1/4'>
                                        Edit: 
                                        <span className='mx-1'></span>
                                        <span>{company.permission_level.toString().split('')[1] === '0' ?
                                            'None' : company.permission_level.toString().split('')[1] === '1' ?
                                            'Basic' : company.permission_level.toString().split('')[1] === '3' ? 'Basic + Dollar Amounts' :
                                            company.permission_level.toString().split('')[1] === '7' ? 'All' : 'N/A'
                                        }</span>
                                    </div>
                                    <div className='flex justify-center w-1/4'>
                                        Delete:
                                        <span className='mx-1'></span>
                                        <span>{company.permission_level.toString().split('')[2] === '0' ?
                                            'None' : company.permission_level.toString().split('')[2] === '1' ?
                                            'Basic' : company.permission_level.toString().split('')[2] === '3' ? 'Basic + Dollar Amounts' :
                                            company.permission_level.toString().split('')[2] === '7' ? 'All' : 'N/A'
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}
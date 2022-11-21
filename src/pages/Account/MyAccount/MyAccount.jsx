import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { proper, parsePhone } from '../../../utils/textDisplay';
import { getCompanyDetails, addCompany, addCompanyPermission, updateCompany, getUsersInCompany } from '../../../utils/api';
import { Divider, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button, OutlinedInput, TextField, FormHelperText, Select, MenuItem, ButtonGroup } from '@mui/material';

export default function MyAccount(){
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null); 
    const [ accDetails, setAccDetails ] = useState(null);
    const [ adding, setAdding ] = useState(false);
    const [ newCompany, setNewCompany ] = useState({
        company_name: '',
        company_street: '',
        company_city: '',
        company_state: '',
        company_zip: '',
        company_phone: '',
        company_carg_preference: 'highPrice',
    });
    const [ usersIn, setUsersIn ] = useState({
        company_id: null,
        users: [],
    });

    const [ edittedCompany, setEdittedCompany ] = useState(null)

    const { user } = useContext(UserContext);

    useEffect(() => {
        setAccDetails({ user });
        getCompanyDetails(setLoading, setError).then(res => {
            setAccDetails(was => {
                return { ...was, companyData: res }
            });
        })
    }, [])

    const getUsers = async (company_id, company_name) => {
        const res = await getUsersInCompany(company_id);
        setUsersIn({
            company_id,
            company_name,
            users: res,
        });
    }

    return(
        <div className='flex w-full justify-around md:items-start md:flex-row flex-col p-4'>
            {edittedCompany && 
                <div className='fixed top-0 left-0 right-0 bottom-0 z-[9997] flex justify-center align-start pt-16'>
                    <div className='fixed top-0 left-0 z-[9998] right-0 bottom-0 bg-black bg-opacity-30' onClick={() => {setEdittedCompany(null)}}></div>  
                    <div className='bg-white p-4 rounded z-[9998] h-fit'>
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
                                        value={edittedCompany.company_name}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, edittedCompany: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col w-1/5 ml-2'>
                                    <div className='font-bold'>
                                        Company Phone
                                    </div>
                                    <input type="text" placeholder='1234567890' 
                                        value={edittedCompany.company_phone}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, company_phone: parsePhone(e.target.value) }
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
                                        value={edittedCompany.company_street}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, company_street: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company City
                                    </div>
                                    <input type="text" placeholder='Los Angeles' 
                                        value={edittedCompany.company_city}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, company_city: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company State
                                    </div>
                                    <input type="text" placeholder='CA' 
                                        value={edittedCompany.company_state}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, company_state: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company Zip
                                    </div>
                                    <input type="text" placeholder='12321' 
                                        value={edittedCompany.company_zip}
                                        onChange={(e) => setEdittedCompany(was => {
                                            return { ...was, company_zip: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                            </div>
                                <div className='flex flex-col mt-4 ml-2' style={{zIndex: 9999}}>
                                    <div className='font-bold'>
                                        Company Default CarGuru Number
                                    </div>
                                    <ButtonGroup
                                        orientation='vertical'
                                        >
                                        <Button
                                            variant={edittedCompany.company_carg_preference === 'overPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setEdittedCompany(was => {
                                                return { ...was, company_carg_preference: 'overPrice' }
                                            })}
                                        >OverPrice</Button>
                                        <Button
                                            variant={edittedCompany.company_carg_preference === 'highPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setEdittedCompany(was => {
                                                return { ...was, company_carg_preference: 'highPrice' }
                                            })}
                                        >HighPrice</Button>
                                        <Button
                                            variant={edittedCompany.company_carg_preference === 'fairPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setEdittedCompany(was => {
                                                return { ...was, company_carg_preference: 'fairPrice' }
                                            })}
                                        >FairPrice</Button>
                                        <Button
                                            variant={edittedCompany.company_carg_preference === 'goodPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setEdittedCompany(was => {
                                                return { ...was, company_carg_preference: 'goodPrice' }
                                            })}
                                        >GoodPrice</Button>
                                        <Button
                                            variant={edittedCompany.company_carg_preference === 'greatPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setEdittedCompany(was => {
                                                return { ...was, company_carg_preference: 'greatPrice' }    
                                            })}
                                        >GreatPrice</Button>
                                    </ButtonGroup>
                                </div>
                        </div>
                        <Button
                            fullWidth
                            disabled={!edittedCompany.company_name || !edittedCompany.company_carg_preference}
                            variant="contained"
                            style={{ marginTop: 20 }}
                            onClick={() => {
                                updateCompany(edittedCompany, setLoading, setError)
                            }}
                        >
                            Update Company
                        </Button>
                    </div>
                </div>
            }
            {adding && 
                <div className='fixed top-0 left-0 right-0 bottom-0 z-[9997] flex justify-center align-start pt-16'>
                    <div className='fixed top-0 left-0 z-[9998] right-0 bottom-0 bg-black bg-opacity-30' onClick={() => {setAdding(false); setNewCompany({
                        company_name: '',
                        company_street: '',
                        company_city: '',
                        company_state: '',
                        company_zip: '',
                        company_phone: '',
                        company_carg_preference: 'highPrice',
                    })}}></div>  
                    <div className='bg-white p-4 rounded z-[9998] h-fit'>
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
                                        value={newCompany.company_name}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_name: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col w-1/5 ml-2'>
                                    <div className='font-bold'>
                                        Company Phone
                                    </div>
                                    <input type="text" placeholder='1234567890' 
                                        value={newCompany.company_phone}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_phone: parsePhone(e.target.value) }
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
                                        value={newCompany.company_street}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_street: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company City
                                    </div>
                                    <input type="text" placeholder='Los Angeles' 
                                        value={newCompany.company_city}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_city: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company State
                                    </div>
                                    <input type="text" placeholder='CA' 
                                        value={newCompany.company_state}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_state: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                                <div className='flex flex-col mt-4 ml-2'>
                                    <div className='font-bold'>
                                        Company Zip
                                    </div>
                                    <input type="text" placeholder='12321' 
                                        value={newCompany.company_zip}
                                        onChange={(e) => setNewCompany(was => {
                                            return { ...was, company_zip: e.target.value }
                                        })}
                                    className='border border-stone-200 rounded p-2' />
                                </div>
                            </div>
                                <div className='flex flex-col mt-4 ml-2' style={{zIndex: 9999}}>
                                    <div className='font-bold'>
                                        Company Default CarGuru Number
                                    </div>
                                    <ButtonGroup
                                        orientation='vertical'
                                        >
                                        <Button
                                            variant={newCompany.company_carg_preference === 'overPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setNewCompany(was => {
                                                return { ...was, company_carg_preference: 'overPrice' }
                                            })}
                                        >OverPrice</Button>
                                        <Button
                                            variant={newCompany.company_carg_preference === 'highPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setNewCompany(was => {
                                                return { ...was, company_carg_preference: 'highPrice' }
                                            })}
                                        >HighPrice</Button>
                                        <Button
                                            variant={newCompany.company_carg_preference === 'fairPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setNewCompany(was => {
                                                return { ...was, company_carg_preference: 'fairPrice' }
                                            })}
                                        >FairPrice</Button>
                                        <Button
                                            variant={newCompany.company_carg_preference === 'goodPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setNewCompany(was => {
                                                return { ...was, company_carg_preference: 'goodPrice' }
                                            })}
                                        >GoodPrice</Button>
                                        <Button
                                            variant={newCompany.company_carg_preference === 'greatPrice' ? 'contained' : 'outlined'}
                                            onClick={() => setNewCompany(was => {
                                                return { ...was, company_carg_preference: 'greatPrice' }    
                                            })}
                                        >GreatPrice</Button>
                                    </ButtonGroup>
                                </div>
                        </div>
                        <Button
                            fullWidth
                            disabled={!newCompany.company_name || !newCompany.company_carg_preference}
                            variant="contained"
                            style={{ marginTop: 20 }}
                            onClick={() => {
                                addCompany(newCompany, setLoading, setError)
                            }}
                        >
                            Create Company
                        </Button>
                    </div>
                </div>
            }
            <div className='flex flex-col w-full md:w-1/4'>
                {accDetails && accDetails.user && 
                    <div className='border bg-white drop-shadow-sm border-stone-300 p-4 rounded flex flex-col items-center w-full'>
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
                <Button variant='contained' style={{ marginTop: 20 }} aria-label="add" onClick={() => setAdding(was => !was)}>
                    Add a company
                </Button>
                {usersIn.company_id && 
                    <div className='mt-6 border bg-white drop-shadow-sm border-stone-300 p-4 rounded flex flex-col items-center w-full'>

                        <div className='font-bold text-xl mb-2 flex justify-between'>
                            Users In {proper(usersIn.company_name)}
                        </div>
                        {usersIn.users.map((user, i) => {
                            return <div className='flex justify-between w-full'>
                                <div className='font-bold text-sm'>
                                    {proper(user.user_fname)} {proper(user.user_initial)} {proper(user.user_lname)}
                                </div>
                                <div className='font-bold text-xs'>
                                    {user.user_email}
                                </div>
                            </div>
                        })}
                    </div>
                }
            </div>
            <div className='flex p-4 md:p-0 md:pl-4 flex-col w-full md:w-3/4'>
                {accDetails && accDetails.companyData &&
                    accDetails.companyData.map((company, i) => {
                        return(<>
                            <div className='border bg-white drop-shadow-sm border-stone-300 rounded flex flex-col p-4 mb-4'>
                                <div className='font-bold text-xl mb-2 flex justify-between'>
                                    {proper(company.company_name)}
                                    <Button 
                                        variant='contained'
                                        onClick={() => {
                                            setEdittedCompany({
                                                company_name: company.company_name,
                                                company_street: company.company_street,
                                                company_city: company.company_city,
                                                company_state: company.company_state,
                                                company_zip: company.company_zip,
                                                company_phone: company.company_phone,
                                                company_carg_preference: company.company_carg_preference,
                                                company_id: company.company_id
                                            })
                                        }}
                                    >Edit</Button>
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
                                                <TableCell sx={{
                                                    fontWeight: 'bold',
                                                }}>
                                                    Default CarGurus Number
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
                                                <TableCell>
                                                    {company.company_carg_preference ? proper(company.company_carg_preference) : 'N/A'}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <div className='flex items-around w-full bg-stone-100 mt-2 p-2 shadow-inner'>
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
                                    </div> */}
                                <br />
                                <div className='flex justify-around'>
                                    <div className='w-full'>
                                        <TextField 
                                            fullWidth
                                            label='Add New User'
                                            id={'newEmail' + i}
                                        ></TextField>
                                        <FormHelperText>
                                            Enter the email of the new user
                                        </FormHelperText>
                                    </div>
                                    <Button variant='contained' color='primary' style={{ height: 55 }}
                                        onClick={() => {
                                            addCompanyPermission(company.company_id, document.getElementById('newEmail' + i).value)
                                        }}
                                    >
                                        Add User
                                    </Button>
                                    <Button style={{ height: 55, backgroundColor: '#888' }}
                                        variant='contained'
                                        onClick={() => getUsers(company.company_id, company.company_name)}
                                    >View Users In This Company</Button>
                                </div>
                            </div>
                        </>
                        )
                    })
                }
            </div>
        </div>
    )

}
import { OutlinedInput, InputLabel, FormHelperText, Button, FormControl, LinearProgress, Grid, Divider, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { authUserRegister } from '../../utils/api';

export default function Login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ emailValid, setEmailValid ] = useState(true);
    const [ phone, setPhone ] = useState('');
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ initial, setInitial ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(email.length > 0){
            if(!email.includes('@')){
                setEmailValid(false);
            }else if(!email.includes('.')){
                setEmailValid(false);
            }else if(email.split('@')[1].split('.')[0].length < 2){
                setEmailValid(false);
            }else if(email.split('.')[1].length < 2){
                setEmailValid(false);
            }else{
                setEmailValid(true);
            }
    }
    }, [email])

    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <Snackbar 
                open={error !== null}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Alert severity="error" style={{
                    width: '100%',
                    backgroundColor: '#f8d7da',
                }}>
                    {error && (typeof error === 'object' ? error.detail : error)}
                </Alert>
            </Snackbar>
            <div className="border border-stone-300 bg-white drop-shadow-sm p-6 rounded flex flex-col items-center text-xl justify-center relative">
                <div className='font-bold'>
                    Sign Up
                </div>
                <Divider 
                    className='w-full pt-4'
                />
                <div className='w-full flex justify-around items-center mt-8'>
                    <div className='mr-2'>
                        <FormControl required>
                            <InputLabel htmlFor="fname">First</InputLabel>
                            <OutlinedInput
                                id="fname"
                                type="fname"
                                value={fname}
                                inputProps={{ maxLength: 30 }}
                                onChange={(e) => setFname(e.target.value)}
                                style={{ width: '8rem' }}
                            />
                        </FormControl>
                    </div>
                    <div className='mr-2'>
                        <FormControl>
                            <InputLabel htmlFor="initial">Initial</InputLabel>
                            <OutlinedInput
                                id="initial"
                                type="initial"
                                inputProps={{ maxLength: 1 }}
                                value={initial}
                                onChange={(e) => setInitial(e.target.value)}
                                style={{ width: '4rem' }}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl required>
                            <InputLabel htmlFor="lname">Last</InputLabel>
                            <OutlinedInput
                                id="lname"
                                inputProps={{ maxLength: 30 }}
                                type="lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                style={{ width: '8rem' }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='mt-8 w-full flex justify-center'>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <OutlinedInput
                            id="phone"
                            type="number"
                            inputProps={{ maxLength: 10 }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FormHelperText 
                            id="email-helper-text"
                            style={{ color: '#777' }}
                        >
                            Do not include parenthesis or dashes
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className='mt-8 w-full flex justify-center'>
                    <FormControl fullWidth required>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            inputProps={{ maxLength: 40 }}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormHelperText 
                            id="email-helper-text"
                            style={{ color: 'red' }}
                        >
                            {!emailValid && 'Please enter a valid email'}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className='mt-8 w-full flex justify-center'>
                    <FormControl fullWidth required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormHelperText 
                            id="email-helper-text"
                            style={{ color: 'red' }}
                        >
                            {(password && confirmPassword && password !== confirmPassword) && 'Passwords do not match'}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className='mt-8 w-full flex justify-center'>
                    <FormControl fullWidth required>
                        <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirm"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className='mt-8 w-full'>
                    <Button
                        variant={(emailValid && password && fname && lname && confirmPassword === password && initial) ? "contained" : "outlined"}
                        color='primary'
                        disabled={!(emailValid && password && fname && lname && confirmPassword === password && initial)}
                        fullWidth
                        onClick={() => {
                            authUserRegister(
                                email,
                                password,
                                fname,
                                initial,
                                lname,
                                phone,
                                setLoading,
                                setError
                            )
                        }}
                    >
                    {loading ? 
                        <Grid spacing={1} container style={{ height: 30, display: 'flex', alignItems: 'center'}}>
                            <Grid xs item>
                                <LinearProgress  />
                            </Grid>
                        </Grid> :
                        'Sign Up'
                    }
                    </Button>
                </div>
                <div className='mt-4 w-full text-center text-sm'>
                    Already have an account? <a href='/login' className=' text-blue-600'>
                        Log In
                    </a>
                </div>
            </div>
        </div>
    )
}
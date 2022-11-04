import { Input, InputLabel, FormHelperText, Button, FormControl, Divider, LinearProgress, Grid, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { authUserLogin } from '../../utils/api';

export default function Login(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailValid, setEmailValid ] = useState(true);
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
            <div className="border border-stone-200 bg-white drop-shadow-sm p-6 rounded flex flex-col items-center text-xl justify-center relative">
                <div className='font-bold'>
                    Login
                </div>
                <Divider 
                    className='w-full pt-4'
                />
                <div className='mt-8'>
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    if(emailValid && password){
                                    }
                                }
                            }}
                            style={{ width: '20rem' }}
                        />
                        <FormHelperText 
                            id="email-helper-text"
                            style={{ color: 'red' }}
                        >
                            {!emailValid && 'Please enter a valid email'}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className='mt-8'>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '20rem' }}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    if(emailValid && password){
                                    }
                                }
                            }}
                        />
                    </FormControl>
                </div>
                <div className='mt-2 w-full text-sm text-blue-600'>
                    <a href='#'>
                        Forgot Password?
                    </a>
                </div>
                <div className='mt-8 w-full'>
                    <Button
                        variant={(emailValid && password) ? "contained" : "outlined"}
                        color='primary'
                        // disabled={!(emailValid && password)}
                        fullWidth
                        onClick={() => {
                            authUserLogin(setLoading, setError, email, password);
                        }}
                    >
                    {loading ? 
                        <Grid spacing={1} container style={{ height: 30, display: 'flex', alignItems: 'center'}}>
                            <Grid xs item>
                                <LinearProgress  />
                            </Grid>
                        </Grid> :
                        'Login'
                    }
                    </Button>
                </div>
                <div className='mt-4 w-full text-center text-sm'>
                    Don't have an account? <a href='/register' className=' text-blue-600'>
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    )
}
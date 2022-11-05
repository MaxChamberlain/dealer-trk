import axios from 'axios';

export const authUserLogin = async ( setLoading, setError, user_email, user_password ) => {
    setLoading(true);
    try{
        const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/login',
            {
                user_email, 
                user_password
            },
            {
                withCredentials: true
            }
        )
        document.cookie = 'user_id=' + data.user_id + '; max-age=3600000';
        window.location.reload()
        setLoading(false);
    }catch(e){
        setLoading(false);
        console.log(e);
        setError(e.response.data);
    }
}

export const authUserRegister = async (user_email, user_password, user_fname, user_initial, user_lname, user_phone, setLoading, setError) => {
    setLoading(true);
    try{
        const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/register',
            {
                user_email: user_email.toLowerCase(), 
                user_password,
                user_fname: user_fname.toLowerCase(),
                user_initial: user_initial.toLowerCase(),
                user_lname: user_lname.toLowerCase(),
                user_phone
            },
            {
                withCredentials: true
            }
        )
        document.cookie = 'user_id=' + data.user_id + '; max-age=3600000';
        setLoading('Success!');
        window.location.reload()
    }catch(e){
        setLoading(false);
        console.log(e);
        setError(e.response.data);
    }
}

export const getUserDetails = async (setLoading, setError) => {
    console.log('Function loaded')
    const user_id = document.cookie.split('user_id=')[1].split(';')[0];
    try{
        setLoading(true)
        console.log('Contacting server...');
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/auth/user', 
            {
                user_id
            },
            { withCredentials: true }
        )
        setLoading(false);
        return data
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const getCompanyDetails = async (setLoading, setError) => {
    setLoading(true);
    const user_id = document.cookie.split('user_id=')[1].split(';')[0];
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/getone', 
            {
                user_id
            },
            { withCredentials: true }
        )
        setLoading(false);
        return data
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const getDocumentTypes = async (setLoading, setError) => {
    setLoading(true);
    try{
        const { data } = await axios.get(
            import.meta.env.VITE_API_URL + '/document/types', 
            { withCredentials: true }
        )
        setLoading(false);
        return data
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const getDocumentsByCompanyIds = async (company_ids, setLoading, setError) => {
    setLoading(true);
    const user_id = document.cookie.split('user_id=')[1].split(';')[0];
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/getbycompanyids', 
            {
                user_id
            },
            { withCredentials: true }
        )
        setLoading(false);
        return data
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const insertDocument = async (paramsinput, document_type_id, setLoading, setError) => {
    const params = {...paramsinput}
    setLoading(true);
    try{
        const user_id = document.cookie.split('user_id=')[1].split(';')[0];
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/insert', 
            {
                user_id,
                params,
                document_type_id
            },
            { withCredentials: true }
        )
        setLoading(false);
        window.location.reload()
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const addCompany = async (newCompany, setLoading, setError) => {
    setLoading(true);
    const toSend={
        company_name: newCompany.company_name.toLowerCase().trim(),
        company_street: newCompany.company_street.toLowerCase().trim(),
        company_city: newCompany.company_city.toLowerCase().trim(),
        company_state: newCompany.company_state.toLowerCase().trim(),
        company_zip: newCompany.company_zip.replace(/[^0-9]/g, '').trim(),
        company_phone: newCompany.company_phone.replace(/[^0-9]/g, '').trim(),
        user_id: document.cookie.split('user_id=')[1].split(';')[0]
    }
    console.log(toSend)
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/add', 
            {
                ...toSend
            },
            { withCredentials: true }
        )
        setLoading(false);
        window.location.reload()
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}
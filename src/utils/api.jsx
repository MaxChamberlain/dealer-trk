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
    return [
        {
            document_type_name: 'Trip Pad'
        }
    ]
}

export const getDocumentsByCompanyIds = async (setLoading, setError, startDate, endDate) => {
    setLoading(true);
    const user_id = document.cookie.split('user_id=')[1].split(';')[0];
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/getbycompanyids', 
            {
                user_id,
                startDate,
                endDate,
            },
            { withCredentials: true }
        )
        setLoading(false);
        console.log('data', data)
        return data
    }catch(e){
        setLoading(false);
        setError(e.response.data);
        console.log(e);
    }
}

export const insertDocument = async (paramsinput, document_type_id, setLoading, setError) => {
    setLoading(true);
    try{
        const params = {
            metadata: {
                created_by_user_id: document.cookie.split('user_id=')[1].split(';')[0],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            data: {
                vehicle:{
                    v_days: paramsinput.body?.v_days,
                    v_final_carg_h: paramsinput.body?.v_final_carg_h,
                    v_final_mmr: paramsinput.body?.v_final_mmr,
                    v_imv: paramsinput.body?.v_imv,
                    v_initial_carg_h: paramsinput.body?.v_initial_carg_h,
                    v_initial_mmr: paramsinput.body?.v_initial_mmr,
                    v_is_certified: paramsinput.body?.v_is_certified || false,
                    v_make: paramsinput.body?.v_make,
                    v_margin: paramsinput.body?.v_margin,
                    v_market_percent: paramsinput.body?.v_market_percent,
                    v_model: paramsinput.body?.v_model,
                    v_package: paramsinput.body?.v_package,
                    v_sell_price: paramsinput.body?.v_sell_price,
                    v_start_price: paramsinput.body?.v_start_price,
                    v_stock_no: paramsinput.body?.v_stock_no,
                    v_vin_no: paramsinput.body?.v_vin_no,
                    v_year: paramsinput.body?.v_year,
                    v_is_trade : paramsinput.body?.v_is_trade || false,
                    v_source: paramsinput.body?.v_source,
                    v_final_carg_h_options: paramsinput.body?.v_final_carg_h_options,
                },
                trade: {
                    v_trade_acv: paramsinput.body?.v_trade_acv,
                    v_trade_end_acv: paramsinput.body?.v_trade_end_acv,
                    v_trade_make: paramsinput.body?.v_trade_make,
                    v_trade_miles: paramsinput.body?.v_trade_miles,
                    v_trade_model: paramsinput.body?.v_trade_model,
                    v_trade_pkg: paramsinput.body?.v_trade_pkg,
                    v_trade_year: paramsinput.body?.v_trade_year,
                },
            },
            company_id: paramsinput.head.company_id,
            document_type: 'Trip Pad',  
        }
        await axios.post(
            import.meta.env.VITE_API_URL + '/document/insert', 
            {
                params,
            },
            { withCredentials: true }
        )
        setLoading(false);
        return true;
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
        company_street: newCompany.company_street ? newCompany.company_street.toLowerCase().trim() : null,
        company_city: newCompany.company_city ? newCompany.company_city.toLowerCase().trim() : null,
        company_state: newCompany.company_state ? newCompany.company_state.toLowerCase().trim() : null,
        company_zip: newCompany.company_zip ? newCompany.company_zip.replace(/[^0-9]/g, '').trim() : null,
        company_phone: newCompany.company_phone ? newCompany.company_phone.replace(/[^0-9]/g, '').trim() : null,
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

export const addCompanyPermission = async (company_id, user_email) => {
    const user_id = document.cookie.split('user_id=')[1].split(';')[0];
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/addpermission', 
            {
                company_id,
                user_email: user_email.toLowerCase().trim(),
                user_id
            },
            { withCredentials: true }
        )
        window.location.reload()
    }catch(e){
        console.log(e);
    }
}

export const addDocumentNotes = async (document_id, notes) => {
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/addnotes', 
            {
                document_id,
                notes
            },
            { withCredentials: true }
        )
        alert('Notes added successfully')
        return data
    }catch(e){

        console.log(e);
    }
}
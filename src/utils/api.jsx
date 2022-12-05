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
    try{
        setLoading(true)
        console.log('Contacting server...');
        const { data } = await axios.get(
            import.meta.env.VITE_API_URL + '/auth/user', 
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
    try{
        const { data } = await axios.get(
            import.meta.env.VITE_API_URL + '/company/getone', 
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
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/getbycompanyids', 
            {
                startDate,
                endDate,
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

export const getDocumentsByCompanyId = async (setLoading, setError, company_id, startDate, endDate ) => {
    setLoading(true);
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/getbycompanyid', 
            {
                startDate,
                endDate,
                company_id
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
    setLoading(true);
    try{
        const params = {
            metadata: {
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
                    v_acv: paramsinput.body?.v_acv,
                    v_final_acv: paramsinput.body?.v_final_acv,
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
            notes: paramsinput.body?.v_notes,
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
        company_carg_preference: newCompany.company_carg_preference,
        company_working_days: newCompany?.company_working_days || ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    }
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
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/addpermission', 
            {
                company_id,
                user_email: user_email.toLowerCase().trim(),
            },
            { withCredentials: true }
        )
        alert('Permission added for ' + user_email)
    }catch(e){
        alert(e.response.status + ' ' + e.response.statusText + ' ' + JSON.stringify(e.response.data));
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

export const updateCompany = async (newCompany, setLoading, setError) => {
    setLoading(true);
    const toSend={
        company_name: newCompany.company_name.toLowerCase().trim(),
        company_street: newCompany.company_street ? newCompany.company_street.toLowerCase().trim() : null,
        company_city: newCompany.company_city ? newCompany.company_city.toLowerCase().trim() : null,
        company_state: newCompany.company_state ? newCompany.company_state.toLowerCase().trim() : null,
        company_zip: newCompany.company_zip ? newCompany.company_zip.replace(/[^0-9]/g, '').trim() : null,
        company_phone: newCompany.company_phone ? newCompany.company_phone.replace(/[^0-9]/g, '').trim() : null,
        company_carg_preference: newCompany.company_carg_preference,
        company_working_days: newCompany?.company_working_days || ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    }
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/update', 
            {
                ...toSend,
                company_id: newCompany.company_id
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

export const getUsersInCompany = async(company_id) => {
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/company/getusers', 
            {
                company_id
            },
            { withCredentials: true }
        )
        return data
    }catch(e){
        console.log(e);
    }
}

export const logout = async () => {
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/auth/logout', 
            {},
            { withCredentials: true }
        )
        window.location.reload()
    }catch(e){
        console.log(e);
    }
}

export const changeSource = async (document_id, params) => {
    try{
        const { data } = await axios.post(
            import.meta.env.VITE_API_URL + '/document/change', 
            {
                document_id,
                params
            },
            { withCredentials: true }
        )
        alert('Source changed successfully')
        return data
    }catch(e){
        console.log(e);
    }
}
import { getCompanyDetails, getDocumentsByCompanyId } from '../../../utils/api';
import { structureDocs } from './parseData';

export async function fetchCompanies(setDocs, setCompanies, setLoading, setError) {
    const selected_company = document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1];
    const response = await getCompanyDetails((setLoading, setError))
    setCompanies(response)
    if(!selected_company){
        document.cookie = `selected_company=${response[0].company_id}`
    }

    let firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    let lastDayOfMonth = new Date();
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    getDocumentsByCompanyId(setLoading, setError, selected_company, firstDayOfMonth, lastDayOfMonth).then((response) => {
        let parsed = structureDocs(response)
        setDocs(parsed)
    })
}
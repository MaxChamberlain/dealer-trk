import { useState, useEffect } from 'react';
import { getCompanyDetails, getDocumentTypes, getDocumentsByCompanyIds } from '../../../utils/api';

export const useDocs = (startDate, endDate, setLoading, setError) => {
    const [ companyDetails, setCompanyDetails ] = useState(null);
    const [ documentTypes, setDocumentTypes ] = useState(null);
    const [ documents, setDocuments ] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const init = async () => {
            setTimeout(() => {
                getCompanyDetails(setLoading, setError).then((res) => {
                    setCompanyDetails(res);
                    getDocumentsByCompanyIds(setLoading, setError, urlParams.get('startDate'), urlParams.get('endDate')).then((e) => {
                        setDocuments(e);
                    })
                })
            }, 100)
        }
        init()
        getDocumentsByCompanyIds(setLoading, setError, startDate, endDate).then((e) => {
            setDocuments(e);
        })
        getDocumentTypes(setLoading, setError).then((res) => {
            setDocumentTypes(res);
        })
    }, [])

    return [ companyDetails, documentTypes, documents, setDocuments ]
}
import { motion } from 'framer-motion';
import { getCompanyDetails } from '../../utils/api';
import { useEffect, useState } from 'react';
import Company from './components/Company';
import { proper } from '../../utils/textDisplay';

export default function Home(){
    const [companyDetails, setCompanyDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const selectedCompany = document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1];

    useEffect(() => {
        if(selectedCompany){
            getCompanyDetails(setLoading, setError).then((data) => {
                setCompanyDetails(data.find(e => e.company_id === selectedCompany))
            });
        }
    }, []);
    
    return(
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.1 }}
            className='pt-6'
        >
            {selectedCompany ? <>
                <div className='w-[98%] mx-auto p-2 bg-white rounded shadow-md text-2xl font-bold text-center'>
                    Current Overview for {proper(companyDetails?.company_name || '')}
                </div>
                <Company
                    key={companyDetails.company_id}
                    company={companyDetails}
                />
            </> :
            <div className='w-[98%] mx-auto p-2 bg-white rounded shadow-md text-2xl font-bold text-center'>
            No Company Selected
            </div>
            }
        </motion.div>
    )
}
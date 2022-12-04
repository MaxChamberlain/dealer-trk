import { motion } from 'framer-motion';
import { getCompanyDetails } from '../../utils/api';
import { useEffect, useState } from 'react';
import Company from './components/Company';

export default function Home(){
    const [companyDetails, setCompanyDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getCompanyDetails(setLoading, setError).then((data) => {
            setCompanyDetails(data.sort((a, b) => a.company_name.localeCompare(b.company_name)));
        });
    }, []);
    
    return(
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.1 }}
            className='pt-6'
        >
            <div className='w-[98%] mx-auto p-2 bg-white rounded shadow-md text-2xl font-bold text-center'>
                Current Overview
            </div>
            {companyDetails.map((company) => {
                return(
                    <Company
                        key={company.id}
                        company={company}
                    />
                )
            })}
        </motion.div>
    )
}
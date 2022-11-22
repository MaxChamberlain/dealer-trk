import { getCompanyDetails } from '../../utils/api';
import { useState, useEffect } from 'react';
import { proper } from '../../utils/textDisplay';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Summary(){
    const [ companies, setCompanies ] = useState(null);

    useEffect(() => {
        getCompanyDetails(() => {}, () => {}).then((res) => {
            setCompanies(res)
        })
    }, [])

    const navigate = useNavigate();

    return(
        <div className="p-6">
            <motion.div className="w-full rounded-lg p-4 text-white text-2xl whitespace-nowrap overflow-hidden" style={{
                background: 'linear-gradient(90deg, hsla(30, 100%, 50%, 1) 0%, hsla(44, 100%, 50%, 1) 100%)',
            }}
                initial={{ width: '0%', x: -100 }}
                animate={{ width: '100%', x: 0 }}
                exit={{ width: '0%', x: -100 }}
            >
                View Your Summary
            </motion.div>
            <motion.div className='mt-6 text-black'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {companies && companies.map((company) => {
                    return(
                        <div className="w-full rounded-lg p-6 text-2xl bg-white shadow-lg grid grid-cols-6 cursor-pointer hover:bg-stone-200"
                            onClick={() => navigate(`/summary/${company.company_id}`)}
                        >
                            <span>{proper(company?.company_name || 'No Company Name')}</span>
                            <span>{proper(company?.company_zpi || 'No Company ZIP')}</span>
                            <span>{proper(company?.company_carg_preference || 'No CarGurus Preference')}</span>
                            <div></div>
                            <div></div>
                            <div>GO</div>
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}
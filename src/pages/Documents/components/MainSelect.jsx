import { Box, Tabs, Tab, Select, MenuItem, LinearProgress } from '@mui/material';
import { useEffect } from 'react';

export default function MainSelect({ filter, setFilter, tab, setTab, companyDetails, loading, documentTypes, setSelComp }){
    useEffect(() => {
        if(document.cookie.split('; ').find(x => x.split('=')[0] === 'selected_company')){
            setFilter(document.cookie.split('; ').find(x => x.split('=')[0] === 'selected_company').split('=')[1])
        }
    }, [])
    return(
        <Box sx={{ width: '100%', bgcolor: '#fff'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                <Tabs value={tab} onChange={(e, x) => setTab(x)} aria-label="basic tabs example">
                {loading ? <Box sx={{width: '96%', height: '100%', paddingTop: 2.8, paddingLeft: '2%'}}><LinearProgress /></Box> : 
                    documentTypes && [ { document_type_name: 'All Documents' }, ...documentTypes].map((x, i) => {
                        return <Tab label={x.document_type_name} />
                    })
                }
                </Tabs>
                <Select style={{
                    margin: '5px',
                    backgroundColor: '#fff',
                    width: '50%',
                    height: 40
                }} value={filter}
                    onChange={(e) => {
                        setSelComp(companyDetails.find(x => x.company_id === e.target.value))
                        setFilter(e.target.value)
                        document.cookie=`selected_company=${e.target.value}`
                    }}>
                    {loading && <Box sx={{width: '100%', height: '100%', paddingTop: 1.2}}><LinearProgress /></Box>}
                    <MenuItem
                        value='All Companies'
                    >All Companies</MenuItem>
                    {companyDetails && companyDetails.map((company) => {
                        return(
                            <MenuItem 
                                key={company.company_id}
                                value={company.company_id}
                            >
                                {company.company_name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </Box>
        </Box>
    )
}
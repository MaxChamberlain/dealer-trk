import { Button, Menu, MenuItem } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { logout } from '../../utils/api';
import { getCompanyDetails } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';

export default function Header(){
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ companyDetails, setCompanyDetails ] = useState(null);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    useEffect(() => {
        getCompanyDetails(() => {}, () => {}).then((data) => {
            setCompanyDetails(data);
        });
    }, []);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        if(e.target.getAttribute('item-functionality') === 'logout'){
            logout()
        }else if(e.target.getAttribute('item-functionality') === 'myaccount'){
            navigate('/myaccount')
        }
        setAnchorEl(null);
    };
    const storedCompany = document.cookie.split(';').filter((e) => e.includes('selected_company'))[0].split('=')[1];
    const userCanEdit = companyDetails?.find(e => e.company_id === storedCompany)?.authorized_users?.find(e => e.user_id === user?.user_id)?.permLevel === 'admin' || companyDetails?.find(e => e.company_id === storedCompany)?.authorized_users?.find(e => e.user_id === user?.user_id)?.permLevel === 'edit';
    return(
        <div className='absolute top-0 left-0 right-0 p-2 bg-slate-700 flex justify-between' style={{
            height: 48,
        }}>
            <div className='flex items-center'>
                <Button
                    variant='contained'
                    color='primary'
                    style={{ 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '4px 6px'
                    }}
                    onClick={() => navigate('/home')}
                >
                    <Home style={{ color: 'white', width: 25, height: 25 }} />
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    style={{ 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginLeft: 8,
                        padding: '4px 6px'
                    }}
                    onClick={() => {
                        // if there are url params, keep them
                        if(window.location.search){
                            navigate(`/documents${window.location.search}`)
                        }else
                        navigate('/documents')
                    }}
                >
                    <ArticleIcon style={{ color: 'white', width: 20, height: 20 }} />
                    <span style={{ marginLeft: 10 }}>List</span>
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    style={{ 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginLeft: 8,
                        padding: '4px 6px'
                    }}
                    onClick={() => navigate('/summary')}
                >
                    <AlignVerticalBottomIcon style={{ color: 'white', width: 20, height: 20 }} />
                    <span style={{ marginLeft: 5 }}>Summary</span>
                </Button>

                {userCanEdit && <Button
                    variant='contained'
                    color='primary'
                    style={{ 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginLeft: 8,
                        padding: '4px 6px'
                    }}
                    onClick={() => {
                        // if there are url params, keep them
                        navigate('/triptest')
                    }}
                >
                    <ListAltIcon style={{ color: 'white', width: 20, height: 20 }} />
                    <span style={{ marginLeft: 10 }}>Trip Pad</span>
                </Button>}
            </div>

            <Button
                variant='contained'
                color='primary'
                style={{ color: 'white' }}
                onClick={handleClick}
            >
                Menu
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem item-functionality='myaccount' onClick={handleClose}>My Account</MenuItem>
                <MenuItem style={{
                    color: 'red',
                }} item-functionality='logout' onClick={handleClose}>Logout</MenuItem>
            </Menu>

        </div>
    )
}
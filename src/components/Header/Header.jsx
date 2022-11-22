import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';

export default function Header(){
    const [ anchorEl, setAnchorEl ] = useState(null);

    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        if(e.target.getAttribute('item-functionality') === 'logout'){
            document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'dash-auth-tokenjwtgrab=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.reload();
        }else if(e.target.getAttribute('item-functionality') === 'myaccount'){
            navigate('/myaccount')
        }
        setAnchorEl(null);
    };

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
                    onClick={() => navigate('/documents')}
                >
                    <ArticleIcon style={{ color: 'white', width: 20, height: 20 }} />
                    <span style={{ marginLeft: 10 }}>Documents</span>
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
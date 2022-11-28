import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PickSetRange(){
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    return(
        <>
            <Button
                variant="outlined" 
                onClick={() => {
                    // todays date
                    const today = new Date();
                    urlParams.set('start', new Date(today).toISOString().split('T')[0]);
                    urlParams.set('end', new Date(today).toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Today
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    // yesterdays date
                    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
                    urlParams.set('start', new Date(yesterday).toISOString().split('T')[0]);
                    urlParams.set('end', new Date(yesterday).toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Yesterday
            </Button>
            <Button
                variant="outlined" 
                onClick={() => {
                    const start = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
                    const end = new Date(new Date(start).setDate(start.getDate() + 6));
                    urlParams.set('start', start.toISOString().split('T')[0]);
                    urlParams.set('end', end.toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Week To Date
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                    urlParams.set('start', firstDay.toISOString().split('T')[0]);
                    urlParams.set('end', lastDay.toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Month To Date
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    const firstDay = new Date(new Date().getFullYear(), 0, 1);
                    const lastDay = new Date(new Date().getFullYear(), 11, 31);
                    urlParams.set('start', firstDay.toISOString().split('T')[0]);
                    urlParams.set('end', lastDay.toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Year To Date
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    const start = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7));
                    const end = new Date(new Date(start).setDate(start.getDate() + 6));
                    urlParams.set('start', start.toISOString().split('T')[0]);
                    urlParams.set('end', end.toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Last Week
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
                    urlParams.set('start', firstDay.toISOString().split('T')[0]);
                    urlParams.set('end', lastDay.toISOString().split('T')[0]);
                    navigate(`?${urlParams.toString()}`, { replace: true });
                    window.location.reload()
                }}
            >
                Last Month
            </Button>
        </>
    )
}
import axios from 'axios';

export const searchGurusByVin = async (vin, zip, price, setLoading, setError, setVData, setCargData) => {
    try{
        setLoading({
            vehicleDetails: true,
            cargurus: true,
        });
        const data = {}
        axios.get(
            `${import.meta.env.VITE_API_URL}/search/gurusvin/?VIN=${vin}&ZIP=${zip}&PRICE=${price}`
        ).then((res) => {
            if(res.data.error){
                setError(res.data.error);
            }else{
                setCargData(res.data);
            }
            setLoading(was => {
                return {
                    ...was,
                    cargurus: false,
                }
            })
        })
        axios.get(
            `${import.meta.env.VITE_API_URL}/search/nhtsa/?VIN=${vin}&ZIP=${zip}&PRICE=${price}`
        ).then((res) => {
            console.log('res', res.data)
            if(res.data.error){
                setError(res.data.error);
            }else{
                setVData(res.data);
            }
            setLoading(was => {
                return {
                    ...was,
                    vehicleDetails: false,
                }
            })
        })
    }catch(e){
        setLoading(false);
        setError(e.response.data.message);
        console.log(e);
    }
}
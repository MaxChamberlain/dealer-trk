import axios from 'axios';
let controller = null

export const searchGurusByVin = async (vin, zip, price, setLoading, setError, setVData, setCargData) => {
    try{
        setLoading({
            vehicleDetails: true,
            cargurus: true,
        });
        controller = new AbortController();
        const { signal } = controller;
        const data = {}
        axios.get(
            `${import.meta.env.VITE_API_URL}/search/gurusvin/?VIN=${vin}&ZIP=${zip}&PRICE=${price}`
        , { signal }
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

export const cancelSearch = (setLoading) => {
    if(controller){
        controller.abort();
        controller = null;
        setLoading({
            vehicleDetails: false,
            cargurus: false,
        });
    }
}

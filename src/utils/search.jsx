import axios from 'axios';

export const searchGurusByVin = async (vin, zip, price, setLoading, setError, setData) => {
    try{
        setLoading(true);
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/search/gurusvin/?VIN=${vin}&ZIP=${zip}&PRICE=${price}`
        );
        console.log(data)
        setLoading(false);
        setData(data);
    }catch(e){
        setLoading(false);
        setError(e.response.data.message);
        console.log(e);
    }
}
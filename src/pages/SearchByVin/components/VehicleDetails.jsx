import { Divider } from '@mui/material'
import { properNumber } from '../../../utils/textDisplay'

export default function VehicleDetails({ data }){
    const down_arrow = <svg version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" className='w-3 -rotate-90'>
        <path d="M15.7,223.7L484,810.9c7.7,9.7,24.1,9.7,31.9,0l468.4-587.2c5.6-7,7.2-17.5,4.2-26.6c-0.6-1.9-1.3-3.4-1.9-4.5c-3.6-6.6-10.5-10.8-18-10.8H31.3c-7.5,0-14.4,4.1-18,10.8c-0.6,1.1-1.3,2.6-1.9,4.3C8.5,206.2,10.1,216.7,15.7,223.7z"/>
    </svg>
    return(
        <div className='w-full'>
            <div className='text-2xl font-bold'>
                {data.vehicle_name}
            </div>
            <div className='text-stone-700'>
                {data.VIN}
            </div>
            <Divider />
            <div className='flex justify-start items-start mt-12 ml-12'>

            <div className='flex flex-col items-around h-96'>
                <div style={{
                    height: ((1 - (data.overPrice.replace(/\D/g, '') - data.PRICE) / (data.overPrice.replace(/\D/g, '') - data.greatPrice.replace(/\D/g, ''))) > 0 ? (1 - (data.overPrice.replace(/\D/g, '') - data.PRICE) / (data.overPrice.replace(/\D/g, '') - data.greatPrice.replace(/\D/g, ''))) : 0) * 100 + '%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    textAlign: 'center',
                    width: 'fit-content',
                    fontWeight: 'bold',
                }}>
                    <div className='flex flex-col text-center mr-6 mt-6 w-fit-max'>
                        <div>
                            ${properNumber(data.PRICE)}
                        </div>
                        <div>
                            Your Price - {
                                data.PRICE > data.overPrice.replace(/\D/g, '') ? 'Overpriced' :
                                data.PRICE > data.highPrice.replace(/\D/g, '') ? 'High' :
                                data.PRICE > data.fairPrice.replace(/\D/g, '') ? 'Fair' :
                                data.PRICE > data.goodPrice.replace(/\D/g, '') ? 'Good' :
                                'Great'
                            }
                        </div>
                    </div>
                    {down_arrow}
                </div>
                <div style={{
                    height: ((data.overPrice.replace(/\D/g, '') - data.PRICE) / (data.overPrice.replace(/\D/g, '') - data.greatPrice.replace(/\D/g, '')) > 0 ? (data.overPrice.replace(/\D/g, '') - data.PRICE) / (data.overPrice.replace(/\D/g, '') - data.greatPrice.replace(/\D/g, '')) : 0) * 100 + '%',
                }}>
                </div>
            </div>
            
                <div className='flex flex-col items-start h-96 mr-2'>
                    <div className='h-1/5 bg-green-400 w-8 rounded-t'></div>
                    <div className='h-1/5 bg-green-700 w-8'></div>
                    <div className='h-1/5 bg-yellow-500 w-8'></div>
                    <div className='h-1/5 bg-orange-500 w-8'></div>
                    <div className='h-1/5 bg-red-500 w-8 rounded-b'></div>
                </div>
                <div className='flex flex-col items-start justify-around h-96'>
                    <div className='flex w-fit-max text-start'>
                        {data.greatPrice} - Great
                    </div>
                    <div className='flex w-fit-max text-start'>
                        {data.goodPrice} - Good
                    </div>
                    <div className='flex w-fit-max text-start'>
                        {data.fairPrice} - Fair
                    </div>
                    <div className='flex w-fit-max text-start'>
                        {data.highPrice} - High
                    </div>
                    <div className='flex w-fit-max text-start'>
                        {data.overPrice} - Overpriced
                    </div>
                </div>
            </div>
        </div>
    )
}
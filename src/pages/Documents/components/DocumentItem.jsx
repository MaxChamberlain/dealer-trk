import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import { Divider, Button } from '@mui/material';

export default function DocumentItem({ doc }){
    const [ isOpen, setIsOpen ] = useState(false);
    return(
        <div id='document-list-item' className={`z-[9990] w-full bg-white drop-shadow p-4 ${isOpen ? 'my-16' : 'mb-4'}`}>
            <div className="flex justify-between items-center">
                <div>
                    <span className='font-bold text-xl'>
                        {doc.document_vehicle_year} {proper(doc.document_vehicle_make)} {proper(doc.document_vehicle_model)} <span className='font-normal text-gray-700'>- {doc.document_type_name}</span>
                    </span>
                    <br />
                    <span className='text-base text-gray-600'>
                        {doc.document_vehicle_vin}
                    </span>
                </div>
                {isOpen || <div className='flex justify-end mt-8 mb-4 text-gray-400 italic'>
                    {doc.company_name}
                </div>}
                <div className='text-base text-gray-600 flex flex-col items-end'>
                    <i>Created {new Date(doc.document_date_created).toLocaleString('en-US')} </i>
                    <i>Modified {new Date(doc.document_date_modified).toLocaleString('en-US')} </i>
                </div>
            </div>


            {isOpen && <>
                <Divider className='my-4' />
                <div className='mt-2 text-gray-600 italic'>
                    {doc.company_name}
                </div>
                <div className='font-bold text-base mt-6'>General Vehicle Info</div>
                <Divider />
                <div className='grid items-center justify-center px-6 mt-3 grid-cols-5 gap-6'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Customer Name: </span>
                        <span>{proper(doc.cust_fname)} {proper(doc.cust_lname)}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Make: </span>
                        <span>{proper(doc.document_vehicle_make)}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Model: </span>
                        <span>{proper(doc.document_vehicle_model)}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Year: </span>
                        <span>{doc.document_vehicle_year}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Model Number: </span>
                        <span>{doc.document_vehicle_model_number}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Stock Number: </span>
                        <span>{doc.document_vehicle_stock_number}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>VIN Number: </span>
                        <span>{doc.document_vehicle_vin}</span>
                    </div>
                </div>
                <br />
                <div className='flex justify-between'>
                    <div className='mr-2 w-3/5'>
                        <div className='font-bold text-base mt-6'>Trade Details</div>
                        <Divider />
                        <div className='grid items-center justify-center px-6 mt-3 grid-cols-4'>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Traded Vehicle Make: </span>
                            <span> {proper(doc.document_vehicle_trade_make)} </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Traded Vehicle Model: </span>
                            <span>{proper(doc.document_vehicle_trade_model)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Title Trade Date: </span>
                            <span>{ new Date(doc.document_vehicle_trade_title_date).toLocaleDateString('en-US') }</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold'>Vehicle Trade Year: </span>
                            <span>{doc.document_vehicle_trade_year}</span>
                        </div>
                        </div>
                    </div>
                    <div className='ml-2 w-1/4'>
                        <div className='font-bold text-base mt-6'>Financial</div>
                        <Divider />
                        <div className='grid items-center justify-center px-6 mt-3 grid-cols-2'>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Vehicle Price: </span>
                                <span>${properNumber(doc.document_vehicle_price)}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold'>Bank Name: </span>
                                <span>{doc.document_bank_name.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <div className='font-bold text-base mt-6'>Key Dates</div>
                <Divider />
                <div className='grid items-center justify-center px-6 mt-3 grid-cols-5'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Payoff Date: </span>
                        <span>{ new Date(doc.document_vehicle_payoff_date).toLocaleDateString('en-US') }</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Title Sale Date: </span>
                        <span>{ new Date(doc.document_vehicle_sale_title_date).toLocaleDateString('en-US') }</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Title Trade Date: </span>
                        <span>{ new Date(doc.document_vehicle_trade_title_date).toLocaleDateString('en-US') }</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Trade Year: </span>
                        <span>{doc.document_vehicle_trade_year}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Vehicle Funding Date: </span>
                        <span>{new Date(doc.document_vehicle_funding_date).toLocaleDateString('en-US')}</span>
                    </div>
                </div>

            </>}

            {isOpen && <div className='flex justify-end mt-8 mb-4 text-gray-500 italic'>
                {doc.company_name}
            </div>}

            <div 
                className='mt-8 py-2 flex justify-center items-center w-full cursor-pointer border-t border-stone-200 hover:bg-stone-100'
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'HIDE' : 'SHOW'}
            </div>
        </div>
    )
}
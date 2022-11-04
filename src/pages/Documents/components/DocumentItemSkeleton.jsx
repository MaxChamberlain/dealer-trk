import { proper, properNumber } from '../../../utils/textDisplay';
import { useState } from 'react';
import { Divider, Skeleton } from '@mui/material';

export default function DocumentItemSkeleton({ }){
    return(
        <div id='document-list-item' className="w-full bg-white drop-shadow p-4 mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <span className='font-bold text-xl'>
                        <Skeleton variant="rounded" width={300} height={30} />
                    </span>
                    <div className='h-2' />
                    <span className='text-base text-gray-600'>
                        <Skeleton variant="rounded" height={20} />
                    </span>
                </div>
                <div className='text-base text-gray-600 flex flex-col items-end'>
                    <Skeleton variant="rounded" width={300} height={25} />
                    <div className='h-2' />
                    <Skeleton variant="rounded" width={300} height={25} />
                </div>
            </div>

            <div className='flex justify-end mt-8 mb-4 text-gray-500 font-bold'>
                <Skeleton variant="rounded" width={250} height={25} />
            </div>

            <div 
                className='mt-8 py-2 flex justify-center items-center w-full cursor-pointer border-t border-stone-200 hover:bg-stone-100'
            >
                <Skeleton variant="rounded" width={100} height={25} />
            </div>
        </div>
    )
}
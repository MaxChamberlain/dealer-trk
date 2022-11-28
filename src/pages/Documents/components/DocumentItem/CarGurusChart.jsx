import { TableRow, TableCell } from '@mui/material';

export default function CarGurusChart({ index, doc }){
    return(
        <TableRow className={`
            ${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}`}
        >
            <TableCell></TableCell>
            <TableCell colSpan={15}>
                {doc?.vehicle?.v_final_carg_h_options ? <>
                    <div className='flex flex-col w-full p-4'>
                        <div className='flex flex-row w-full justify-between text-md font-bold text-center'>
                            <span>Great <br /> {doc.vehicle.v_final_carg_h_options?.greatPrice}</span>
                            <span>Good <br /> {doc.vehicle.v_final_carg_h_options?.goodPrice}</span>
                            <span>Fair <br /> {doc.vehicle.v_final_carg_h_options?.fairPrice}</span>
                            <span>High <br /> {doc.vehicle.v_final_carg_h_options?.highPrice}</span>
                            <span>Over <br /> {doc.vehicle.v_final_carg_h_options?.overPrice}</span>
                        </div>
                        <div className='w-full h-3 mt-6 relative' style={{
                            background: 'linear-gradient(90deg, rgba(0,163,50,1) 0%, rgba(255,160,0,1) 71%, rgba(255,0,0,1) 100%)',
                        }}>
                            <div className='absolute top-0 left-0 h-full'
                                style={{
                                    marginLeft: `${(doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.overPrice ? 1 :
                                                    doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.highPrice ? 0.75 :
                                                    doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.fairPrice ? 0.5 :
                                                    doc.vehicle.v_final_carg_h >= doc.vehicle.v_final_carg_h_options?.goodPrice ? 0.25 :
                                                    0
                                    ) * 100}%`
                                }}
                            >
                                <div className='relative'>
                                    <div className='absolute -bottom-3 right-0 w-6 h-6'>
                                        <svg>
                                            <path d="M 0 0 L 10 10 L 18 0 Z" fill="#1776D1" />
                                        </svg>
                                    </div>
                                    <div className='absolute top-3 right-0 w-6 h-6'>
                                        <svg>
                                            <path d="M 0 10L18 10L10 0Z" fill="#1776D1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> :
                    <span className='italic'>No CarGurus Information Present</span>
                }
            </TableCell>
        </TableRow>
    )
}
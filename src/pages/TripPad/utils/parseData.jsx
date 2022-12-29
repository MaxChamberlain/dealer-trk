import { Button, Menu, MenuItem } from '@mui/material';
import { searchGurusByVin, customUpdateCargurus, customUpdateVehicle } from '../../../utils/search';

export const structureDocs = (input) => {

    return input.map(data => {
        return {
            ...data.data?.vehicle,
            ...data.data?.trade,
            v_is_certified: data.data?.vehicle?.v_is_certified ? 'Y' : 'N',
            t_vehicle: data.data?.trade?.t_vehicle ? `${data.data?.trade?.t_vehicle}` : `${data.data?.trade?.v_trade_year || ''} ${data.data?.trade?.v_trade_make || ''} ${data.data?.trade?.v_trade_model || ''} ${data.data?.trade?.v_trade_package || ''}`,
            v_vehicle: data.data?.vehicle?.v_vehicle ? `${data.data?.vehicle?.v_vehicle}` : `${data.data?.vehicle?.v_year || ''} ${data.data?.vehicle?.v_make || ''} ${data.data?.vehicle?.v_model || ''} ${data.data?.vehicle?.v_package || ''}`,
            v_market_percent: data.data?.vehicle?.v_market_percent || '0',
            v_sell_price: data.data?.vehicle?.v_sell_price || '0',
            v_start_price: data.data?.vehicle?.v_start_price || '0',
            v_final_carg_h: data.data?.vehicle?.v_final_carg_h || '0',
            v_initial_carg_h: data.data?.vehicle?.v_initial_carg_h || '0',
            v_final_mmr: data.data?.vehicle?.v_final_mmr || '0',
            v_initial_mmr: data.data?.vehicle?.v_initial_mmr || '0',
            v_source: data.data?.vehicle?.v_source || '',
            v_days: data.data?.vehicle?.v_days || '0',
            v_margin: data.data?.vehicle?.v_margin || '0',
            v_vin_no: data.data?.vehicle?.v_vin_no || '',
            v_stock_no: data.data?.vehicle?.v_stock_no || '',
            v_acv: data.data?.vehicle?.v_acv || '0',
            t_vin_no: data.data?.trade?.t_vin_no || '',
            v_sales_mgr: data.data?.v_sales_mgr || '',
            v_customer: data.data?.v_customer || '',
            v_miles: data.data?.vehicle?.v_miles || '0',
            rollback: data?.rollback || false,
            v_is_trade: data.data?.vehicle?.v_is_trade ? true : false,
            created_at: new Date(data.metadata.created_at).toLocaleDateString('en-US'),
            document_id: data.document_id,
            notes: data.notes || '',
        }
    })
}

export const getColumns = (companies, setLoading, setError, setDocs, openMenu, setOpenMenu) => [
    { field: 'date', headerName: "Date", width: 100, editable: true },
    { field: 'v_sales_mgr', headerName: "Sales Manager", width: 200, editable: true },
    { field: 'v_customer', headerName: "Customer", width: 200, editable: true },
    { field: 'v_vehicle', headerName: "Vehicle", width: 300, editable: true },
    { field: 'v_stock_no', headerName: "Stock NO.", width: 100, editable: true },
    { field: 'v_vin_no', headerName: "VIN", width: 200, editable: true },
    { field: 'v_days', headerName: "Days", width: 60, editable: true },
    { field: 'v_sell_price', headerName: "Sell Price", width: 100, editable: true },
    { field: 'v_is_certified', headerName: "CERT", width: 60, editable: true },
    { field: 'v_trade', headerName: "Trade", width: 300, editable: true },
    { field: 't_vin_no', headerName: "Trade VIN", width: 100, editable: true },
    { field: 'v_miles', headerName: "Miles", width: 100, editable: true },
    { field: 'v_acv', headerName: "ACV", width: 100, editable: true },
    { field: 'v_margin', headerName: "Gross", width: 80, editable: true },
    { field: 'v_source', headerName: "Source", width: 200, editable: true },
    { field: 'v_initial_mmr', headerName: "In MMR", width: 100, editable: true },
    { field: 'v_final_mmr', headerName: "Out MMR", width: 100, editable: true },
    { field: 'v_initial_carg_h', headerName: "In CarGurus", width: 100, editable: true },
    { field: 'v_final_carg_h', headerName: "Out CarGurus", width: 120, editable: true },
    { field: 'v_start_price', headerName: "Start Price", width: 100, editable: true },
    { field: 'v_market_percent', headerName: "Market %", width: 90, editable: true },
    { field: 'notes', headerName: "Notes", width: 600, editable: true },
    // {
    //     field: "action",
    //     headerName: "Update Dynamic Values",
    //     sortable: false,
    //     width: 200,
    //     renderCell: (params) => {
    //         const setData = (data) => {
    //             if(data){
    //                 setDocs(was => was.map(el => el.document_id === params.id ? {...el, v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`} : el));
    //                 customUpdateVehicle({v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`, document_id: params.id})
    //             }
    //         }

    //         const setCargurus = (data) => {
    //             setDocs(was => was.map(el => el.document_id === params.id ? {...el,
    //                 v_final_carg_h: (data[companies?.find(e => {
    //                     return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
    //                 })?.company_carg_preference || 'highPrice'] || '').replace(/[^0-9]/g, ''),
    //                 v_imv: data?.IMV || '',
    //             } : el));
    //             customUpdateCargurus({
    //                 v_final_carg_h: (data[companies?.find(e => {
    //                     return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
    //                 })?.company_carg_preference || 'highPrice'] || '').replace(/[^0-9]/g, ''),
    //                 v_imv: data?.IMV || '',
    //                 v_final_carg_h_options: {
    //                     greatPrice: data?.greatPrice || '',
    //                     goodPrice: data?.goodPrice || '',
    //                     fairPrice: data?.fairPrice || '',
    //                     highPrice: data?.highPrice || '',
    //                     overpriced: data?.overPrice || '',
    //                 }, 
    //                 document_id: params.id
    //             })
    //         }

    //       const onClick = async (e) => {
    //         // searchGurusByVin(params.row.v_vin_no, companies?.find(e => {
    //         //     return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
    //         // })?.company_zip || '80525', 0, setLoading, setError, setData, setCargurus)
    //       };
    
    //       return(<div className='relative'>
    //             <Button variant='contained' onClick={() => setOpenMenu(params.id)}>
    //                 Options
    //             </Button>
    //             {openMenu === params.id && <div className='absolute z-[9999] top-0 left-0 bg-white border border-gray-300 rounded-md shadow-md'>
    //                 <div className='p-2'>
    //                 </div>
    //             </div>}
    //         </div>)
    //     }
    //   },
  ];

  export const getRows = (vehicles) => [
    ...vehicles.map((vehicle, idx) => ({
            id: vehicle.document_id, 
            v_stock_no: vehicle.v_stock_no, 
            v_vehicle: vehicle.v_vehicle,
            v_vin_no: vehicle.v_vin_no,
            v_is_certified: vehicle.v_is_certified,
            v_margin: vehicle.v_margin,
            v_days: vehicle.v_days,
            v_source: vehicle.v_source,
            v_initial_mmr: vehicle.v_initial_mmr,
            v_final_mmr: vehicle.v_final_mmr,
            v_initial_carg_h: vehicle.v_initial_carg_h,
            v_final_carg_h: vehicle.v_final_carg_h,
            v_start_price: vehicle.v_start_price,
            v_sell_price: vehicle.v_sell_price,
            v_market_percent: vehicle.v_market_percent,
            v_trade: vehicle.t_vehicle,
            date: vehicle.created_at,
            notes: vehicle.notes,
            v_acv: vehicle.v_acv,
            t_vin_no: vehicle.t_vin_no,
            v_sales_mgr: vehicle.v_sales_mgr,
            v_customer: vehicle.v_customer,
            v_miles: vehicle.v_miles,
            rollback: vehicle.rollback,
    }))
  ];
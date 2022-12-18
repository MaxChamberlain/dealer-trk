import { Button } from '@mui/material';
import { searchGurusByVin, customUpdateCargurus, customUpdateVehicle } from '../../../utils/search';

export const structureDocs = input => {
    return input.map(data => {
        return {
            ...data.data?.vehicle,
            ...data.data?.trade,
            v_is_certified: data.data?.vehicle?.v_is_certified ? 'Y' : 'N',
            t_vehicle: data.data?.trade?.t_vehicle || (data.data?.trade?.v_trade_year ? ((data.data?.trade?.v_trade_year.length === 4 ? data.data?.trade?.v_trade_year : '20' + data.data?.trade?.v_trade_year) || '') + ' ' + (data.data?.trade?.v_trade_make || '') + ' ' + (data.data?.trade?.v_trade_model || '') : ''),
            v_vehicle: data.data?.vehicle?.v_vehicle || '',
            v_market_percent: data.data?.vehicle?.v_market_percent || '',
            v_sell_price: data.data?.vehicle?.v_sell_price || '',
            v_start_price: data.data?.vehicle?.v_start_price || '',
            v_final_carg_h: data.data?.vehicle?.v_final_carg_h || '',
            v_initial_carg_h: data.data?.vehicle?.v_initial_carg_h || '',
            v_final_mmr: data.data?.vehicle?.v_final_mmr || '',
            v_initial_mmr: data.data?.vehicle?.v_initial_mmr || '',
            v_source: data.data?.vehicle?.v_source || '',
            v_days: data.data?.vehicle?.v_days || '',
            v_margin: data.data?.vehicle?.v_margin || '',
            v_vin_no: data.data?.vehicle?.v_vin_no || '',
            v_stock_no: data.data?.vehicle?.v_stock_no || '',
            created_at: new Date(data.metadata.created_at).toLocaleDateString('en-US'),
            document_id: data.document_id,
            notes: data.notes || '',
        }
    })
}

export const getColumns = (companies, setLoading, setError, setDocs) => [
    { field: 'col1', headerName: "Stock NO.", width: 100, editable: true },
    { field: 'col2', headerName: "Vehicle", width: 300, editable: true },
    { field: 'col3', headerName: "VIN", width: 200, editable: true },
    { field: 'col4', headerName: "CERT", width: 60, editable: true },
    { field: 'col5', headerName: "Margin", width: 80, editable: true },
    { field: 'col6', headerName: "Days", width: 60, editable: true },
    { field: 'col7', headerName: "Source", width: 200, editable: true },
    { field: 'col8', headerName: "In MMR", width: 100, editable: true },
    { field: 'col9', headerName: "Out MMR", width: 100, editable: true },
    { field: 'col10', headerName: "In CarGurus", width: 100, editable: true },
    { field: 'col11', headerName: "Out CarGurus", width: 120, editable: true },
    { field: 'col12', headerName: "Start Price", width: 100, editable: true },
    { field: 'col13', headerName: "Sell Price", width: 100, editable: true },
    { field: 'col14', headerName: "Market %", width: 90, editable: true },
    { field: 'col15', headerName: "Trade", width: 300, editable: true },
    { field: 'col16', headerName: "Created At", width: 100, editable: true },
    { field: 'col17', headerName: "Notes", width: 600, editable: true },
    {
        field: "action",
        headerName: "Update Dynamic Values",
        sortable: false,
        width: 200,
        renderCell: (params) => {
            const setData = (data) => {
                if(data){
                    setDocs(was => was.map(el => el.document_id === params.id ? {...el, v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`} : el));
                    customUpdateVehicle({v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`, document_id: params.id})
                }
            }

            const setCargurus = (data) => {
                setDocs(was => was.map(el => el.document_id === params.id ? {...el,
                    v_final_carg_h: (data[companies?.find(e => {
                        return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
                    })?.company_carg_preference || 'highPrice'] || '').replace(/[^0-9]/g, ''),
                    v_imv: data?.IMV || '',
                } : el));
                customUpdateCargurus({
                    v_final_carg_h: (data[companies?.find(e => {
                        return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
                    })?.company_carg_preference || 'highPrice'] || '').replace(/[^0-9]/g, ''),
                    v_imv: data?.IMV || '',
                    v_final_carg_h_options: {
                        greatPrice: data?.greatPrice || '',
                        goodPrice: data?.goodPrice || '',
                        fairPrice: data?.fairPrice || '',
                        highPrice: data?.highPrice || '',
                        overpriced: data?.overPrice || '',
                    }, 
                    document_id: params.id
                })
            }

          const onClick = async (e) => {
            searchGurusByVin(params.row.col3, companies?.find(e => {
                return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
            })?.company_zip || '80525', 0, setLoading, setError, setData, setCargurus)
          };
    
          return <Button variant='contained' disabled={!params.row.col3} onClick={onClick}>Update dynamics</Button>;
        }
      },
  ];

  export const getRows = (vehicles) => [
    ...vehicles.map((vehicle, idx) => ({
            id: vehicle.document_id, 
            col1: vehicle.v_stock_no, 
            col2: vehicle.v_vehicle,
            col3: vehicle.v_vin_no,
            col4: vehicle.v_is_certified,
            col5: vehicle.v_margin,
            col6: vehicle.v_days,
            col7: vehicle.v_source,
            col8: vehicle.v_initial_mmr,
            col9: vehicle.v_final_mmr,
            col10: vehicle.v_initial_carg_h,
            col11: vehicle.v_final_carg_h,
            col12: vehicle.v_start_price,
            col13: vehicle.v_sell_price,
            col14: vehicle.v_market_percent,
            col15: vehicle.t_vehicle,
            col16: vehicle.created_at,
            col17: vehicle.notes,
    }))
  ];
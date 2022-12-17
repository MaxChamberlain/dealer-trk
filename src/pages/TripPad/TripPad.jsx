import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { getCompanyDetails, getDocumentsByCompanyId } from '../../utils/api';
import io from 'socket.io-client';

export default function TripPad() {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [docs, setDocs] = useState([])
    const [columns, setColumns] = useState([])
    const [highlights, setHighlights] = useState([])
    const [socket, setSocket] = useState(null);
    const [cellsBeingEdited, setCellsBeingEdited] = useState([]);
    const [color, setColor] = useState('#ff7000');

    const fetchCompanies = async () => {
        const selected_company = document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1];
        if(!selected_company){
            document.cookie = `selected_company=${response[0].company_id}`
        }
        const response = await getCompanyDetails(setLoading, setError)
        setCompanies(response)

        let firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);
        let lastDayOfMonth = new Date();
        lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
        lastDayOfMonth.setDate(0);
        lastDayOfMonth.setHours(23, 59, 59, 999);
        getDocumentsByCompanyId(setLoading, setError, selected_company, firstDayOfMonth, lastDayOfMonth).then((response) => {
            setDocs(response.map(data => {
                return {
                    ...data.data?.vehicle,
                    ...data.data?.trade,
                    v_is_certified: data.data?.vehicle?.v_is_certified ? 'Y' : 'N',
                    t_vehicle: data.data?.trade?.t_vehicle || '',
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
            }))
        })
    }

    useEffect(() => {
        fetchCompanies()
        setColumns(getColumns())
    }, [])

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL + '?company_id=' + document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1])
        setSocket(newSocket); 
        return () => newSocket.close();
    }, [setSocket, document.cookie]);

    useEffect(() => {
        if (socket) {
            socket.on('init', (data) => {
                setCellsBeingEdited(data)
                if(socket.id){
                    setColor(randomHSL(socket.id))
                }
            })
            socket.on('startEditing', (data, color) => {
                setCellsBeingEdited(data);
            });
            socket.on('stopEditing', (data) => {
                setCellsBeingEdited(data);
            });
            socket.on('cellChangeCommit', (data) => {
                setDocs(was => was.map(el => el.document_id === data.document_id ? data : el));
            })
        }
        }, [socket]);
    const handleColumnResize = (ci, width) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = { ...resizedColumn, width };
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }
      const getColumns = () => [
        { field: 'col1', headerName: "Stock NO.", width: 100, editable: true },
        { field: 'col2', headerName: "Vehicle", width: 200, editable: true },
        { field: 'col3', headerName: "VIN", width: 200, editable: true },
        { field: 'col4', headerName: "CERT", width: 60, editable: true },
        { field: 'col5', headerName: "Margin", width: 80, editable: true },
        { field: 'col6', headerName: "Days", width: 60, editable: true },
        { field: 'col7', headerName: "Source", width: 120, editable: true },
        { field: 'col8', headerName: "In MMR", width: 100, editable: true },
        { field: 'col9', headerName: "Out MMR", width: 100, editable: true },
        { field: 'col10', headerName: "In CarGurus", width: 100, editable: true },
        { field: 'col11', headerName: "Out CarGurus", width: 120, editable: true },
        { field: 'col12', headerName: "Start Price", width: 100, editable: true },
        { field: 'col13', headerName: "Sell Price", width: 100, editable: true },
        { field: 'col14', headerName: "Market %", width: 90, editable: true },
        { field: 'col15', headerName: "Trade", width: 200, editable: true },
        { field: 'col16', headerName: "Created At", width: 100, editable: true },
        { field: 'col17', headerName: "Notes", width: 600, editable: true },
      ];

      const getRows = (vehicles) => [
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
      const rows = getRows(docs);

    return (<>
        <Box sx={{ height: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Tabs sx={{ display: 'flex', justifyContent: 'center' }}
                value={companies?.findIndex(company => company?.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1])}
                onChange={(event, newValue) => {
                    document.cookie = `selected_company=${companies[newValue].company_id}`
                    fetchCompanies()
                }}
            >
                {companies?.map(company => <Tab label={company?.company_name} key={company.company_id} />)}
            </Tabs>
        </Box>
        <Box sx={{ height: 'calc(100vh - 6rem)', width: '100vw', overflow: 'scroll', backgroundColor: '#fff' }}>
            {docs.length > 0 && <DataGrid
                columns={columns}
                rows={rows}
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) => {
                    return parseInt(params.indexRelativeToCurrentPage) % 2 === 0 ? 'bg-stone-100' : 'bg-white'
                }}
                getCellClassName={(params) => {
                    return cellsBeingEdited?.find(cell => cell.id === params.id && cell.field === params.field) ? 'outline outline-[#ffb800]' : ''
                }}
                onCellEditStart={handleStartEdit}
                onCellEditStop={handleStopEdit}
                processRowUpdate={handleCellUpdate}
                onProcessRowUpdateError={(error) => console.log('onProcessRowUpdateError', error)}
            />}
        </Box>
    </>);

    function handleStartEdit(params) {
        console.log(color)
        socket.emit('startEditing', params, color);
    }
    function handleStopEdit(params) {
        socket.emit('stopEditing', params);
    }
    function handleCellUpdate(params, old) {
        socket.emit('cellChangeCommit', {params, old});
        return params;
    }
}

function randomHSL(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    const s = 50 + Math.abs(hash % 20);
    const l = 50 + Math.abs(hash % 20);
    console.log(`hsl(${h}, ${s}%, ${l}%)`)
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
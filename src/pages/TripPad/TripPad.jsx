import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab, Button, Snackbar, Alert, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { getCompanyDetails, getDocumentsByCompanyId } from '../../utils/api';
import io from 'socket.io-client';
import { searchGurusByVin, customUpdateCargurus, customUpdateVehicle, cancelSearch } from '../../utils/search';
import { UserContext } from '../../contexts/UserContext'

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
    const [blank, setBlank] = useState([]);
    const [contextMenu, setContextMenu] = useState(null)
    const [selectedRow, setSelectedRow] = useState();
    const { user } = useContext(UserContext)

    const fetchCompanies = async () => {
        const selected_company = document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1];
        const response = await getCompanyDetails(setLoading, setError)
        setCompanies(response)
        if(!selected_company){
            document.cookie = `selected_company=${response[0].company_id}`
        }

        let firstDayOfMonth = new Date();
        firstDayOfMonth.setDate(1);
        firstDayOfMonth.setHours(0, 0, 0, 0);
        let lastDayOfMonth = new Date();
        lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
        lastDayOfMonth.setDate(0);
        lastDayOfMonth.setHours(23, 59, 59, 999);
        getDocumentsByCompanyId(setLoading, setError, selected_company, firstDayOfMonth, lastDayOfMonth).then((response) => {
            setDocs(() => response.map(data => {
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
            }))
        })
    }

    useEffect(() => {
        fetchCompanies()
        setColumns(getColumns())

        let blankObject = {
            v_is_certified: '',
            t_vehicle: '',
            v_vehicle: '',
            v_market_percent: '',
            v_sell_price: '',
            v_start_price: '',
            v_final_carg_h: '',
            v_initial_carg_h: '',
            v_final_mmr: '',
            v_initial_mmr: '',
            v_source: '',
            v_days: '',
            v_margin: '',
            v_vin_no: '',
            v_stock_no: '',
            document_id: '',
        }
        let arrOfBlankObjects = []
        for (let i = 0; i < 10; i++) {
            arrOfBlankObjects.push({...blankObject, id: i})
        }
        setBlank(arrOfBlankObjects)
    }, [])
    
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL + '?company_id=' + document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1])
        setSocket(newSocket); 
        return () => {
            newSocket.emit('stopEditing', null, user);
            newSocket.close();
        };
    }, [setSocket, document.cookie]);

    useEffect(() => {
        if (socket) {
            socket.on('init', (data) => {
                setCellsBeingEdited(data)
            })
            socket.on('startEditing', (data, color) => {
                setCellsBeingEdited(data);
            });
            socket.on('stopEditing', (data) => {
                setCellsBeingEdited(data);
            });
            socket.on('cellChangeCommit', (data, isNew) => {
                if(isNew){
                    setDocs(was => [...was, data])
                } else {
                    setDocs(was => was.map(el => el.document_id === data.document_id ? data : el));
                }
            })
        }
        }, [socket]);

      const getColumns = () => [
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
      
      const handleContextMenu = (event) => {
        event.preventDefault();
        setSelectedRow(Number(event.currentTarget.getAttribute('data-id')));
        setContextMenu(
          contextMenu === null
            ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
            : null,
        );
      };

    return (<>
        <Snackbar open={loading ? true : false} autoHideDuration={6000} onClose={() => {cancelSearch(setLoading); setLoading(false)}}>
            <Alert onClose={() => {cancelSearch(setLoading); setLoading(false)}} severity="info" style={{
                filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))',
                backgroundColor: 'hsl(220, 100%, 60%)',
                color: 'white',
            }}>
                Loading...
            </Alert>
        </Snackbar>
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
            <DataGrid
                columns={columns}
                rows={[...rows, ...blank]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) => {
                    return parseInt(params.indexRelativeToCurrentPage) % 2 === 0 ? 'bg-stone-100' : 'bg-white'
                }}
                getCellClassName={(params) => {
                    let cell = cellsBeingEdited?.find(cell => cell.id === params.id && cell.field === params.field)
                    if(cell){
                        let color = cell.color
                        return `z-[99] outline outline-${color}`
                    }
                    return ''
                }}
                onCellClick={handleStartEdit}
                onCellFocusOut={handleStopEdit}
                showCellRightBorder
                // onCellEditStart={handleStartEdit}
                // onCellEditStop={handleStopEdit}
                processRowUpdate={handleCellUpdate}
                onProcessRowUpdateError={(error) => console.log('onProcessRowUpdateError', error)}
                componentsProps={{
                    row: {
                      onContextMenu: handleContextMenu,
                    },
                  }}
                editMode="cell"
                disableIgnoreModificationsIfProcessingProps
                // isRowSelectable={() => false}
                density="compact"
                onCellKeyDown={(params, event) => {
                    if (event.key === 'c' && (event.ctrlKey || event.metaKey)) {
                        navigator.clipboard.writeText(params.value);
                        event.stopPropagation();
                    }
                    if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
                        event.key = 'Enter'
                    }
                }}
            />
            <Menu
            open={contextMenu !== null}
            onClose={() => setContextMenu(null)}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
            componentsProps={{
              root: {
                onContextMenu: (e) => {
                  e.preventDefault();
                  setContextMenu(null);
                },
              },
            }}
          >
            <MenuItem
                onClick={() => {
                    setContextMenu(null);
                    navigator.clipboard.writeText(rows[selectedRow]?.col3);
                }}
            >
                Copy
            </MenuItem>
            <MenuItem>lowercase</MenuItem>
          </Menu>
        </Box>
    </>);

    function handleStartEdit(params) {
        socket.emit('startEditing', params, user);
    }
    function handleStopEdit(params) {
        socket.emit('stopEditing', params, user);
    }
    function handleCellUpdate(params, old) {
        delete params.col18
        delete old.col18
        socket.emit('cellChangeCommit', {params, old});
        return params;
    }
}


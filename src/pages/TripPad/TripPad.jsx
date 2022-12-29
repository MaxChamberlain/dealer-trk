import * as React from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab, Snackbar, Alert, Menu, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { cancelSearch } from '../../utils/search';
import { UserContext } from '../../contexts/UserContext'
import { getColumns, getRows } from './utils/parseData'
import { fetchCompanies } from './utils/api';
import { useSocket } from './hooks/useSocket';
import { searchGurusByVin, customUpdateCargurus, customUpdateVehicle } from '../../utils/search';

export default function TripPad() {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [docs, setDocs] = useState([])
    const [columns, setColumns] = useState([])
    const [highlights, setHighlights] = useState([])
    const [cellsBeingEdited, setCellsBeingEdited] = useState([]);
    const [color, setColor] = useState('#ff7000');
    const [blank, setBlank] = useState([]);
    const [contextMenu, setContextMenu] = useState(null)
    const [selectedRow, setSelectedRow] = useState(null);
    const [openMenu, setOpenMenu] = useState(null)

    const { user } = useContext(UserContext)
    const [socket, setSocket] = useSocket(setDocs, setCellsBeingEdited)


    useEffect(() => {
        fetchCompanies(setDocs, setCompanies, setLoading, setError)
        setColumns(getColumns(companies, setLoading, setError, setDocs, openMenu, setOpenMenu))

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

      const rows = getRows(docs);
      
      const handleContextMenu = (event) => {
        event.preventDefault();
        setSelectedRow(event.target);
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
                        fetchCompanies(setDocs, setCompanies, setLoading, setError)
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
                    return params.row.rollback ? 'bg-orange-200' : parseInt(params.indexRelativeToCurrentPage) % 2 === 0 ? 'bg-stone-100' : 'bg-white'
                }}
                getCellClassName={(params) => {
                    let cell = cellsBeingEdited?.find(cell => cell.id === params.id && cell.field === params.field)
                    if(cell){
                        let color = cell.color
                        return `z-[99] outline outline-${color}`
                    }
                    if(params.field === 'v_trade' || params.field === 't_vin_no'){
                        let cell = docs?.find(doc => doc.document_id === params.id)
                        if(cell && !cell.v_is_trade){
                            return 'bg-zinc-200'
                        }
                    }
                    return ''
                }}
                onCellClick={handleStartEdit}
                onCellFocusOut={handleStopEdit}
                showCellRightBorder
                onCellEditStart={handleStartEdit}
                onCellEditStop={handleStopEdit}
                processRowUpdate={handleCellUpdate}
                onProcessRowUpdateError={(error) => console.log('onProcessRowUpdateError', error)}
                componentsProps={{
                    cell: {
                      onContextMenu: handleContextMenu,
                    },
                }}
                editMode="cell"
                disableIgnoreModificationsIfProcessingProps
                density="compact"
                onCellKeyDown={(params, event) => {
                    if (event.key === 'c' && (event.ctrlKey || event.metaKey)) {
                        navigator.clipboard.writeText(params.value);
                        event.stopPropagation();
                    }
                    if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
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
                    if(selectedRow?.innerText){
                        navigator.clipboard.writeText(selectedRow.innerText);
                    }
                }}
            >
                Copy
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setContextMenu(null);
                    selectedRow.dispatchEvent(new Event('dblclick', { bubbles: true }))
                    setTimeout(() => {
                        document.execCommand('selectAll', false, null);
                        navigator.clipboard.readText().then(text =>
                            document.execCommand('insertText', false, text)
                        )
                    }, 100)
                    
                }}
            >
                Paste
            </MenuItem>
            <MenuItem
                onClick={(e) => {
                    setContextMenu(null);
                    let row = (selectedRow.parentNode.parentNode.getAttribute('data-id'))
                    let doc = docs.find(doc => doc.document_id === row)

                    const setData = (data) => {
                        if(data){
                            setDocs(was => was.map(el => el.document_id === doc.document_id ? {...el, v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`} : el));
                            customUpdateVehicle({v_vehicle: `${data?.year} ${data?.make} ${data?.model} ${data?.trim_level}`, document_id: doc.document_id})
                        }
                    }
    
                    const setCargurus = (data) => {
                        setDocs(was => was.map(el => el.document_id === doc.document_id ? {...el,
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
                            document_id: doc.document_id
                        })
                    }
                    console.log(doc)
                    searchGurusByVin(doc.v_vin_no, companies?.find(e => {
                        return e.company_id === document.cookie.split('; ')?.find((row) => row.startsWith('selected_company='))?.split('=')[1]
                    })?.company_zip || '80525', 0, setLoading, setError, setData, setCargurus)
                    }
                }
            >
                Update Dynamics
            </MenuItem>
            <MenuItem
                onClick={() => {
                    let row = (selectedRow.parentNode.parentNode.getAttribute('data-id'))
                    let doc = docs.find(doc => doc.document_id === row)
                    console.log(doc)
                    if(doc){
                        handleCellUpdate(
                            {
                                ...doc,
                                date: doc.created_at,
                                id: doc.document_id,
                                rollback: !doc.rollback
                            },
                            {
                                ...doc,
                                date: doc.created_at,
                                id: doc.document_id,
                                rollback: doc.rollback
                            },
                        )
                    }
                }}
            >
                <input type='checkbox' checked={docs.find(doc => doc.document_id === selectedRow.parentNode.parentNode.getAttribute('data-id'))?.rollback} /> Rollback?
            </MenuItem>
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
        socket.emit('cellChangeCommit', {params, old});
        return params;
    }
}


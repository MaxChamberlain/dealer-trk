export const initializeSocketListeners = (socket, setDocs, setCellsBeingEdited) => {
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
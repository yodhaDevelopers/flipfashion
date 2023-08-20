import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function SnackbarHandler({ open, message, severity }) {
    const [snackbarOpen, setSnackbarOpen] = useState(open);
    //console.log("SnackbarHandler.js: message: ", message);

    useEffect(() => {
        setSnackbarOpen(open);
    }, [open]);


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);

    };
    return (
        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} >
            <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }} autohideduration={2000}>
                {message}
            </Alert>
        </Snackbar>
    )
}


export default SnackbarHandler;
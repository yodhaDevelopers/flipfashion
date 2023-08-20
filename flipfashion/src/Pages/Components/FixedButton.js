import React, { useState } from 'react';
import './FixedButton.css'; // Import the CSS file for styling
import Dialog from './Dialog';
//import io from "socket.io-client";

//const socket = io.connect("http://localhost:3001");



const FixedButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div className="fixed bottom-5 right-5">
            <button className="cursor-pointer" onClick={handleOpenDialog}><img className='h-20 w-15' src="https://img.icons8.com/avantgarde/100/message-bot.png" alt="message-bot" /></button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} />
        </div>
    );
};

export default FixedButton;
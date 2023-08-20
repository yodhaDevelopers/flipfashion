import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';

function Footer() {
    return (
        <>
            <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-blue-700 text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">

                <div className="px-16 py-6 w-full bg-primary-darkBlue hidden sm:flex justify-between items-center text-sm text-white">
                    <img className="object-contain h-12 w-auto" src="/assets/logo.png" alt="FlipFashion" />
                    <p className="text-white-400"> English - EN</p>
                    <span className="text-white-400">India</span>
                    <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <span className="text-yellow-400"><WorkIcon sx={{ fontSize: "20px" }} /></span> Sell On FlipFashion
                    </a>
                    <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <span className="text-yellow-400"><StarsIcon sx={{ fontSize: "20px" }} /></span> Advertise
                    </a>
                    <a href="/" rel="noreferrer" target="_blank" className="flex items-center gap-2">
                        <span className="text-yellow-400"><CardGiftcardIcon sx={{ fontSize: "20px" }} /></span> Gift Cards
                    </a>
                    <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <span className="text-yellow-400"><HelpIcon sx={{ fontSize: "20px" }} /></span> Help Center
                    </a>

                    <span>&copy; {new Date().getFullYear()} flipfashion.com</span>

                </div>

            </footer>

        </>
    )
}

export default Footer;
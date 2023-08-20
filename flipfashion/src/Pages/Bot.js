import React, { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./bot.css";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import SendIcon from '@mui/icons-material/Send';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useStateValue } from '../StateProvider';
import Loading from "./Components/Loading";

var Filter = require('bad-words'),
    filter = new Filter();

function Bot({ onClose }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [downloadLink, setDownloadLink] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [{ basket, orders, history }] = useStateValue();
    const [userInfo, setUserInfo] = useState("");



    const handleReload = () => {
        setIsVisible(false); // Hide the component
        setMessageList([]);
        setTimeout(() => {
            setIsVisible(true); // Show the component after a short delay
        }, 300); // Adjust the delay as needed
    };


    const handleDownload = () => {
        if (downloadLink) {
            const link = document.createElement("a");
            link.href = downloadLink;
            link.download = "generated_image.png";
            link.click();
        }
    };

    const handleBotMessage = (message) => {
        const botMessageData = {
            author: "bot",
            message: message,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };
        setMessageList((list) => [...list, botMessageData]);
    }

    const handleHumanMessage = (message) => {
        //message.toLowerCase();
        const userMessageData = {
            author: "user",
            message: message,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };
        setMessageList((list) => [...list, userMessageData]);
    }



    const gen_image = async (prompt, usingCart) => {
        console.log("Gen Image function called");
        let falconResponse = "";
        try {
            const falcon_response = await fetch('http://93ad-34-34-12-39.ngrok-free.app/get_falcon_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: prompt }),
            });

            if (!falcon_response.ok) {
                throw new Error('Falcon response was not ok');
            }

            falconResponse = await falcon_response.json();
            falconResponse = falconResponse["bot-response"];
            console.log("Falcon response: ", falconResponse);
        }
        catch (error) {
            console.error('Falcon Fetch error:', error);
        }
        //Send another prompt to generate image only if falcon_response was ok
        try {
            const image_response = await fetch('http://93ad-34-34-12-39.ngrok-free.app/get_image', {
                method: 'POST',
            });
            if (!image_response.ok) {
                throw new Error('Image response was not ok');
            }
            const blob = await image_response.blob();
            //const blobUrl = blob.blobUrl;
            const url = URL.createObjectURL(blob);
            setDownloadLink(url);
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;
                const imageMessageData = {
                    author: "bot",
                    message: usingCart ? "Here is your AI Generated Outfit" : `${falconResponse}`,
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                    imageSrc: dataUrl,  // Add image source to message data
                };
                setMessageList((list) => [...list, imageMessageData]);
            }
            reader.readAsDataURL(blob);

        }
        catch (error) {
            console.error('Diffusion Image Fetch error:', error);
        }
    };

    const sendMessage = async () => {
        setIsLoading(true);

        if (filter.isProfane(currentMessage)) {
            let cleanUserMessage = filter.clean(currentMessage)
            handleHumanMessage(cleanUserMessage);
            setCurrentMessage("");
            handleBotMessage("I understand your request, but I cannot respond to inappropriate or offensive content. If you need assistance with other types of examples or content, feel free to ask, and I'd be happy to help!")
        }
        else {
            handleHumanMessage(currentMessage);
            setCurrentMessage("");
            const rasa_response = await fetch('http://localhost:5010/get_intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: currentMessage }),
            });

            let answer = await rasa_response.json();
            console.log(answer);

            const intent = answer.intent;

            if (intent === "user_details") {
                // user_info = currentMessage +". "+user_info+". ";
                setUserInfo((prevUserInfo) => prevUserInfo + currentMessage + ". ");
                let botResponseToUserInfo = ['Okay', 'Tell me more about yourself', 'I understand!', 'Thats Great!!']
                let randomIndex = Math.floor(Math.random() * 4);
                handleBotMessage(botResponseToUserInfo[randomIndex]);
                console.log(userInfo);
            }
            else if (intent === "outfit_generation") {
                //Get response from falcon
                var userInput = currentMessage + userInfo;
                console.log("User Input: ", userInput);
                gen_image(userInput, false);
            }
            else if (intent === 'outfit_generation_cart') {
                let cartItems = new Set();
                let recentSearches = new Set();
                let pastPurchases = new Set();
                basket.forEach(item => {
                    cartItems.add(item.title);
                });
                history.forEach(item => {
                    recentSearches.add(item.title);
                })
                orders.forEach(item => {
                    pastPurchases.add(item.title);
                })

                console.log("Items in Cart :", cartItems);
                console.log("Past purchases :", pastPurchases);
                console.log("Recent Searches :", recentSearches);

                const mergedArray = Array.from(cartItems)
                    .concat(Array.from(recentSearches))
                    .concat(Array.from(pastPurchases));

                const uniqueMergedSet = new Set(mergedArray);
                const finalString = Array.from(uniqueMergedSet).join(', ');
                console.log(finalString);

                if (finalString !== "") {
                    gen_image("Generate an outfit with " + finalString, true);
                }
                else {
                    handleBotMessage("Please add some items to your cart first!");
                }
            }
            else {
                try {
                    const response = await fetch('http://localhost:5000/get_response', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_input: currentMessage }),
                    });

                    answer = await response.json();
                    console.log("DialoGPT response: ", answer);
                    handleBotMessage(answer["bot-response"]);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        setIsLoading(false);
    };




    return (
        <div className={`chat-window ${isVisible ? 'visible' : 'hidden'}`}>

            <span className="cross-icon cursor-pointer" onClick={onClose}>
                <CancelSharpIcon style={{ fontSize: '35px' }} /></span>
            <div className="inner-window">
                <div className="chat-header bg-blue-700">
                    <p>Personal Fashion Designer <SmartToyIcon /></p>
                </div>

                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent, index) => {
                            return (
                                <div
                                    className="message" id={messageContent.author === "user" ? "user" : "bot"} key={index}
                                >
                                    <div>
                                        <div className="message-content" >
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <br />
                                        {messageContent.imageSrc && (

                                            <div id="imageContainer">
                                                <img src={messageContent.imageSrc} alt="Generated Outfit" height={350} width={350} />
                                                <div className="button-container">
                                                    <button onClick={() => window.open(messageContent.imageSrc)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg></button>
                                                    <br />
                                                    <button onClick={handleDownload}><FileDownloadOutlinedIcon /></button>
                                                    <br />
                                                    <button onClick={handleReload}><RestartAltIcon /></button>
                                                </div>
                                                <br />

                                            </div>
                                        )}
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.author === "user" ? "User" : "Assistant"}</p>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </ScrollToBottom>

                </div>
                <div className="chat-footer">

                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Hey..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                        disabled={isLoading}
                        className={
                            isLoading ? "cursor-not-allowed" : "focus:outline-none"
                        }
                    />
                    {isLoading ? (
                        <div className="loading-icon">
                            <Loading />
                        </div>
                    ) : (
                        <button onClick={sendMessage}>
                            <SendIcon />
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Bot;
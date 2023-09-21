import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { deleteSubSubtitle } from '../utils/connect.js'

function DeleteSubSubtitleButton() {
    const [buttonText, setButtonText] = useState('Delete');
    const {
        userId,
        subSubtitles, 
        setSubSubtitles, 
        subSubtitlesIndex, 
        setSubSubtitlesIndex, 
        userSubSubtitles,
        setUserSubSubtitles, 
        setTabIndex,
        chatGPTResponse,
        setChatGPTResponse} = useStateContext();
    let timeoutId;

    const handleButtonClick = () => {
        if(buttonText === 'Delete') {
            setButtonText('Confirm');
            timeoutId = setTimeout(() => {
                setButtonText('Delete');
            }, 3000);
        } else {
            deleteSubSubtitle(userId, subSubtitles[subSubtitlesIndex].id)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });

            const newSubSubtitles = [...subSubtitles];  // make a shallow copy of the array
            newSubSubtitles.splice(subSubtitlesIndex, 1);  // remove the item at the specified index
            setSubSubtitles(newSubSubtitles);  // update the state with the modified array

            const newUserSubSubtitles = [...userSubSubtitles];  // make a shallow copy of the array
            newUserSubSubtitles.splice(subSubtitlesIndex, 1);  // remove the item at the specified index
            setUserSubSubtitles(newUserSubSubtitles);  // update the state with the modified array

            const newChatGPTResponse = [...chatGPTResponse];
            newChatGPTResponse.splice(subSubtitlesIndex, 1);
            setChatGPTResponse(newUserSubSubtitles);

            if (subSubtitlesIndex >= newSubSubtitles.length) {
                setSubSubtitlesIndex(newSubSubtitles.length - 1);
            }
            if(newSubSubtitles.length <= 0) {
                setTabIndex(0);
            }
            setButtonText('Delete');
            clearTimeout(timeoutId);
            // Perform the deletion operation here
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [])

    return (
        <Button style={{width: '6rem'}} variant="contained" onClick={handleButtonClick}>
            {buttonText}
        </Button>
    )
}

export default DeleteSubSubtitleButton
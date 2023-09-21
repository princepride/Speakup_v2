import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useStateContext } from '../contexts/ContextProvider';
import { insertSubSubtitle } from '../utils/connect.js'

function SelectSubtitleButton() {
    const {
        userId,
        isSelectSubtitle, 
        setIsSelectSubtitle,
        subtitle , 
        youtubeId,
        subtitleStartTime, 
        setSubtitleStartTime, 
        subtitleEndTime, 
        setSubtitleEndTime, 
        subSubtitles, 
        setSubSubtitles,
        userSubSubtitles,
        setUserSubSubtitles, 
        setSubSubtitlesIndex,
        chatGPTResponse,
        setChatGPTResponse,
        setTabIndex} = useStateContext();
    
    useEffect(() => {
        if(subSubtitles.length === 1) {
            setSubSubtitlesIndex(0);
        }
    },[subSubtitles])

    const handleClick = () => {
        if(isSelectSubtitle && subtitleStartTime !== -1) {
            let text = ""
            const startTime = subtitleStartTime
            let endTime = 0
            const tempSubtitle = [...subtitle]
            for(let i = 0; i < tempSubtitle.length; i++) {
                if(tempSubtitle[i].startTime >= subtitleStartTime && tempSubtitle[i].startTime <= subtitleEndTime) {
                    text += tempSubtitle[i].text + " "
                }
                if(tempSubtitle[i].startTime === subtitleEndTime) {
                    endTime = tempSubtitle[i].endTime
                }
            }
            insertSubSubtitle(userId, youtubeId, startTime, endTime, text)
            .then(data => {
                setSubSubtitles([...subSubtitles,{"id":data.id, "startTime": data.startTime, "endTime": data.endTime,"text": data.text}])
                setUserSubSubtitles([...userSubSubtitles, []])
                setChatGPTResponse([...chatGPTResponse, []])
                setSubtitleStartTime(-1)
                setSubtitleEndTime(-1)
            })
            .catch(error => {
                console.log(error)
            })
        }
        if(!isSelectSubtitle) {
            setTabIndex(0)
        }
        setIsSelectSubtitle(!isSelectSubtitle);
    };

    return (
        <Button 
            style={{'marginTop': '8px'}} 
            variant="contained"
            color="secondary" 
            onClick={handleClick} 
        >
            {isSelectSubtitle === true ? "confirm" : "select subtitle"}
        </Button>
    )
}

export default SelectSubtitleButton
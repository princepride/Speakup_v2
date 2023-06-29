import React, { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider'
import { Button, TextField, Grid } from "@mui/material";
import styled from "@emotion/styled";
import {stringToSecond} from "../utils/timeConvert.js"
import {downloadYoutube} from "../utils/connect.js"

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;

function SelectorArea() {
    const [url, setUrl] = useState("");
    const { setVideoUrl, 
        setYoutubeId, 
        setSubtitle, 
        setSubSubtitles, 
        setUserSubSubtitles, 
        setChatGPTResponse, 
        setVisible,
        setLoopBody,
        setLoopIndex,
        setSubSubtitlesIndex } = useStateContext();

    const isYoutubeUrl = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
        return youtubeRegex.test(url);
    };

    const handleDownload = () => {
        // 实现下载功能
        if (isYoutubeUrl(url)) {
            setVisible(true);
            setLoopBody(["Downloading","Downloading.","Downloading..","Downloading..."]);
            setLoopIndex(0);
            downloadYoutube(url)
            .then(data => {
                setVisible(false)
                setVideoUrl(data.videoUrl)
                setSubSubtitles(data.subSubtitle)
                setUserSubSubtitles(data.record)
                setChatGPTResponse(data.evaluation)
                setYoutubeId(url.slice(-11))
                const subtitle_text = data.subtitle;
                const subtitleList = [];
                console.log(subtitle_text.split('\n\n'))
                subtitle_text.split('\n\n').filter(item => item.trim() !== '').map((item, index) => {
                    const lines = item.split('\n');
                    const [startTime, endTime] = lines[1].split(' --> ');
                    const text = lines.slice(2).join(' ');
                    subtitleList.push(
                        {
                            "startTime": stringToSecond(startTime),
                            "endTime": stringToSecond(endTime),
                            "text": text
                        }
                    );
                })
                setSubtitle(subtitleList);
                if(data.subSubtitle.length > 0) {
                    setSubSubtitlesIndex(0);
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            alert("Invalid YouTube URL");
        }
    };

    return (
        <StyledContainer maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField
                        fullWidth
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onClick={(e) => e.target.select()}
                        label="YouTube URL"
                        size="small"
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleDownload}>
                        load video
                    </Button>
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

export default SelectorArea
import React, { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider'
import { Button, TextField, Grid } from "@mui/material";
import styled from "@emotion/styled";
import {stringToSecond} from "../utils/timeConvert.js"
import {downloadYoutube} from "../utils/connect.js"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {removeBookmark, addBookmark} from "../utils/connect"

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
    width: 92vw;
    @media screen and (max-width: 1080px) {
        width: 92vw;
    }
`;

function SelectorArea() {
    const [url, setUrl] = useState("");

    const { 
        userId,
        isMainLiked,
        setIsMainLiked,
        youtubeId, 
        setYoutubeId, 
        setSubtitle, 
        setSubSubtitles, 
        setUserSubSubtitles, 
        setChatGPTResponse, 
        setVisible,
        setLoopBody,
        setLoopIndex,
        setSubSubtitlesIndex } = useStateContext();

        const handleHeartClick = () => {
            if(isMainLiked) {
                removeBookmark(userId, youtubeId)
            }
            else {
                addBookmark(userId, youtubeId)
            }
            setIsMainLiked((prevIsLiked) => !prevIsLiked);
        };
        const isYoutubeUrl = (url) => {
            const youtubeRegex = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\//;
            return youtubeRegex.test(url);
        };

    const handleDownload = () => {
        // 实现下载功能
        if (isYoutubeUrl(url)) {
            setVisible(true);
            setLoopBody(["Downloading","Downloading.","Downloading..","Downloading..."]);
            setLoopIndex(0);
            downloadYoutube(userId, url)
            .then(data => {
                setVisible(false)
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
                setIsMainLiked(data.isBookmark);
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
            <Grid container spacing={1}>
                <Grid item xs={9.8}>
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
                <Grid item xs={0.2}>
                    {isMainLiked ? (
                    <FavoriteIcon
                        style={{
                            fontSize: "36px",
                            color: "red",
                            cursor: youtubeId === "" ? "default" : "pointer",
                        }}
                        onClick={youtubeId === "" ? null : handleHeartClick}
                    />
                    ) : (
                        <FavoriteBorderIcon
                        style={{
                            fontSize: "36px",
                            color: "#45CFDD",
                            cursor: youtubeId ===""?"default" : "pointer",
                        }}
                        onClick={youtubeId === "" ? null : handleHeartClick}
                        />
                    )}
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

export default SelectorArea
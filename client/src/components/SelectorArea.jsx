import React, { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider'
import { Button, TextField, Grid } from "@mui/material";
import styled from "@emotion/styled";
import {stringToSecond} from "../utils/timeConvert.js"
import {downloadYoutube} from "../utils/connect.js"
import { selectSubSubtitle } from "../utils/connect.js"

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;

function SelectorArea() {
    const [url, setUrl] = useState("");
    const { setVideoUrl, setYoutubeId, setSubtitle, subtitle, setSubSubtitles, setUserSubSubtitles, setChatGPTResponse, setSubSubtitlesIndex } = useStateContext();

    const isYoutubeUrl = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
        return youtubeRegex.test(url);
    };

    const handleDownload = () => {
        // 实现下载功能
        if (isYoutubeUrl(url)) {
            downloadYoutube(url)
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            alert("Invalid YouTube URL");
        }
    };

    const handleVideoFileChange  = (e) => {
        const file = e.target.files[0];
        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);
    };

    const handleSubtitleFileChange = (e) => {
        const file = e.target.files[0];
        selectSubSubtitle(file.name)
        .then(data=> {
            setSubSubtitles(data.subSubtitle)
            setUserSubSubtitles(data.record)
            setChatGPTResponse(data.evaluation)
            setYoutubeId(file.name.slice(-28,-17))
            if(data.subSubtitle.length > 0) {
                setSubSubtitlesIndex(0);
            }

            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
        const reader = new FileReader();
        reader.onload = (event) => {
        const subtitle = event.target.result;
        const subtitleList = [];
        subtitle.split('\r\n\r\n').filter(item => item.trim() !== '').map((item, index) => {
            const lines = item.split('\r\n');
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
        };
        reader.onerror = (event) => {
        console.error('File could not be read! Code ' + event.target.error.code);
        };
        reader.readAsText(file);
    }

    const handleLoadVideo = () => {
      // 实现浏览功能
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/mp4';
        input.onchange = handleVideoFileChange ;
        input.click();
    };

    const handleLoadSubtitle = () => {
        // 实现浏览功能
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.srt';
          input.onchange = handleSubtitleFileChange;
          input.click();
      };

    return (
        <StyledContainer maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={6} lg={8}>
                    <TextField
                        fullWidth
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onClick={(e) => e.target.select()}
                        label="YouTube URL"
                        size="small"
                    />
                </Grid>
                <Grid item xs={1.8} lg={1.2}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleDownload}>
                        download
                    </Button>
                </Grid>
                <Grid item xs={2.1} lg={1.4}>
                    <Button fullWidth variant="contained" color="secondary" onClick={handleLoadVideo}>
                        load video
                    </Button>
                </Grid>
                <Grid item xs={2.1} lg={1.4}>
                    <Button fullWidth variant="contained" color="secondary" onClick={handleLoadSubtitle}>
                        load subtitle
                    </Button>
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

export default SelectorArea
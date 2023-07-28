import React, {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import { useStateContext } from '../contexts/ContextProvider'
import {stringToSecond} from "../utils/timeConvert.js"
import {removeBookmark, addBookmark, downloadYoutube } from "../utils/connect"
import { useNavigate } from "react-router-dom";

function VideoCard(props) {
    const navigate = useNavigate();
    const { youtube_id, youtube_name, youtube_duration } = props
    const [isLiked, setIsLiked] = useState(true);
    const { setVideoUrl, 
        setYoutubeId, 
        setSubtitle, 
        setSubSubtitles, 
        setUserSubSubtitles, 
        setChatGPTResponse, 
        setVisible,
        setSubSubtitlesIndex } = useStateContext();

    const handleHeartClick = () => {
        if(isLiked) {
            removeBookmark(youtube_id)
        }
        else {
            addBookmark(youtube_id)
        }
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    const navigateToMain = () => {
        downloadYoutube(youtube_id)
        .then(data => {
            setVisible(false)
            console.log(data.videoUrl.replace('http://localhost:8000',process.env.REACT_APP_BACKEND_URL))
            setVideoUrl(data.videoUrl.replace('http://localhost:8000',process.env.REACT_APP_BACKEND_URL))
            setSubSubtitles(data.subSubtitle)
            setUserSubSubtitles(data.record)
            setChatGPTResponse(data.evaluation)
            setYoutubeId(youtube_id)
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

            // 进行页面跳转
            navigate("/");
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={navigateToMain}>
                <CardMedia
                component="img"
                height="140"
                image={"https://i1.ytimg.com/vi/"+youtube_id+"/hqdefault.jpg"}
                alt={youtube_id}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {youtube_name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography variant="body1" color="text.secondary" style={{marginTop:"4px"}}>
                        {youtube_duration}
                    </Typography>
                    {isLiked ? (
                        <FavoriteIcon
                        style={{
                            fontSize: "36px",
                            color: "red",
                            cursor: "pointer",
                        }}
                        onClick={handleHeartClick}
                        />
                        ) : (
                        <FavoriteBorderIcon
                        style={{
                            fontSize: "36px",
                            color: "#45CFDD",
                            cursor: "pointer",
                        }}
                        onClick={handleHeartClick}
                        />
                    )}
                </Box>
            </CardActions>
        </Card>
    );
}

export default VideoCard

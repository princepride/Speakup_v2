import React, {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';

function VideoCard(props) {
    const { youtube_id, youtube_name, youtube_duration } = props
    const [isLiked, setIsLiked] = useState(true);

    const handleHeartClick = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={"https://i1.ytimg.com/vi/"+youtube_id+"/hqdefault.jpg"}
                // image="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
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

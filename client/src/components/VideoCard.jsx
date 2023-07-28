import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
                image={process.env.REACT_APP_BACKEND_URL+"/media/"+youtube_id+".jpg"}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {youtube_name}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography variant="body2" color="text.secondary">
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
            </CardActions>
        </Card>
    );
}

export default VideoCard

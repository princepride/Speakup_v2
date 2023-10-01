import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';
import {Card, CardMedia, CardActionArea} from '@mui/material';
import config_data from '../assets/data/config_data.json';

// const EnlargedCard = styled(Card) `
//     transition: transform 0.2s; 
//     &:hover { transform: scale(1.1); };
// `

const EnlargedCard = styled(Card)`
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.1);
        animation: borderAnimation 2s infinite alternate;
    }

    @keyframes borderAnimation {
        0% {
            border-color: #2e4f8b;
            border-width: 4px;
        }
        33% {
            border-color: #3e589d;
            border-width: 4px;
        }
        66% {
            border-color: #8f619b;
            border-width: 4px;
        }
        100% {
            border-color: #d0718f;
            border-width: 4px;
        }
    }
`

const achievements_info = config_data.achievements_info

function Achievement(props) {
const [currentImage, setCurrentImage] = useState(0);
const [isMouseOver, setIsMouseOver] = useState(false);
const { achievement } = props

useEffect(() => {
    let interval;
    if (isMouseOver) {
        interval = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % achievements_info[achievement].carousel_images.length);
        }, 1000);
    } else {
        clearInterval(interval);
        setCurrentImage(0);
    }

    return () => clearInterval(interval);
}, [isMouseOver]);

return (
        <EnlargedCard sx={{ maxWidth: 345 }} style={{boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", border: "2px solid #ccc",borderRadius: "20px"}}>
            <CardActionArea onMouseOver={() => {setIsMouseOver(true)}} onMouseOut={() => setIsMouseOver(false)}>
                <CardMedia 
                    component="img" 
                    height="180" 
                    image={achievements_info[achievement].auto_play?achievements_info[achievement].carousel_images[currentImage]:isMouseOver?achievements_info[achievement].carousel_images[currentImage]:achievements_info[achievement].static_image} 
                    alt={achievements_info[achievement].zh_title} 
                    title={achievements_info[achievement].zh_title} 
                    />
            </CardActionArea>
        </EnlargedCard>
    )
}

export default Achievement
import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';
import {Card, CardMedia, CardActionArea} from '@mui/material';
import config_data from '../assets/data/config_data.json';

const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

const EnlargedCard = styled(Card) `
    transition: transform 0.2s; 
    &:hover { transform: scale(1.1); };
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
        setCurrentImage(prev => (prev + 1) % achievements_info[achievement].images.length);
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
                    image={achievements_info[achievement].images[currentImage]} 
                    alt={achievements_info[achievement].zh_title} 
                    title={achievements_info[achievement].zh_title} />
            </CardActionArea>
        </EnlargedCard>
    )
}

export default Achievement
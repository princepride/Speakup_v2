import React, { useState, useEffect, createRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import SubtitleButton from './SubtitleButton';
import styled from "@emotion/styled";
import {stringToSecond} from "../utils/timeConvert.js"

const SubtitleStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 69vh;
    overflow-y: auto;
    padding-top: 1rem;
    
    @media screen and (max-width: 1080px) {
        height: 54vh;
    }
`;

function Subtitle() {
    const { subtitle, currentTime, isSelectSubtitle } = useStateContext();
    const subtitleRefs = subtitle.map(() => createRef());
    const [subtitleTimes, setSubtitleTimes] = useState([]);

    useEffect(() => {
        const newSubtitleTimes = subtitle.map((item) => {
            return {
                startTime: item.startTime,
                endTime: item.endTime,
            };
        });
        setSubtitleTimes(newSubtitleTimes);
    }, [subtitle]);

    useEffect(() => {
        const index = subtitleTimes.findIndex(({ startTime, endTime }) => {
            return startTime <= currentTime && currentTime < endTime;
        });

        if (!isSelectSubtitle && index !== -1 && subtitleRefs[index].current) {
            subtitleRefs[index].current.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
            });
        }
    }, [currentTime, subtitleRefs, subtitleTimes]);

    const generateSubtitleButton = () => {
        const subtitleButtons = subtitle.map((item, index) => (
            <SubtitleButton 
                key={item.id || index} // assuming each item has a unique id
                ref={subtitleRefs[index]} 
                startTime={item.startTime} 
                endTime={item.endTime} 
                text={item.text} 
            />
        ));
        return (
            <SubtitleStyle>
                {subtitleButtons}
            </SubtitleStyle>
        );
    }

    return (
        generateSubtitleButton()
    )
}

export default Subtitle
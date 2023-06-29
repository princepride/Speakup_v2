import React, { forwardRef, useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #9DB2BF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #27374D;
    border-radius: 10px; // 增加圆角
    background-color: #27374D;
    font-style: italic; // 设置字体为斜体
    font-size: 1em; // 设置字体大小
    font-family: Georgia, serif; // 设置字体家族
`;

const SubtitleButton = forwardRef((props, ref) => {
    const { startTime, endTime, text } = props
    const { setCurrentTime, currentTime, isSelectSubtitle, subtitleStartTime, setSubtitleStartTime, subtitleEndTime, setSubtitleEndTime } = useStateContext()
    const [ isActive, setIsActive ] = useState(false)

    useEffect(() => {
        if(currentTime >= startTime && currentTime < endTime) {
            setIsActive(true)
        }
        else {
            setIsActive(false)
        }
    },[currentTime])

    const handleLeftClick = () => {
        if(isSelectSubtitle) {
            if(subtitleStartTime === -1) {
                setSubtitleStartTime(startTime)
                setSubtitleEndTime(startTime)
            }
            else if(startTime < subtitleStartTime) {
                setSubtitleStartTime(startTime)
                setSubtitleEndTime(startTime)
            }
            else {
                setSubtitleEndTime(startTime)
            }
        
        }
        else {
            setCurrentTime(startTime)
        }
    }

    const handleRightClick = (e) => {
        e.preventDefault(); // Prevent the browser context menu from showing up
        setSubtitleStartTime(-1);
        setSubtitleEndTime(-1);
    }

    return (
        <StyledContainer 
            ref={ref} 
            style={{color: isActive ? '#DDE6ED' : '#526D82', backgroundColor: startTime >= subtitleStartTime && startTime <= subtitleEndTime ? '#79E0EE' : '#27374D', cursor: 'pointer'}} 
            onClick={handleLeftClick}
            onContextMenu={handleRightClick} // Add the right click handler here
        >
            {text}
        </StyledContainer>
    )
})

export default SubtitleButton
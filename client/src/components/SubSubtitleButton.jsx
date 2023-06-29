import React from 'react'
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
    font-style: italic; // 设置字体为斜体
    font-size: 1em; // 设置字体大小
    font-family: Georgia, serif; // 设置字体家族
    color: #DDE6ED;
`;

const SubSubtitleButton = () => {
    const { setCurrentTime, subSubtitlesIndex, subSubtitles } = useStateContext()

    const handleLeftClick = () => {
        setCurrentTime(subSubtitles[subSubtitlesIndex].startTime)
    }

    const handleRightClick = (e) => {
        e.preventDefault(); // Prevent the browser context menu from showing up
    }

    return (
        <StyledContainer 
            style={{cursor: 'pointer'}} 
            onClick={handleLeftClick}
            onContextMenu={handleRightClick} // Add the right click handler here
        >
            {subSubtitles[subSubtitlesIndex].text}
        </StyledContainer>
    )
}

export default SubSubtitleButton
import React from 'react'
import { Tabs, Tab } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider'
import styled from "@emotion/styled";
import Subtitle from "./Subtitle";
import SubtitleSelector from "./SubtitleSelector";

const StyledContainer = styled.div`
    width: 17vw;
    height: 80vh;

    @media screen and (max-width: 1080px) {
        margin-top: 20px;
        width: 92vw;
        height: 56vh;
    }
`;

const SubtitleTabs = () => {
    const { subtitle, tabIndex, setTabIndex, subSubtitles } = useStateContext();

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <StyledContainer>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Subtitle" />
                <Tab label="Sub Subtitles" disabled={subSubtitles.length <= 0 ? true: false}/>
            </Tabs>
            {tabIndex === 0 && subtitle && <Subtitle />}
            {tabIndex === 1 && <SubtitleSelector />}
        </StyledContainer>
    )

}

export default SubtitleTabs
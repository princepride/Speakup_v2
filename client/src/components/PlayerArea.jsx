import React from "react";
import YoutubePlayer from "./YoutubePlayer";
// import Subtitles from './Subtitles'
import SubtitleTabs from './SubtitleTabs'
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    display: flex;
    margin-top: 1vh;
    margin-left: 2vw;
    margin-right: 2vw;

    @media screen and (max-width: 1080px) {
      flex-direction: column;
      height: auto;
  }
`;

function PlayerArea() {
  return (
    <StyledContainer>
        {/* <VideoPlayer /> */}
        <YoutubePlayer />
        <SubtitleTabs />
    </StyledContainer>
  )
}

export default PlayerArea
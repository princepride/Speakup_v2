import React from "react";
import VideoPlayer from './VideoPlayer'
import YoutubePlayer from "./YoutubePlayer";
// import Subtitles from './Subtitles'
import SubtitleTabs from './SubtitleTabs'
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    height: 540px;

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
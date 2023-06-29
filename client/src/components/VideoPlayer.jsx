import React, { useRef, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider'
import styled from "@emotion/styled";

// VideoPlayer 组件
const StyledVideoPlayer = styled.video`
    width: 960px;
    height: 540px;
    object-fit: cover;

    @media screen and (max-width: 1080px) {
        width: 100%;
        height: 25vh;
    }
`;

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const { videoUrl, currentTime, setCurrentTime, tabIndex, subSubtitles, subSubtitlesIndex, isSelectSubtitle } = useStateContext();

  useEffect(() => {
    const video = videoRef.current;

    if (video && videoUrl) {
        video.src = videoUrl;
        video.load();
    }
}, [videoUrl])

useEffect(() => {
  const video = videoRef.current;

  if (video && Math.abs(currentTime - video.currentTime) > 1) {
      video.currentTime = currentTime;
  }

  if(video && tabIndex === 1 && currentTime >= subSubtitles[subSubtitlesIndex].endTime) {
    video.pause();
  }
}, [currentTime]);

useEffect(() => {
  const video = videoRef.current;

  if (video && tabIndex === 1) {
      video.currentTime = subSubtitles[subSubtitlesIndex].startTime;
  }
}, [tabIndex, subSubtitlesIndex, subSubtitles]);


useEffect(() => {
  const video = videoRef.current;

  if (video && isSelectSubtitle) {
    video.pause();
  }
}, [isSelectSubtitle]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  return (
    <StyledVideoPlayer 
        ref={videoRef} 
        onTimeUpdate={handleTimeUpdate} 
        controls={!isSelectSubtitle}
    />
  );
};

export default VideoPlayer;

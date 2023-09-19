import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { useStateContext } from '../contexts/ContextProvider'
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`;

const YoutubePlayer = () => {
  const { youtubeId, currentTime, setCurrentTime, tabIndex, subSubtitles, subSubtitlesIndex, isSelectSubtitle } = useStateContext();
  const playerRef = useRef(null);

  const opts = {
    height: '520',
    width: '860',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
  };

  const handleStateChange = (event) => {
    setCurrentTime(event.target.getCurrentTime());
  };

  useEffect(() => {
    if (playerRef.current && Math.abs(currentTime - playerRef.current.getCurrentTime()) > 1) {
      playerRef.current.seekTo(currentTime);
    }

    if (playerRef.current && tabIndex === 1 && currentTime >= subSubtitles[subSubtitlesIndex].endTime) {
      playerRef.current.pauseVideo();
    }
  }, [currentTime]);

  useEffect(() => {
    if (playerRef.current && tabIndex === 1) {
      playerRef.current.seekTo(subSubtitles[subSubtitlesIndex].startTime);
    }
  }, [tabIndex, subSubtitlesIndex, subSubtitles]);

  useEffect(() => {
    if (playerRef.current && isSelectSubtitle) {
      playerRef.current.pauseVideo();
    }
  }, [isSelectSubtitle]);

  return (
    <Container>
    <YouTube 
      videoId={youtubeId}
      opts={opts}
      onReady={handleReady}
      onStateChange={handleStateChange}
    />
    </Container>
  );
};

export default YoutubePlayer;
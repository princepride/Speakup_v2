import React, { useRef, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
  height: 80vh;
  width: 80vw;

  @media screen and (max-width: 1080px) {
    width: 92vw;
    height: 25vh;
}
`;

const YoutubePlayer = () => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const { youtubeId, currentTime, setCurrentTime, tabIndex, subSubtitles, subSubtitlesIndex, isSelectSubtitle } = useStateContext();

  useEffect(() => {
    if (playerRef.current && Math.abs(currentTime - playerRef.current.getCurrentTime()) > 1) {
      playerRef.current.seekTo(currentTime, true);
    }
  }, [currentTime]);

  useEffect(() => {
    if (playerRef.current && tabIndex === 1) {
      playerRef.current.seekTo(subSubtitles[subSubtitlesIndex].startTime, true);
    }
  }, [tabIndex, subSubtitlesIndex, subSubtitles]);

  useEffect(() => {
    if (playerRef.current && isSelectSubtitle) {
      playerRef.current.pauseVideo();
    }
  }, [isSelectSubtitle]);

  const handleStateChange = event => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      intervalRef.current = setInterval(() => {
        const current = event.target.getCurrentTime();
        setCurrentTime(current);

        // 当currentTime超过subSubtitles[subSubtitlesIndex].endTime就暂停视频
        if (tabIndex === 1 && current >= subSubtitles[subSubtitlesIndex].endTime) {
          event.target.pauseVideo();
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  };
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Container>
    <YouTube
      style={{height:"inherit"}}
      videoId={youtubeId} // videoId instead of url
      opts={opts}
      onReady={event => {
        playerRef.current = event.target;
      }}
      onStateChange={handleStateChange}
    />
    </Container>
  );
};

export default YoutubePlayer;
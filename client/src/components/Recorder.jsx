import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import LoopTypography from "./LoopTypography"
import { speechRecognition } from "../utils/connect.js";
import { useStateContext } from "../contexts/ContextProvider";

let mediaRecorder = null;
let recordedChunks = [];

const AudioPlayer = styled.audio`
  margin-top:1vh;
  width: 38vw;
  height: 6vh;
  pointer-events: ${({ clickable }) => (clickable ? 'auto' : 'none')};
  opacity: ${({ clickable }) => (clickable ? '1' : '0.5')};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

function Recorder() {
    const [secondButtonLabel, setSecondButtonLabel] = useState("record");
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    const [pauseButtonLabel, setPauseButtonLabel] = useState("pause");
    const [audioUrl, setAudioUrl] = useState(null);
    const audioPlayerRef = useRef(null);
    const { 
      userId,
      tabIndex, 
      subSubtitles, 
      subSubtitlesIndex, 
      userSubSubtitles, 
      setUserSubSubtitles, 
      chatGPTResponse,
      setVisible, 
      setLoopBody,
      setTimeInterval,
      setLoopIndex } = useStateContext();

    const handleSecondButtonClick = async () => {
        if (secondButtonLabel === "record") {
          setSecondButtonLabel("confirm");
          setVisible(true);
          setLoopBody(Array.from({length: 300}, (v, i) => (i+"s")))
          setLoopIndex(0);
          recordedChunks = [];
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          mediaRecorder.addEventListener("dataavailable", (event) => {
            recordedChunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            let newArray = [...userSubSubtitles]; 
            setLoopBody(["Recognizing","Recognizing.","Recognizing..","Recognizing..."])
            setLoopIndex(0);
            if(userSubSubtitles[subSubtitlesIndex].length > chatGPTResponse[subSubtitlesIndex].length) {
              const sub_subtitle_id = subSubtitles[subSubtitlesIndex].id
              const id = userSubSubtitles[subSubtitlesIndex][userSubSubtitles[subSubtitlesIndex].length-1].id
              speechRecognition(userId, audioBlob, 'update', sub_subtitle_id, id)
              .then(data => {
                setVisible(false);
                let newArray = [...userSubSubtitles]; 
                newArray[subSubtitlesIndex][newArray[subSubtitlesIndex].length-1] = {'id':data.id, 'text':data.transcription}
                setUserSubSubtitles(newArray); 
              })
              .catch(error => {
                console.error(error);
              })
            }
            else {
              const sub_subtitle_id = subSubtitles[subSubtitlesIndex].id
              //const id = userSubSubtitles[subSubtitlesIndex][userSubSubtitles[subSubtitlesIndex].length-1].id
              speechRecognition(userId, audioBlob, 'insert', sub_subtitle_id, 0)
              .then(data => {
                setVisible(false);
                let newArray = [...userSubSubtitles];
                newArray[subSubtitlesIndex].push({'id':data.id, 'text':data.transcription}); 
                setUserSubSubtitles(newArray); 
              })
              .catch(error => {
                console.error(error);
              })
            }
          });
        } 
        else if (secondButtonLabel === "confirm") {
          setSecondButtonLabel("record");
          setPauseButtonLabel("pause");
          setTimeInterval(1000);
          mediaRecorder.stop();
          setShowAudioPlayer(true);
      };
    }
    
      const handlePauseButtonClick = () => {
        if (pauseButtonLabel === "pause") {
          setPauseButtonLabel("start");
          setTimeInterval(10000000);
          mediaRecorder.pause();
        } else {
          setPauseButtonLabel("pause");
          setTimeInterval(1000);
          mediaRecorder.resume();
        }
      };

    useEffect(() => {
        if (audioPlayerRef.current && audioUrl) {
            audioPlayerRef.current.src = audioUrl;
        }
    }, [audioUrl]);

  return (
    <StyledContainer>
        <div>
            <Button 
              disabled = { tabIndex === 1 ? false : true}
              style={{'marginTop': '8px', 'width': '8vw'}} 
              variant="contained"
              color="secondary" 
              onClick={handleSecondButtonClick}
            >
              {secondButtonLabel}
            </Button>
            {secondButtonLabel === "confirm" && 
            <Button 
              style={{'marginTop': '8px','marginLeft': '4px', 'width': '8vw'}} 
              variant="contained"
              color="secondary" 
              onClick={handlePauseButtonClick}
            >
              {pauseButtonLabel}
            </Button>}
        </div>
        <LoopTypography />
        <AudioPlayer clickable={showAudioPlayer} ref={audioPlayerRef} controls>
          Your browser does not support the audio element.
        </AudioPlayer>
    </StyledContainer>
  )
}

export default Recorder
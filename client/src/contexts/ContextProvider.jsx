import React, { createContext, useContext, useState } from 'react';
// import dummySubtitles from "../assets/dummy/subsubtitles.js"


const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isMainLiked, setIsMainLiked] = useState(false)

    const [videoUrl, setVideoUrl] = useState('');
    const [youtubeId, setYoutubeId] = useState('');
    const [subtitle, setSubtitle] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [isSelectSubtitle,setIsSelectSubtitle] = useState(false); 
    const [subSubtitles, setSubSubtitles] = useState([]);
    const [subSubtitlesIndex, setSubSubtitlesIndex] = useState(0);
    const [userSubSubtitles, setUserSubSubtitles] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [subtitleStartTime, setSubtitleStartTime] = useState(-1);
    const [subtitleEndTime, setSubtitleEndTime] = useState(-1);
    const [chatGPTResponse, setChatGPTResponse] = useState([]);
    const [model, setModel] = useState("gpt-4")

    const [visible, setVisible] = useState(false);
    const [loopBody, setLoopBody] = useState([]);
    const [timeInterval, setTimeInterval] = useState(1000);
    const [loopIndex, setLoopIndex] = useState(0);
    return (
        <StateContext.Provider value={{videoUrl, setVideoUrl, youtubeId, setYoutubeId
        , subtitle, setSubtitle, currentTime, setCurrentTime
        , isSelectSubtitle, setIsSelectSubtitle, subSubtitles
        , setSubSubtitles, subSubtitlesIndex, setSubSubtitlesIndex
        , userSubSubtitles, setUserSubSubtitles,tabIndex, setTabIndex
        , subtitleStartTime, setSubtitleStartTime, subtitleEndTime
        , setSubtitleEndTime, chatGPTResponse, setChatGPTResponse
        , model, setModel
        , visible, setVisible, loopBody, setLoopBody, timeInterval
        , setTimeInterval,loopIndex, setLoopIndex
        , isMainLiked, setIsMainLiked}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
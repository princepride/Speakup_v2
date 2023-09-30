import React, { createContext, useContext, useState } from 'react';
// import dummySubtitles from "../assets/dummy/subsubtitles.js"


const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [userId, setUserId] = useState(-1);
    const [isMainLiked, setIsMainLiked] = useState(false);
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
    const [model, setModel] = useState("gpt-3.5-turbo")

    const [visible, setVisible] = useState(false);
    const [loopBody, setLoopBody] = useState([]);
    const [timeInterval, setTimeInterval] = useState(1000);
    const [loopIndex, setLoopIndex] = useState(0);

    const [achievementList, setAchievementList] = useState(["A001", "A002", "A003", "A004"]);
    const [friendList, setFriendList] = useState([
        {
            "name":"Naruto",
            "title":"Master",
            "status":"online",
        },
        {
            "name":"Sasuke",
            "title":"GrandMaster",
            "status":"offline",
        }
    ])
    return (
        <StateContext.Provider value={{userId, setUserId, youtubeId, setYoutubeId
        , subtitle, setSubtitle, currentTime, setCurrentTime
        , isSelectSubtitle, setIsSelectSubtitle, subSubtitles
        , setSubSubtitles, subSubtitlesIndex, setSubSubtitlesIndex
        , userSubSubtitles, setUserSubSubtitles,tabIndex, setTabIndex
        , subtitleStartTime, setSubtitleStartTime, subtitleEndTime
        , setSubtitleEndTime, chatGPTResponse, setChatGPTResponse
        , model, setModel
        , visible, setVisible, loopBody, setLoopBody, timeInterval
        , setTimeInterval,loopIndex, setLoopIndex
        , isMainLiked, setIsMainLiked, achievementList, setAchievementList
        , friendList, setFriendList}}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
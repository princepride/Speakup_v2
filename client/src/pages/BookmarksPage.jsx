// import React, {useState, useEffect} from 'react'
// import styled from "@emotion/styled";
// import { Grid } from "@mui/material";
// import VideoCard from '../components/VideoCard';
// import { selectAllBookmarks } from '../utils/connect'
// import { secondToString2 } from '../utils/timeConvert'
// import { useStateContext } from '../contexts/ContextProvider';

// const StyledContainer = styled.div`
//     display: 'flex';
//     align-items: 'center';
//     margin-top: 2rem;
//     margin-left: 2rem;
//     margin-right: 2rem;
// `;

// const TextStyle = styled.div`
//     background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
//     -webkit-background-clip: text;
//     background-clip: text;
//     color: transparent;
//     font-size: 36px;
//     font-weight: bold;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-grow: 1;
//     margin-top:2vh;
// `

// function BookmarksPage() {

//     const [bookMarks, setBookMarks] = useState([]);
//     const { userId } = useStateContext();

//     useEffect(() => {
//         const fetchBookmarks = async () => {
//             try {
//                 const bookmarksData = await selectAllBookmarks(userId);
//                 setBookMarks(bookmarksData);
//             } catch(error) {
//                 console.error(error);
//             }
//         };
//         fetchBookmarks();
//     }, []);

//     return (
//         <>
//         <TextStyle>
//             Bookmarks
//         </TextStyle>
//         <StyledContainer maxWidth="lg">
//             <Grid container spacing={2}>
//                 {bookMarks.map((bookmark, index) => (
//                     <Grid item xs={6} md={4} lg={3} key={index}>
//                     <VideoCard
//                         youtube_id={bookmark.youtube_id}
//                         youtube_name={bookmark.youtube_name.slice(7).slice(0, -16)}
//                         youtube_duration={secondToString2(bookmark.youtube_duration)}
//                     />
//                     </Grid>
//                 ))}
//             </Grid>
//         </StyledContainer>
//         </>
//     )
// }

// export default BookmarksPage

// import React, { useState, useEffect } from 'react';
// import styled from "@emotion/styled";
// import { Grid } from "@mui/material";
// import VideoCard from '../components/VideoCard';
// import { selectAllBookmarks } from '../utils/connect';
// import { secondToString2 } from '../utils/timeConvert';
// import { useStateContext } from '../contexts/ContextProvider';

// const StyledContainer = styled.div`
//     display: flex;
//     margin-top: 2rem;
//     margin-left: 2rem;
//     margin-right: 2rem;
//     @media (max-width: 1080px) {
//         flex-direction: column;
//     }
// `;

// const LeftContainer = styled.div`
//     flex: 1;
//     border-right: 1px solid #ccc;
//     padding-right: 2rem;
//     @media (max-width: 1080px) {
//         border-right: none;
//         padding-right: 0;
//         border-bottom: 1px solid #ccc;
//     }
// `;

// const RightContainer = styled.div`
//     flex: 1;
//     padding-left: 2rem;
//     @media (max-width: 1080px) {
//         padding-left: 0;
//     }
// `;

// const TextStyle = styled.div`
//     background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
//     -webkit-background-clip: text;
//     background-clip: text;
//     color: transparent;
//     font-size: 36px;
//     font-weight: bold;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-grow: 1;
//     margin-top: 2vh;
// `;

// function BookmarksPage() {
//     const [bookMarks, setBookMarks] = useState([]);
//     const { userId } = useStateContext();

//     useEffect(() => {
//         const fetchBookmarks = async () => {
//             try {
//                 const bookmarksData = await selectAllBookmarks(userId);
//                 setBookMarks(bookmarksData);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchBookmarks();
//     }, []);

//     return (
//         <>
//             <StyledContainer maxWidth="lg">
//                 <LeftContainer>
//                     <TextStyle>Favourite</TextStyle>
//                     <Grid container spacing={2}>
//                         {bookMarks.map((bookmark, index) => (
//                             <Grid item xs={6} md={4} lg={3} key={index}>
//                                 <VideoCard
//                                     youtube_id={bookmark.youtube_id}
//                                     youtube_name={bookmark.youtube_name.slice(7).slice(0, -16)}
//                                     youtube_duration={secondToString2(bookmark.youtube_duration)}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </LeftContainer>
//                 <RightContainer>
//                     <TextStyle>Recommend</TextStyle>
//                     {/* Add your recommended videos content here */}
//                 </RightContainer>
//             </StyledContainer>
//         </>
//     );
// }

// export default BookmarksPage;

import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import VideoCard from '../components/VideoCard';
import { selectAllBookmarks } from '../utils/connect';
import { secondToString2 } from '../utils/timeConvert';
import { useStateContext } from '../contexts/ContextProvider';

const StyledContainer = styled.div`
    display: flex;
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
    height: calc(100vh - 4rem); /* Subtracting the margin-top and margin-bottom */
    @media (max-width: 1080px) {
        flex-direction: column;
        height: 100%;
    }
`;

const LeftContainer = styled.div`
    flex: 1;
    border-right: 1px solid #ccc;
    padding-right: 2rem;
    overflow-x: visible;
    overflow-y: auto;
    @media (max-width: 1080px) {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid #ccc;
        overflow-x: auto; 
        overflow-y: visible; 
        height: 50%; 
    }
`;

const RightContainer = styled.div`
    flex: 1;
    padding-left: 2rem;
    overflow-x: visible;
    overflow-y: auto;
    @media (max-width: 1080px) {
        padding-left: 0;
        overflow-x: auto; 
        overflow-y: visible; 
        height: 50%; 
    }
`;

const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-top: 2vh;
`;

function BookmarksPage() {
    const [bookMarks, setBookMarks] = useState([]);
    const { userId } = useStateContext();

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const bookmarksData = await selectAllBookmarks(userId);
                setBookMarks(bookmarksData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookmarks();
    }, []);

    return (
        <>
            <StyledContainer maxWidth="lg">
                <LeftContainer>
                <TextStyle>Favourite</TextStyle>
                    <Grid container spacing={2}>
                        {bookMarks.map((bookmark, index) => (
                            <Grid item xs={6} md={4} lg={3} key={index}>
                                <VideoCard
                                    youtube_id={bookmark.youtube_id}
                                    youtube_name={bookmark.youtube_name.slice(7).slice(0, -16)}
                                    youtube_duration={secondToString2(bookmark.youtube_duration)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </LeftContainer>
                <RightContainer>
                    <TextStyle>Recommend</TextStyle>
                    {/* Add your recommended videos content here */}
                </RightContainer>
            </StyledContainer>
        </>
    );
}

export default BookmarksPage;

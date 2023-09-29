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
    margin-bottom: 2vh;
    margin-top: 2vh;
`;

function BookmarksPage() {
    const [bookMarks, setBookMarks] = useState([]);
    const { userId } = useStateContext();
    const [recommendeds, setRecommendeds] = useState([
        {
            youtube_id:"UF8uR6Z6KLc",
            youtube_name:"Steve Jobs' 2005 Stanford Commencement Address",
            youtube_duration: 904
        },
        {
            youtube_id:"k0jJL_YFyIU",
            youtube_name:"Barack Obama's final speech as president – video highlights",
            youtube_duration: 270
        },
        {
            youtube_id:"Q0Dg226G2Z8",
            youtube_name:"Emma Watson HeForShe Speech at the United Nations | UN Women 2014",
            youtube_duration: 707
        },
        {
            youtube_id:"ckjkz8zuMMs",
            youtube_name:"Tim Cook's MIT Commencement Address 2017",
            youtube_duration: 933
        },
        {
            youtube_id:"9TCMHVmNc5w",
            youtube_name:"Abraham Lincoln Gettysburg speech (Jeff Daniels)",
            youtube_duration: 169
        }
    ])

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
        <StyledContainer maxWidth="lg">
            <LeftContainer>
            <TextStyle>Favourite</TextStyle>
                <Grid container spacing={2}>
                    {bookMarks.map((bookmark, index) => (
                        <Grid item xs={6} md={4} key={index}>
                            <VideoCard
                                youtube_id={bookmark.youtube_id}
                                youtube_name={bookmark.youtube_name}
                                youtube_duration={secondToString2(bookmark.youtube_duration)}
                                editable={true}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LeftContainer>
            <RightContainer>
                <TextStyle>Recommend</TextStyle>
                <Grid container spacing={2}>
                    {recommendeds.map((recommended, index) => (
                        <Grid item xs={6} md={4} key={index}>
                            <VideoCard
                                youtube_id={recommended.youtube_id}
                                youtube_name={recommended.youtube_name}
                                youtube_duration={secondToString2(recommended.youtube_duration)}
                                editable={false}
                            />
                        </Grid>
                    ))}
                </Grid>
            </RightContainer>
        </StyledContainer>
    );
}

export default BookmarksPage;

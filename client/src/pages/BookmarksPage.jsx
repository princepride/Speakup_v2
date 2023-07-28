import React, {useState} from 'react'
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import VideoCard from '../components/VideoCard'

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;

function BookmarksPage() {

    const [bookMarks, setBookMarks] = useState([
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
        {
            youtube_id:"oLcjVwpsOrY",
            youtube_name:"TestTestTest",
            youtube_name:"00:01:30",
        },
    ]);

    return (
        <>
        <h1>Bookmarks</h1>
        <StyledContainer maxWidth="lg">
            <Grid container spacing={2}>
                {bookMarks.map((bookmark) => (
                    <Grid item xs={6} md={4} lg={3} key={bookmark.youtube_id}>
                    <VideoCard
                        youtube_id={bookmark.youtube_id}
                        youtube_name={bookmark.youtube_name}
                        youtube_duration={bookmark.youtube_duration}
                    />
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
        </>
    )
}

export default BookmarksPage

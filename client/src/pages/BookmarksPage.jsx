import React, {useState, useEffect} from 'react'
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import VideoCard from '../components/VideoCard'
import { selectAllBookmarks } from '../utils/connect'
import { secondToString2 } from '../utils/timeConvert'

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
`;

function BookmarksPage() {

    const [bookMarks, setBookMarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const bookmarksData = await selectAllBookmarks();
                setBookMarks(bookmarksData);
            } catch(error) {
                console.error(error);
            }
        };
        fetchBookmarks();
    }, []);

    return (
        <>
        <h1>Bookmarks</h1>
        <StyledContainer maxWidth="lg">
            <Grid container spacing={2}>
                {bookMarks.map((bookmark, index) => (
                    <Grid item xs={6} md={4} lg={3} key={index}>
                    <VideoCard
                        youtube_id={bookmark.youtube_id}
                        youtube_name={bookmark.youtube_name.replace("videos\\","").replace(".mp4","")}
                        youtube_duration={secondToString2(bookmark.youtube_duration)}
                    />
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
        </>
    )
}

export default BookmarksPage

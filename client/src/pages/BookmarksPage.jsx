import React, {useState, useEffect} from 'react'
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import VideoCard from '../components/VideoCard';
import Typography from '@mui/material/Typography';
import { selectAllBookmarks } from '../utils/connect'
import { secondToString2 } from '../utils/timeConvert'

const StyledContainer = styled.div`
    display: 'flex';
    align-items: 'center';
    margin-top: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
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
    margin-top:2vh;
`

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
        <TextStyle>
            Bookmarks
        </TextStyle>
        <StyledContainer maxWidth="lg">
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
        </StyledContainer>
        </>
    )
}

export default BookmarksPage

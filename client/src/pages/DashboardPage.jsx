import styled from '@emotion/styled';
import { Box, List, ListItem, ListItemIcon, Tooltip, IconButton } from '@mui/material';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import MainPage from './MainPage';
import StatisticPage from './StatisticPage';
import BookmarksPage from './BookmarksPage';
import SpeakUpIcon from '@mui/icons-material/SettingsVoice';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StatisticIcon from '@mui/icons-material/Equalizer';

const MainContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    height: 97vh;

    @media screen and (max-width: 1080px) {
        flex-direction: column;
    }
`;

const NavigationContainer = styled(Box)`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: #fff;
    width: 3%;

    @media screen and (max-width: 1080px) {
        width: 100%;
        height: auto;
    }
`;

const NavigationList = styled(List)`
    margin-top: 50px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1080px) {
        flex-direction: row;
        justify-content: space-around;
        margin-top: 0px;
    }
`;

//const NavigationItem = styled(ListItem)`
//    cursor: pointer;

//    //&:hover {
//    //    background-color: #CCC;
//    //    border-radius: 20px;
//    //}

//    & .MuiIconButton-root {
//        margin-left: -14px; 
//    }
//`;

const NavigationItem = styled(ListItem)`
    display: flex; 
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const ContentContainer = styled(Box)`
    flex-grow: 1;
`;

const DashboardPage = () => {
    return (
        <MainContainer>
            <NavigationContainer>
                <NavigationList>
                    <NavigationItem component={Link} to="/">
                        <Tooltip title="Speak Up">
                            <IconButton color="inherit">
                                <SpeakUpIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/Bookmarks">
                        <Tooltip title="Bookmarks">
                            <IconButton color="inherit">
                                <BookmarksIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/Statistic">
                        <Tooltip title="Statistic">
                            <IconButton color="inherit">
                                <StatisticIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                </NavigationList>
            </NavigationContainer>
            <ContentContainer>
                <Outlet />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/Bookmarks" element={<BookmarksPage />} />
                    <Route path="/Statistic" element={<StatisticPage />} />
                </Routes>
            </ContentContainer>
        </MainContainer>
    )
}

export default DashboardPage;
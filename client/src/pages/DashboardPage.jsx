import styled from '@emotion/styled';
import { Box, List, ListItem, Tooltip, IconButton } from '@mui/material';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import MainPage from './MainPage';
import StatisticPage from './StatisticPage';
import BookmarksPage from './BookmarksPage';
import SpeakUpIcon from '@mui/icons-material/SettingsVoice';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StatisticIcon from '@mui/icons-material/Equalizer';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TasksPage from './TasksPage';
import { shutDown } from '../utils/connect'

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
    justify-content: space-between;
    height: 90%;

    > div.autoFill {
        flex-grow: 1;
    }

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
    const location = useLocation();
    return (
        <MainContainer>
            <NavigationContainer>
                <NavigationList>
                    <NavigationItem component={Link} to="/">
                        <Tooltip title="Speak Up">
                            <IconButton style={{ color : location.pathname === '/' ? "#45CFDD" : "gray" }}>
                                <SpeakUpIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/bookmarks">
                        <Tooltip title="Bookmarks">
                            <IconButton style={{ color : location.pathname === '/bookmarks' ? "#45CFDD" : "gray" }}>
                                <BookmarksIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/statistic">
                        <Tooltip title="Statistic">
                            <IconButton style={{ color : location.pathname === '/statistic' ? "#45CFDD" : "gray" }}>
                                <StatisticIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/tasks">
                        <Tooltip title="Tasks">
                            <IconButton style={{ color : location.pathname === '/tasks' ? "#45CFDD" : "gray" }}>
                                <TaskAltIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <div className="autoFill" />
                    <NavigationItem>
                        <Tooltip title="Shut down">
                            <IconButton style={{ color : "#F31559" }} onClick={shutDown}>
                                <PowerSettingsNewIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                </NavigationList>
            </NavigationContainer>
            <ContentContainer>
                <Outlet />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/statistic" element={<StatisticPage />} />
                    <Route path='/tasks' element={<TasksPage />} />
                </Routes>
            </ContentContainer>
        </MainContainer>
    )
}

export default DashboardPage;
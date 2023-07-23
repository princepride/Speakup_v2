import styled from '@emotion/styled';
import { Box, List, ListItem, ListItemIcon, Tooltip, IconButton } from '@mui/material';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import MainPage from './MainPage';
import StatisticPage from './StatisticPage'
import R2024Icon from '@mui/icons-material/Event'; // Assume this icon for R2024
import GoBangIcon from '@mui/icons-material/Gamepad'; // Assume this icon for GoBang

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

const NavigationItem = styled(ListItem)`
    cursor: pointer;

    //&:hover {
    //    background-color: #CCC;
    //    border-radius: 20px;
    //}

    & .MuiIconButton-root {
        margin-left: -14px; 
    }
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
                                <R2024Icon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                    <NavigationItem component={Link} to="/StatisticPage">
                        <Tooltip title="Statistic">
                            <IconButton color="inherit">
                                <GoBangIcon />
                            </IconButton>
                        </Tooltip>
                    </NavigationItem>
                </NavigationList>
            </NavigationContainer>
            <ContentContainer>
                <Outlet />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/StatisticPage" element={<StatisticPage />} />
                </Routes>
            </ContentContainer>
        </MainContainer>
    )
}

export default DashboardPage;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import MainPage from './MainPage';

const RoutePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={(<DashboardPage />)} />
                <Route path="/test" element={(<MainPage />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePage
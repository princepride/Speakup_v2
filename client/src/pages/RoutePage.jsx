import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import TestPage from './TestPage';
import LoginPage from './LoginPage';

const RoutePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={(<LoginPage />)} />
                <Route path="/*" element={(<DashboardPage />)} />
                <Route path="/test" element={(<TestPage />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePage
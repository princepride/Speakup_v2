import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import TestPage from './TestPage';

const RoutePage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={(<DashboardPage />)} />
                <Route path="/test" element={(<TestPage />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePage
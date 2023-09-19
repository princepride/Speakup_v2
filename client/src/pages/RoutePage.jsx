import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import TestPage from './TestPage';

const RoutePage = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/*" element={(<DashboardPage />)} />
                <Route path="/test" element={(<TestPage />)} />
            </Routes>
        </HashRouter>
    )
}

export default RoutePage
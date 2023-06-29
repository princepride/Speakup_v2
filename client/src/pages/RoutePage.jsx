import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import TestPage from './TestPage';
import ChatPage from './ChatPage';

function RoutePage() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={(<MainPage />)} />
            <Route path="/chat" element={(<ChatPage />)} />
            <Route path="/test" element={(<TestPage />)} />
        </Routes>
    </BrowserRouter>
    );
}

export default RoutePage;
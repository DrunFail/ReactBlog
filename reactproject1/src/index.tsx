import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch/NoMatch';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NoMatch /> } />
            </Route>
        </Routes>
    </BrowserRouter >
);

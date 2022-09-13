import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

import Layout from './components/layout/Layout';

import TradeBuilderPage from './pages/TradeBuilder';
import React from 'react';

function App() {
    return (
        <DndProvider options={HTML5toTouch}>
            <Layout>
                <Routes>
                    <Route path="/" element={<TradeBuilderPage />} />
                </Routes>
            </Layout>
        </DndProvider>
    );
}

export default App;

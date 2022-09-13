import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Layout from './components/layout/Layout';

import TradeBuilderPage from './pages/TradeBuilder';
import React from 'react';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Layout>
                <Routes>
                    <Route path="/" element={<TradeBuilderPage />} />
                </Routes>
            </Layout>
        </DndProvider>
    );
}

export default App;

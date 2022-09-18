import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

import Layout from './components/layout/Layout';

import TradeBuilderPage from './pages/TradeBuilder';
import AboutPage from './pages/About';
import React from 'react';

function App() {
    return (
        <ReduxProvider store={store}>
            <DndProvider backend={HTML5Backend}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/trade-values" replace />} />
                        <Route path="/trade-values" element={<TradeBuilderPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </Layout>
            </DndProvider>
        </ReduxProvider>
    );
}

export default App;

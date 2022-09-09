import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import TradeBuilderPage from './pages/TradeBuilder';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<TradeBuilderPage />} />
            </Routes>
        </Layout>
    );
}

export default App;

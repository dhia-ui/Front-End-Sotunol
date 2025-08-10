import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import AIProcessing from './pages/AIProcessing';
import Settings from './pages/Settings';
import Cheques from './pages/Cheques';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="cheques" element={<Cheques />} />
          <Route path="ai-processing" element={<AIProcessing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

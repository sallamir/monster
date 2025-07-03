import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import FAQ from './pages/FAQ';
import Products from './pages/Products';
import Support from './pages/Support';
import Testimonials from './pages/Testimonials';
import TutorialDetail from './pages/TutorialDetail';
import CameraComparison from './pages/CameraComparison';
import OrderTracking from './pages/OrderTracking';
import NotificationPermission from './components/NotificationPermission';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize any required services here
    console.log('Simply Online App Initialized');
  }, []);

  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/support" element={<Support />} />
            <Route path="/compare" element={<CameraComparison />} />
            <Route path="/orders" element={<OrderTracking />} />
          </Routes>
        </AnimatePresence>
        
        {/* Notification Permission Prompt */}
        <NotificationPermission />
      </Layout>
    </Router>
  );
}

export default App;
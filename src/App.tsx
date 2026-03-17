import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './components/dashboard/Overview';
import LeadsTable from './components/dashboard/LeadsTable';
import Compliance from './components/dashboard/Compliance';
import AgentConfig from './components/dashboard/AgentConfig';
import WhatsAppIntegration from './components/dashboard/WhatsAppIntegration';
import Settings from './components/dashboard/Settings';
import AuthModal from './components/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

type DashboardTab = 'overview' | 'leads' | 'compliance' | 'settings' | 'agent-config' | 'whatsapp';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setAuthModal({ ...authModal, isOpen: false });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('overview');
  };

  return (
    <main className="min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage onAuth={(mode) => setAuthModal({ isOpen: true, mode })} />
            <AuthModal 
              isOpen={authModal.isOpen} 
              initialMode={authModal.mode}
              onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
              onSuccess={handleLoginSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DashboardLayout 
              activeTab={activeTab} 
              setActiveTab={(tab) => setActiveTab(tab as DashboardTab)}
              onLogout={handleLogout}
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'leads' && <LeadsTable />}
              {activeTab === 'compliance' && <Compliance />}
              {activeTab === 'agent-config' && <AgentConfig />}
              {activeTab === 'whatsapp' && <WhatsAppIntegration />}
              {activeTab === 'settings' && <Settings />}
            </DashboardLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

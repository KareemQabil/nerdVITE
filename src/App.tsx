import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import POSScreen from './features/sales-pos/components/POSScreen';
import './styles/globals.css';
import './features/i18n'; // Initialize i18n
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {

  // Set direction to RTL by default for Arabic POS
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to POS for now */}
          <Route path="/" element={<Navigate to="/pos" replace />} />

          <Route path="/pos" element={<POSScreen />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/pos" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

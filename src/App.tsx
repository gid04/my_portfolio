import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </Layout>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;

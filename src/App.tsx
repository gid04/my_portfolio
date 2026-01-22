import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import AllProjects from './pages/AllProjects';

import ScrollToAnchor from './components/utils/ScrollToAnchor';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectEditor from './pages/admin/ProjectEditor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToAnchor />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/new" element={<ProjectEditor />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

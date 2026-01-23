import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import AllProjects from './pages/AllProjects';

import ScrollToAnchor from './components/utils/ScrollToAnchor';
import ScrollToTop from './components/utils/ScrollToTop';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectEditor from './pages/admin/ProjectEditor';
import ServiceEditor from './pages/admin/ServiceEditor';
import ExperienceEditor from './pages/admin/ExperienceEditor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ScrollToAnchor />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/new" element={<ProjectEditor />} />
            <Route path="/admin/services/new" element={<ServiceEditor />} />
            <Route path="/admin/experience/new" element={<ExperienceEditor />} />
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

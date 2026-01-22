import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

const AdminDashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        setProjects(savedProjects);
    }, [navigate]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            setProjects(updatedProjects);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <BackButton />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1>Admin Dashboard.</h1>
                <Link to="/admin/new" className="btn-primary" style={{
                    padding: '0.8rem 1.5rem',
                    background: 'var(--text-color)',
                    color: 'var(--bg-color)',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}>
                    + Add New Project
                </Link>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Your Projects ({projects.length})</h2>

                {projects.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No projects uploaded yet.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Image</th>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                                            <img src={project.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{project.title}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{project.category || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            style={{
                                                background: 'none',
                                                border: '1px solid red',
                                                color: 'red',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

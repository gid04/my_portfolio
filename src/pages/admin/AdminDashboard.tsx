import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'experience'>('projects');

    // Fetch Data
    const projects = useQuery(api.projects.get) || [];
    const services = useQuery(api.content.getServices) || [];
    const experiences = useQuery(api.content.getExperiences) || [];

    // Mutations
    const deleteProject = useMutation(api.projects.remove);
    const deleteService = useMutation(api.content.removeService);
    const deleteExperience = useMutation(api.content.removeExperience);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }
    }, [navigate]);

    const handleDelete = async (type: 'project' | 'service' | 'experience', id: any) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            if (type === 'project') await deleteProject({ id });
            if (type === 'service') await deleteService({ id });
            if (type === 'experience') await deleteExperience({ id });
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <BackButton />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard.</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('projects')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'projects' ? 'var(--text-color)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'projects' ? 'bold' : 'normal',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                    }}
                >
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'services' ? 'var(--text-color)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'services' ? 'bold' : 'normal',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                    }}
                >
                    Services
                </button>
                <button
                    onClick={() => setActiveTab('experience')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: activeTab === 'experience' ? 'var(--text-color)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'experience' ? 'bold' : 'normal',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                    }}
                >
                    Experience
                </button>
            </div>

            {/* Content Area */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2>Projects ({projects.length})</h2>
                            <Link to="/admin/new" className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Project</Link>
                        </div>
                        {projects.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No projects found.</p> : (
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
                                    {projects.map((item: any) => (
                                        <tr key={item._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}><img src={item.imageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.title}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.category}</td>
                                            <td style={{ padding: '1rem' }}><button onClick={() => handleDelete('project', item._id)} style={{ color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '0.2rem 0.6rem', cursor: 'pointer' }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2>Services ({services.length})</h2>
                            <Link to="/admin/services/new" className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Service</Link>
                        </div>
                        {services.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No services found.</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem' }}>Image</th>
                                        <th style={{ padding: '1rem' }}>Title</th>
                                        <th style={{ padding: '1rem' }}>Tools</th>
                                        <th style={{ padding: '1rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((item: any) => (
                                        <tr key={item._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}><img src={item.imageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.title}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.tools?.join(', ')}</td>
                                            <td style={{ padding: '1rem' }}><button onClick={() => handleDelete('service', item._id)} style={{ color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '0.2rem 0.6rem', cursor: 'pointer' }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

                {/* EXPERIENCE TAB */}
                {activeTab === 'experience' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2>Experience ({experiences.length})</h2>
                            <Link to="/admin/experience/new" className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Experience</Link>
                        </div>
                        {experiences.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No experience found.</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem' }}>Role</th>
                                        <th style={{ padding: '1rem' }}>Company</th>
                                        <th style={{ padding: '1rem' }}>Period</th>
                                        <th style={{ padding: '1rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiences.map((item: any) => (
                                        <tr key={item._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.role}</td>
                                            <td style={{ padding: '1rem' }}>{item.company}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.period}</td>
                                            <td style={{ padding: '1rem' }}><button onClick={() => handleDelete('experience', item._id)} style={{ color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '0.2rem 0.6rem', cursor: 'pointer' }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;

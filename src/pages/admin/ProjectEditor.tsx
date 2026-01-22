import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';

const ProjectEditor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        role: '',
        industry: '',
        category: 'UI/UX Design', // Default
        tags: '',
        tools: [] as string[],
        description: '', // Short desc
        fullDescription: '', // Overview
        link: ''
    });

    const AVAILABLE_TOOLS = ['Figma', 'Antigravity', 'Adobe Illustrator', 'Adobe Photoshop', 'Framer', 'React', 'After Effects'];
    const CATEGORIES = ["UI/UX Design", "Web Design", "Brand Strategy", "Prototyping"];

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin');
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToolToggle = (tool: string) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.includes(tool)
                ? prev.tools.filter(t => t !== tool)
                : [...prev.tools, tool]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProject = {
            id: Date.now(),
            ...formData,
            // Ensure tags is array
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t.length > 0)
        };

        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        localStorage.setItem('projects', JSON.stringify([...existingProjects, newProject]));

        navigate('/admin/dashboard');
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <button onClick={() => navigate('/admin/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', fontSize: '1rem' }}>&larr; Back to Dashboard</button>
            </div>

            <h1 style={{ marginBottom: '2rem' }}>Add New Project.</h1>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Basic Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Project Title *</label>
                        <input name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category *</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image URL *</label>
                    <input name="imageUrl" type="url" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                {/* Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Role</label>
                        <input name="role" placeholder="e.g. Lead Designer" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Industry</label>
                        <input name="industry" placeholder="e.g. Fintech" value={formData.industry} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tags (comma separated)</label>
                    <input name="tags" placeholder="Mobile, Dashboard, Minimal..." value={formData.tags} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                {/* Tools */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tools Used</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {AVAILABLE_TOOLS.map(tool => (
                            <button
                                key={tool}
                                type="button"
                                onClick={() => handleToolToggle(tool)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    border: '1px solid var(--border-color)',
                                    background: formData.tools.includes(tool) ? 'var(--text-color)' : 'transparent',
                                    color: formData.tools.includes(tool) ? 'var(--bg-color)' : 'var(--text-color)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tool}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Descriptions */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Short Description</label>
                    <textarea name="description" rows={2} placeholder="Brief summary for the card..." value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Overview</label>
                    <textarea name="fullDescription" rows={6} placeholder="Detailed case study content..." value={formData.fullDescription} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Live Link / Demo</label>
                    <input name="link" type="url" placeholder="https://..." value={formData.link} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--text-color)', color: 'var(--bg-color)', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                        Publish Project
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProjectEditor;

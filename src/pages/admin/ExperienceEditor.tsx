import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ExperienceEditor = () => {
    const navigate = useNavigate();
    const createExperience = useMutation(api.content.createExperience);

    const [formData, setFormData] = useState({
        company: '',
        role: '',
        period: '',
        description: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin');
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createExperience(formData);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to create experience");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <BackButton />
            <h1 style={{ margin: '2rem 0' }}>Add New Experience</h1>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Company *</label>
                        <input name="company" value={formData.company} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Role *</label>
                        <input name="role" value={formData.role} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Period *</label>
                    <input name="period" placeholder="e.g. 2023 - Present" value={formData.period} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description *</label>
                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--text-color)', color: 'var(--bg-color)', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Creating...' : 'Create Experience'}
                </button>
            </form>
        </div>
    );
};

export default ExperienceEditor;

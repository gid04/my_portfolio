import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ExperienceEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const createExperience = useMutation(api.content.createExperience);
    const updateExperience = useMutation(api.content.updateExperience);
    const existingExperience = useQuery(api.content.getExperienceById, isEditMode ? { id: id as any } : "skip");

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

    useEffect(() => {
        if (existingExperience) {
            setFormData({
                company: existingExperience.company,
                role: existingExperience.role,
                period: existingExperience.period,
                description: existingExperience.description,
            });
        }
    }, [existingExperience]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEditMode && id) {
                await updateExperience({
                    id: id as any,
                    ...formData
                });
            } else {
                await createExperience(formData);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to save experience");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <BackButton />
            <h1 style={{ margin: '2rem 0' }}>{isEditMode ? 'Edit Experience' : 'Add New Experience'}</h1>

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
                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Experience' : 'Create Experience')}
                </button>
            </form>
        </div>
    );
};

export default ExperienceEditor;

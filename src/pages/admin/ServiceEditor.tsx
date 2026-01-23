import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ServiceEditor = () => {
    const navigate = useNavigate();
    const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
    const createService = useMutation(api.content.createService);

    // For selecting related items (optional future enhancement)
    // const projects = useQuery(api.projects.get);
    // const experiences = useQuery(api.content.getExperiences);

    const [formData, setFormData] = useState({
        title: '',
        overview: '',
        tools: [] as string[],
        callToAction: '',
    });

    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Common tools in design/dev
    const AVAILABLE_TOOLS = ['Figma', 'React', 'Node.js', 'Python', 'Adobe Suite', 'Blender', 'Convex', 'Vercel'];

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin');
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
        }
    };

    const handleToolToggle = (tool: string) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.includes(tool)
                ? prev.tools.filter(t => t !== tool)
                : [...prev.tools, tool]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let coverImageId = undefined;
            if (coverImageFile) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": coverImageFile.type },
                    body: coverImageFile,
                });
                const { storageId } = await result.json();
                coverImageId = storageId;
            }

            await createService({
                title: formData.title,
                overview: formData.overview,
                tools: formData.tools,
                callToAction: formData.callToAction,
                coverImageId: coverImageId,
            });

            navigate('/admin/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to create service");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <BackButton />
            <h1 style={{ margin: '2rem 0' }}>Add New Service</h1>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Service Title *</label>
                    <input name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image *</label>
                    <input type="file" accept="image/*" onChange={handleCoverImageChange} required />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Overview *</label>
                    <textarea name="overview" rows={5} value={formData.overview} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

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

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Call to Action (Optional)</label>
                    <input name="callToAction" placeholder="Start a project" value={formData.callToAction} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-color)' }} />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--text-color)', color: 'var(--bg-color)', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Creating...' : 'Create Service'}
                </button>
            </form>
        </div>
    );
};

export default ServiceEditor;

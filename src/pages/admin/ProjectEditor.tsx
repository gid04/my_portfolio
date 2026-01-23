import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ProjectEditor = () => {
    const navigate = useNavigate();
    const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
    const createProject = useMutation(api.projects.create);

    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '', // still used for URL inputs if needed, but we prefer file uploads now
        role: '',
        industry: '',
        category: 'UI/UX Design',
        tags: '',
        tools: [] as string[],
        description: '',
        fullDescription: '',
        link: ''
    });

    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadError, setUploadError] = useState('');

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

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGalleryFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setUploadError('');

        try {
            // 1. Upload Cover Image
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

            // 2. Upload Gallery Images
            const galleryImageIds = [];
            for (const file of galleryFiles) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                const { storageId } = await result.json();
                galleryImageIds.push(storageId);
            }

            // 3. Create Project Record
            await createProject({
                title: formData.title,
                description: formData.description,
                fullDescription: formData.fullDescription,
                role: formData.role,
                industry: formData.industry,
                category: formData.category,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t.length > 0),
                tools: formData.tools,
                link: formData.link,
                imageUrl: formData.imageUrl, // legacy or external URL
                coverImageId: coverImageId,
                galleryImageIds: galleryImageIds,
            });

            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setUploadError('Failed to upload project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <BackButton />
            </div>

            <h1 style={{ marginBottom: '2rem' }}>Add New Project.</h1>
            {uploadError && <p style={{ color: 'red', marginBottom: '1rem' }}>{uploadError}</p>}

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Cover Image */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image *</label>
                    <input type="file" accept="image/*" onChange={handleCoverImageChange} required={!formData.imageUrl} />
                    {formData.imageUrl && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Or using external URL: {formData.imageUrl}</p>}
                </div>

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

                {/* Gallery */}
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Project Gallery (Images)</label>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryChange} style={{ marginBottom: '1rem' }} />

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {galleryFiles.map((file, idx) => (
                            <div key={idx} style={{ position: 'relative', width: '80px', height: '60px' }}>
                                <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                <button type="button" onClick={() => removeGalleryImage(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>X</button>
                            </div>
                        ))}
                    </div>
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
                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--text-color)', color: 'var(--bg-color)', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? 'Uploading...' : 'Publish Project'}
                    </button>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
                        Note: Large images might take a moment to upload.
                    </p>
                </div>

            </form>
        </div>
    );
};

export default ProjectEditor;

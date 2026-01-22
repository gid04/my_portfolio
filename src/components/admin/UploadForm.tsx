import { useState } from 'react';
import styles from './UploadForm.module.css';

const UploadForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        tags: '',
        link: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new project object
        const newProject = {
            id: Date.now(),
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        // Save to LocalStorage
        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        localStorage.setItem('projects', JSON.stringify([...existingProjects, newProject]));

        // Reset form
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            tags: '',
            link: ''
        });

        alert('Project uploaded successfully! (Saved to Local Storage)');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Project Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder="UI/UX, Mobile, React"
                    value={formData.tags}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="link">Project Link</label>
                <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className={styles.submitBtn}>
                Upload Project
            </button>
        </form>
    );
};

export default UploadForm;

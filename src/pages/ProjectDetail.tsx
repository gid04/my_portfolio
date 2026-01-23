import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Using the same dummy data logic or moving to a context would be better, but keeping simple for now.
const DUMMY_PROJECTS = [
    {
        id: 1,
        title: 'Fintech Dashboard',
        description: 'A comprehensive dashboard for managing financial assets.',
        fullDescription: 'This fintech dashboard allows users to track their assets, view real-time market data, and manage their portfolio with ease. The design focuses on clarity and data legibility, using a strict monochrome palette to reduce cognitive load.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        tags: ['UI/UX', 'Dashboard', 'Fintech'],
        link: '#'
    },
    {
        id: 2,
        title: 'E-commerce App',
        description: 'Mobile-first shopping experience with seamless checkout.',
        fullDescription: 'Designed for a seamless shopping experience on mobile devices. Key features include one-click checkout, personalized recommendations, and a clean product discovery interface.',
        imageUrl: 'https://images.unsplash.com/photo-1523206485973-279961db41e3?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile App', 'E-commerce', 'React Native'],
        link: '#'
    },
    {
        id: 3,
        title: 'Travel Agency',
        description: 'Immersive travel booking platform with virtual tours.',
        fullDescription: 'An immersive web platform that lets users explore destinations through virtual tours before booking. The design uses large typography and high-quality imagery to inspire travel.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        tags: ['Web Design', 'Travel', 'Minimalism'],
        link: '#'
    }
];

const ProjectDetail = () => {
    const { id } = useParams();
    const containerRef = useRef(null);

    // Try to find in localStorage first, then dummy
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const allProjects = [...savedProjects, ...DUMMY_PROJECTS];

    const project = allProjects.find(p => p.id.toString() === id);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    if (!project) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1>Project not found.</h1>
                <Link to="/" style={{ textDecoration: 'underline' }}>Go Home</Link>
            </div>
        );
    }

    return (
        <div ref={containerRef} style={{ minHeight: '100vh', paddingBottom: '10rem' }}>
            {/* Immersive Hero */}
            <div style={{ height: '60vh', overflow: 'hidden', position: 'relative' }}>
                <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', y }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    background: 'linear-gradient(to top, var(--bg-color), transparent)'
                }}></div>

                <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <BackButton />
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            <div className="container" style={{ marginTop: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Details</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Role</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>UI/UX Design</span>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Industry</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.tags[0] || 'Tech'}</span>
                            </div>

                            <div>
                                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Tags</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {project.tags.map((tag: string, i: number) => (
                                        <span key={i} style={{
                                            background: 'var(--bg-secondary)',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem'
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            {project.fullDescription || project.description}
                        </p>

                        {project.gallery && project.gallery.length > 0 && (
                            <div style={{ margin: '4rem 0' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Gallery</h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {project.gallery.map((img: string, idx: number) => (
                                        <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                            <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.link && (
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'inline-block',
                                    marginTop: '3rem',
                                    background: 'var(--text-color)',
                                    color: 'var(--bg-color)',
                                    padding: '1rem 2.5rem',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                Visit Live Site
                            </motion.a>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;

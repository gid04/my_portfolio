import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import GalleryStack from '../components/ui/GalleryStack';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

// Using the same dummy data logic or moving to a context would be better, but keeping simple for now.
const ProjectDetail = () => {
    const { id } = useParams();
    const containerRef = useRef(null);

    const project = useQuery(api.projects.getById, { id: id as Id<"projects"> });

    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    if (!project) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1>Loading Project...</h1>
                <Link to="/" style={{ textDecoration: 'underline' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div ref={containerRef} style={{ minHeight: '100vh', paddingBottom: '10rem' }}>
            {/* Mobile Sticky Back Button */}
            <div className="mobile-fixed-top-left mobile-only">
                <BackButton />
            </div>

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
                    <div style={{ marginBottom: '2rem' }} className="desktop-only">
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
                <div className="responsive-grid-sidebar">

                    {/* Sticky Sidebar */}
                    <div className="sticky-sidebar">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Details</h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Role</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.role || 'UI/UX Design'}</span>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Industry</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{project.industry ? project.industry : (project.tags[0] || 'Tech')}</span>
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

                            {project.link && (
                                <div style={{ marginTop: '2rem' }}>
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'block',
                                            textAlign: 'center',
                                            background: 'var(--text-color)',
                                            color: 'var(--bg-color)',
                                            padding: '1rem',
                                            borderRadius: '50px',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        Visit Live Site
                                    </motion.a>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mobile-center"
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '4rem', whiteSpace: 'pre-wrap' }}>
                            {project.fullDescription || project.description}
                        </p>

                        {project.gallery && project.gallery.length > 0 && (
                            <div style={{ margin: '4rem 0' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Gallery</h3>
                                <GalleryStack images={project.gallery} />
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;

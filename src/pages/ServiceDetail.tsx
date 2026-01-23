import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import { motion } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const ServiceDetail = () => {
    const { id } = useParams();
    const service = useQuery(api.content.getServiceById, { id: id as any });

    if (!service) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <h1>Loading Service...</h1>
                <Link to="/" style={{ textDecoration: 'underline' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '10rem' }}>
            {/* Immersive Hero */}
            <div style={{ height: '50vh', overflow: 'hidden', position: 'relative' }}>
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={service.imageUrl || '/images/placeholder.jpg'}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, var(--bg-color), transparent 80%)'
                }}></div>

                <div className="container" style={{ position: 'absolute', bottom: '4rem', left: '0', right: '0' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <BackButton />
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                        {service.title}
                    </motion.h1>
                </div>
            </div>

            <div className="container" style={{ marginTop: '4rem' }}>
                <div className="responsive-grid-sidebar">

                    {/* Sidebar / Tools */}
                    <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass"
                            style={{ padding: '2rem', borderRadius: '16px' }}
                        >
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Tools & Technologies</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {service.tools?.map((tool: string, i: number) => (
                                    <span key={i} style={{
                                        background: 'var(--bg-secondary)',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem'
                                    }}>{tool}</span>
                                ))}
                            </div>

                            {service.callToAction && (
                                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                    <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Interested in this service?</p>
                                    <a href="mailto:hello@gideon.design" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.8rem', borderRadius: '8px', background: 'var(--text-color)', color: 'var(--bg-color)', fontWeight: 'bold', textDecoration: 'none' }}>
                                        {service.callToAction}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Service Overview</h2>
                        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                            {service.overview}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;

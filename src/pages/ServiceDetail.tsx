import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ParallaxCarousel from '../components/ui/ParallaxCarousel';

// Data could be moved to a shared file, but keeping here for speed/simplicity as per current pattern
const SERVICE_DATA: Record<string, any> = {
    'ui-ux-design': {
        title: "UI/UX Design",
        images: ["https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=2574&auto=format&fit=crop", "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2536&auto=format&fit=crop"],
        overview: "I craft intuitive and aesthetically pleasing digital experiences that drive engagement and business growth.",
        description: "My UI/UX design process is rooted in user empathy and data-driven insights. I believe that great design is invisible—it just works. From complex enterprise dashboards to consumer-facing mobile apps, I focus on clarity, usability, and delight.",
        experience: [
            { year: "2023", highlight: "Led design for FinTech App (50k+ users)" },
            { year: "2022", highlight: "Redesigned E-commerce checkout flow (+20% conversion)" }
        ],
        tools: ["Figma", "Sketch", "Principle", "Adobe XD"],
        relatedProjects: [1, 2] // IDs from Home.tsx
    },
    'brand-strategy': {
        title: "Brand Strategy",
        images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop", "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop"],
        overview: "Defining the voice, visual identity, and strategic direction of your business.",
        description: "A brand is more than just a logo. It’s the feeling people get when they interact with your business. I help companies define their core values and translate them into a cohesive visual language.",
        experience: [
            { year: "2023", highlight: "Rebranding for logistics startup" },
            { year: "2021", highlight: "Brand identity for local coffee chain" }
        ],
        tools: ["Illustrator", "Photoshop", "Miro", "Notion"],
        relatedProjects: [3]
    },
    'web-design': {
        title: "Web Design",
        images: ["https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop", "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop"],
        overview: "Building responsive, performant, and accessible websites that convert.",
        description: "Your website is your digital storefront. I design and build modern websites that look stunning on all devices and load instantly.",
        experience: [
            { year: "2024", highlight: "Portfolio site for Architect" },
            { year: "2023", highlight: "SaaS Landing Page Series" }
        ],
        tools: ["React", "Webflow", "Framer", "CSS/HTML"],
        relatedProjects: [1, 3]
    },
    'prototyping': {
        title: "Prototyping",
        images: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop", "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2500&auto=format&fit=crop"],
        overview: "Bringing ideas to life with high-fidelity interactive mockups.",
        description: "Static screens can't tell the full story. I create realistic prototypes to test interactions, validate flows, and get stakeholder buy-in before a single line of code is written.",
        experience: [
            { year: "2023", highlight: "Mobile Prototype for Travel App" },
            { year: "2022", highlight: "Micro-interaction library for UI Kit" }
        ],
        tools: ["ProtoPie", "Figma", "After Effects"],
        relatedProjects: [2]
    }
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const service = slug ? SERVICE_DATA[slug] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1>Service not found.</h1>
                <Link to="/" style={{ textDecoration: 'underline' }}>Go Home</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '10rem' }}>
            {/* Hero */}
            <div style={{ height: '70vh', position: 'relative', overflow: 'hidden' }}>
                <ParallaxCarousel images={service.images || [service.heroImage]} />
                <div className="container" style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '0',
                    zIndex: 2,
                    padding: '0 2rem',
                    pointerEvents: 'none' // allow click through? No, links need events.
                }}>
                    <div style={{ pointerEvents: 'auto' }}>
                        <Link to="/#about" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                            &larr; Back to Services
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', color: 'white', fontWeight: 900, marginBottom: '1rem' }}
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px' }}
                        >
                            {service.overview}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    {/* Main Content */}
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                            {service.description}
                        </p>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Experience</h3>
                        <div style={{ marginBottom: '3rem' }}>
                            {service.experience.map((exp: any, i: number) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    marginBottom: '1rem',
                                    borderBottom: '1px solid var(--border-color)',
                                    paddingBottom: '1rem'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>{exp.year}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>{exp.highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Tools */}
                    <div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Tools used</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {service.tools.map((tool: string, i: number) => (
                                    <span key={i} style={{
                                        background: 'var(--bg-color)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: '6rem',
                    textAlign: 'center',
                    background: 'var(--bg-secondary)',
                    padding: '4rem 2rem',
                    borderRadius: '30px'
                }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Interested in {service.title}?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Let's discuss how I can help you achieve your goals.</p>
                    <a href="mailto:contact@example.com" style={{
                        display: 'inline-block',
                        background: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        transition: 'transform 0.3s ease'
                    }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Get a Free Quotation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;

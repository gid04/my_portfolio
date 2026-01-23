import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import About from '../components/ui/About';
import Experience from '../components/ui/Experience';
import Contact from '../components/ui/Contact';
import ProjectCard from '../components/ui/ProjectCard';
import Hobbies from '../components/ui/Hobbies';
import { motion } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const DUMMY_PROJECTS = [
    {
        id: "1",
        title: 'Fintech Dashboard',
        description: 'A comprehensive dashboard for managing financial assets.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        tags: ['UI/UX', 'Dashboard'],
        link: '#'
    },
    {
        id: "2",
        title: 'E-commerce App',
        description: 'Mobile-first shopping experience with seamless checkout.',
        imageUrl: 'https://images.unsplash.com/photo-1523206485973-279961db41e3?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile', 'Retail'],
        link: '#'
    },
    {
        id: "3",
        title: 'Travel Agency',
        description: 'Immersive travel booking platform with virtual tours.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        tags: ['Web', 'Travel'],
        link: '#'
    }
];

const Home = () => {
    const convexProjects = useQuery(api.projects.get) || [];
    const projects = [...convexProjects, ...DUMMY_PROJECTS] as any[];

    return (
        <div>
            <Hero />
            <About />
            <Experience />

            <section id="projects" className="section-padding container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Selected Works.</h2>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>2023 - 2026</span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        columnGap: '2rem',
                        rowGap: '4rem'
                    }}
                >
                    {projects.map(project => (
                        <motion.div
                            key={project._id || project.id}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <ProjectCard
                                id={project._id || project.id}
                                title={project.title}
                                description={project.description}
                                imageUrl={project.imageUrl || ''}
                                tags={project.tags}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link to="/projects" className="btn-primary" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        background: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>
                        View All Projects
                    </Link>
                </div>
            </section>

            <Hobbies />

            <Contact />
        </div>
    );
};

export default Home;

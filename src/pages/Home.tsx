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

const Home = () => {
    const projects = useQuery(api.projects.get) || [];

    return (
        <div>
            <Hero />
            <About />
            <Experience />

            <section id="projects" className="section-padding container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Top Projects.</h2>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Selected Work</span>
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
                    {projects.slice(0, 3).map(project => (
                        <motion.div
                            key={project._id}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <ProjectCard
                                id={project._id}
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

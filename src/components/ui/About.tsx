import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import SkillCard from './SkillCard';
import { useRef } from 'react';

const SERVICES = [
    {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        image: "/images/ui-ux-cover.jpg",
        description: "Crafting intuitive and aesthetically pleasing digital experiences."
    },
    {
        title: "Brand Strategy",
        slug: "brand-strategy",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
        description: "Defining the unique voice and visual identity of your business."
    },
    {
        title: "Web Design",
        slug: "web-design",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop",
        description: "Building responsive, high-performance websites that convert."
    },
    {
        title: "Prototyping",
        slug: "prototyping",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        description: "Bringing ideas to life with high-fidelity interactive mockups."
    }
];

const SKILLS = [
    {
        skill: "User Research",
        description: "Understanding user needs through interviews, surveys, and usability testing to inform design decisions."
    },
    {
        skill: "Problem Solving",
        description: "Breaking down complex problems into simple, elegant design solutions that improve user efficiency."
    },
    {
        skill: "Communication",
        description: "Effective collaboration with stakeholders and developers to ensure the vision is executed correctly."
    },
    {
        skill: "Team Work",
        description: "Thriving in cross-functional teams, fostering a culture of feedback and continuous improvement."
    }
];

const About = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="about" className="section-padding">
            <div className="container" style={{ marginBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About Me.</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        I am a passionate UI/UX designer with a keen eye for aesthetics and a deep understanding of user behavior.
                        I blend strategy, creativity, and functionality to bring ideas to life.
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Scroll Services */}
            <div style={{ marginBottom: '6rem' }}>
                <div className="container">
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Services</h3>
                </div>

                <div
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '2rem',
                        padding: '0 max(1rem, calc((100vw - 1400px) / 2))', /* Center visually on large screens, or dynamic padding */
                        paddingBottom: '2rem',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none', /* Firefox */
                        msOverflowStyle: 'none'  /* IE/Edge */
                    }}
                    className="hide-scrollbar" // Add class for hidden scrollbar styles if needed
                >
                    {/* Add padding start manually if needed for container alignment or use container logic above */}
                    {/* We use padding-left/right on the scroll container to align the first item with the grid */}
                    {SERVICES.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                            slug={service.slug}
                        />
                    ))}
                </div>
            </div>

            <div className="container">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Soft Skills</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {SKILLS.map((skill, index) => (
                        <SkillCard
                            key={index}
                            skill={skill.skill}
                            description={skill.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;

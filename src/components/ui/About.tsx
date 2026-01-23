import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import SkillCard from './SkillCard';
import { useRef } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

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
    const services = useQuery(api.content.getServices) || [];

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
                        padding: '0 max(1rem, calc((100vw - 1400px) / 2))',
                        paddingBottom: '2rem',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    className="hide-scrollbar"
                >
                    {services.map((service: any) => (
                        <ServiceCard
                            key={service._id}
                            id={service._id}
                            title={service.title}
                            description={service.overview}
                            image={service.imageUrl}
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

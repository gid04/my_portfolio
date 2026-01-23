import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import SkillCard from './SkillCard';
import { useRef } from 'react';

// ... imports
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const About = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const services = useQuery(api.content.getServices) || [];

    // ... (rest of component, mapping 'services' instead of SERVICES constant)

    return (
        <section id="about" className="section-padding">
            {/* ... */}
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
                {services.map((service: any, index: number) => (
                    <ServiceCard
                        key={service._id}
                        title={service.title}
                        description={service.overview}
                        image={service.imageUrl}
                        slug={service.title.toLowerCase().replace(/\s+/g, '-')}
                    />
                ))}
            </div>
            {/* ... */}
        </section>
    );
};
            </div >

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
        </section >
    );
};

export default About;

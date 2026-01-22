
import { motion } from 'framer-motion';

const EXPERIENCES = [
    {
        company: "Freelance",
        role: "Senior UI/UX Designer",
        date: "2023 - Present",
        description: "Leading design projects for various clients, focusing on branding and web applications."
    },
    {
        company: "Tech Solutions Inc.",
        role: "Product Designer",
        date: "2021 - 2023",
        description: "Collaborated with engineering sizing to launch a fintech dashboard used by 50k+ users."
    },
    {
        company: "Creative Studio",
        role: "Junior Web Designer",
        date: "2020 - 2021",
        description: "Assisted in creating visual assets and landing pages for marketing campaigns."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section-padding container">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}
            >
                Experience.
            </motion.h2>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                {/* Timeline Line */}
                <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'var(--border-color)'
                }}></div>

                {EXPERIENCES.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        style={{
                            marginBottom: '3rem',
                            paddingLeft: '3rem',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            left: '11px',
                            top: '5px',
                            width: '20px',
                            height: '20px',
                            background: 'var(--bg-color)',
                            border: '4px solid var(--text-color)',
                            borderRadius: '50%',
                            zIndex: 1
                        }}></div>

                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>{exp.date}</span>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{exp.role}</h3>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '400', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{exp.company}</h4>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;

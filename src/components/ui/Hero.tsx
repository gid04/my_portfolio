import { motion } from 'framer-motion';
import LiquidText from './LiquidText';
import styles from './Hero.module.css';
import { useEffect, useState } from 'react';

const TypingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(interval);
        }, 50); // Speed of typing
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayedText}</span>;
};

const Hero = () => {
    return (
        <section className={`${styles.hero} container`}>
            <div className={styles.grid}>
                {/* Content Side */}
                <div className={styles.content}>
                    <motion.p
                        className={styles.intro}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Gideon Chinonso AMOUSSOU-CHOUH
                    </motion.p>
                    <motion.div
                        className={styles.titleWrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className={styles.title}>
                            <LiquidText><TypingText text="UX/UI Designer" /></LiquidText> <br />
                            <span style={{ opacity: 0.5 }}>& Brand Strategist.</span>
                        </h1>
                    </motion.div>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        Creating meaningful brands and interactive digital experiences that float above the noise.
                    </motion.p>
                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 }}
                    >
                        <a href="#projects" className={styles.primaryBtn}>See my works</a>
                        <a href="#contact" className={styles.secondaryBtn}>Get in Touch</a>
                    </motion.div>
                </div>

                {/* Image Side */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <div className={styles.imageContainer}>
                        <img src="/images/profile.jpg" alt="Gideon" className={styles.profileImage} />
                        <div className={styles.glow}></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

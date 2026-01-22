import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './SkillCard.module.css';

interface SkillCardProps {
    skill: string;
    description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, description }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }

    return (
        <div
            className={styles.flipContainer}
            onClick={handleFlip}
            onMouseEnter={() => !isFlipped && setIsFlipped(true)}
            onMouseLeave={() => isFlipped && setIsFlipped(false)}
        >
            <motion.div
                className={styles.flipper}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                {/* Front */}
                <div className={`${styles.front} glass`}>
                    <h3>{skill}</h3>
                    <span className={styles.hint}>Hover to reveal</span>
                </div>

                {/* Back */}
                <div className={`${styles.back} glass`}>
                    <p>{description}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default SkillCard;

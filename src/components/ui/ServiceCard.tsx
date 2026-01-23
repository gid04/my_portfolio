import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, image }) => {
    return (
        <motion.div
            className={styles.cardContainer}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link to={`/service/${id}`} className={styles.link}>
                <div className={styles.card}>
                    <img src={image} alt={title} className={styles.bgImage} />
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <span className={styles.label}>Service</span>
                            <h3 className={styles.title}>{title}</h3>
                        </div>

                        <div className={styles.footer}>
                            <p className={styles.description}>{description}</p>
                            <span className={styles.ctaButton}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ServiceCard;

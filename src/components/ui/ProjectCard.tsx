import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

interface ProjectProps {
    id?: number | string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
}

const ProjectCard: React.FC<ProjectProps> = ({ id, title, description, imageUrl, tags }) => {
    const cardContent = (
        <motion.div
            className={`${styles.card} glass`}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={title} className={styles.image} />
                <div className={styles.overlay}>
                    <span>View Project</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </motion.div>
    );

    if (id) {
        return <Link to={`/project/${id}`}>{cardContent}</Link>;
    }

    return cardContent;
};

export default ProjectCard;

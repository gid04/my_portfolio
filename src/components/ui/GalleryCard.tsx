
import { Link } from 'react-router-dom';
import styles from './GalleryCard.module.css';

interface GalleryCardProps {
    id: number | string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    category?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ id, title, description, imageUrl, tags }) => {
    return (
        <Link to={`/project/${id}`}>
            <div className={styles.card}>
                <img src={imageUrl} alt={title} className={styles.image} />

                {/* Liquid Glass Overlay */}
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.arrow}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </div>

                        <p className={styles.description}>{description}</p>

                        <div className={styles.tags}>
                            {tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GalleryCard;

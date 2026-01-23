import { motion } from 'framer-motion';
import styles from './GalleryStack.module.css';

interface GalleryStackProps {
    images: string[];
}

const Card = ({ image, index, total }: { image: string, index: number, total: number }) => {
    // Sticky 'top' calculation to create the stack effect
    // We start a bit lower to clear any headers (e.g., top: 100px)
    // Then add offset per card so they stack visibly.
    const topOffset = 120 + (index * 40);

    return (
        <div
            className={styles.cardContainer}
            style={{
                position: 'sticky',
                top: `${topOffset}px`,
                // Margin bottom ensures we have enough scroll space to see the next card coming up
                // and to let them unstack naturally if desired, or just space them out in the flow.
                // Using a calculation similar to Hobbies to ensure spacing.
                marginBottom: `${(total - index) * 20}px`,
                zIndex: index
            }}
        >
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <img src={image} alt={`Project gallery ${index + 1}`} className={styles.image} />
                <div className={styles.overlay}>Image {index + 1} of {total}</div>
            </motion.div>
        </div>
    );
};

const GalleryStack: React.FC<GalleryStackProps> = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className={styles.stackWrapper}>
            {images.map((image, index) => (
                <Card
                    key={index}
                    image={image}
                    index={index}
                    total={images.length}
                />
            ))}
        </div>
    );
};

export default GalleryStack;

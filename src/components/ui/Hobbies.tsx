import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hobbies.module.css';

const HOBBIES = [
  {
    title: "Basketball",
    description: "The court is my second home. It teaches me teamwork, resilience, and the importance of practice.",
    color: "#E85632", // keeping it dark/consistent with theme? Let's use image overlays.
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop",
    tags: ["Teamwork", "Strategy", "Fitness"]
  },
  {
    title: "Movies & Series",
    description: "Immersing myself in stories. My favorite genres include Action, Crime, Drama, and Romance.",
    color: "#2E2E3A",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
    tags: ["Action", "Crime", "Drama", "Romantic"]
  },
  {
    title: "Music",
    description: "From Lo-Fi beats for focusing to energetic tracks for workouts, music fuels my creativity.",
    color: "#1DB954",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2700&auto=format&fit=crop",
    tags: ["Focus", "Inspiration", "Rhythm"]
  },
  {
    title: "Drawing",
    description: "Sketching ideas and bringing imagination to paper. It's the foundation of my design process.",
    color: "#F4D03F",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop",
    tags: ["Sketching", "Art", "Creativity"]
  }
];

const Card = ({ title, description, image, tags, index, total }: any) => {
  // Sticky 'top' calculation to create the stack effect
  // Each card sticks slightly lower than the previous one to show the "stack" header
  const topOffset = 150 + (index * 40); 
  
  return (
    <div 
      className={styles.cardContainer}
      style={{ 
        position: 'sticky', 
        top: `${topOffset}px`,
        marginBottom: `${(total - index) * 20}px` // Spacer to ensure scrolling room
      }}
    >
        <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.bgImage} />
                <div className={styles.overlay} />
            </div>
            
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.index}>0{index + 1}.</span>
                    <h2>{title}</h2>
                </div>
                
                <div className={styles.body}>
                    <p>{description}</p>
                    <div className={styles.tags}>
                        {tags.map((tag: string, i: number) => (
                            <span key={i} className="glass">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

const Hobbies = () => {
  return (
    <section className="container section-padding" style={{ position: 'relative' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="section-title"
              style={{ fontSize: '3rem', marginBottom: '1rem' }}
            >
                Beyond Design.
            </motion.h2>
            <p style={{ color: 'var(--text-secondary)' }}>What keeps me inspired offline.</p>
        </div>

        <div className={styles.stackWrapper}>
            {HOBBIES.map((hobby, index) => (
                <Card 
                    key={index}
                    index={index}
                    total={HOBBIES.length}
                    {...hobby}
                />
            ))}
        </div>
    </section>
  );
};

export default Hobbies;

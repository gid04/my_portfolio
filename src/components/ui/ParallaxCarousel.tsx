import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface ParallaxCarouselProps {
    images: string[];
}

const ParallaxCarousel: React.FC<ParallaxCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    // Parallax effect
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]); // Move down as we scroll

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <motion.div style={{ width: '100%', height: '120%', y, position: 'relative', top: '-10%' }}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="Service Background"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            filter: 'brightness(0.6)'
                        }}
                    />
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ParallaxCarousel;

import { motion } from 'framer-motion';


// Generate random floating elements
const FloatingShape = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 100; // start random position
    const randomDuration = 10 + Math.random() * 20; // 10-30s duration
    const size = 50 + Math.random() * 150; // random size

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: `${randomX}%`,
                bottom: '-20%',
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
                zIndex: -1,
                pointerEvents: 'none',
            }}
            animate={{
                y: [0, -window.innerHeight * 1.5],
                opacity: [0, 0.5, 0],
                rotate: [0, 360],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: delay,
                ease: 'linear',
            }}
        />
    );
};

const AntigravityBackground = () => {
    // Client-side only rendering to avoid random hydration mismatch, though in purely SPA Vite it matters less.
    // We'll just render a few fixed shapes for now.
    const shapes = Array.from({ length: 15 }).map((_, i) => i);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {shapes.map((i) => (
                <FloatingShape key={i} delay={i * 2} />
            ))}
        </div>
    );
};

export default AntigravityBackground;

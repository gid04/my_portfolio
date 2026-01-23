import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const ParallaxCarousel = ({ images }: { images: string[] }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={targetRef} style={{ position: "relative", height: "300vh" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <motion.div style={{ x, display: "flex", gap: "2rem" }} className="flex">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            style={{
                                minWidth: "60vw",
                                height: "60vh",
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}
                        >
                            <img
                                src={img}
                                alt={`Slide ${idx}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ParallaxCarousel;

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ProjectCard from '../components/ui/ProjectCard';
import styles from './AllProjects.module.css';

// Extended Dummy Data to simulate a full gallery
const ALL_PROJECTS = [
    {
        id: 1,
        title: 'Fintech Dashboard',
        description: 'A comprehensive dashboard for managing financial assets.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        tags: ['UI/UX', 'Dashboard'],
        category: 'UI/UX Design'
    },
    {
        id: 2,
        title: 'E-commerce App',
        description: 'Mobile-first shopping experience with seamless checkout.',
        imageUrl: 'https://images.unsplash.com/photo-1523206485973-279961db41e3?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile', 'Retail'],
        category: 'Prototyping'
    },
    {
        id: 3,
        title: 'Travel Agency',
        description: 'Immersive travel booking platform with virtual tours.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        tags: ['Web', 'Travel'],
        category: 'Web Design'
    },
    {
        id: 4,
        title: 'Health & Fitness Tracker',
        description: 'Tracking vitals and workouts with a clean, dark mode interface.',
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile', 'Health'],
        category: 'UI/UX Design'
    },
    {
        id: 5,
        title: 'Architecture Portfolio',
        description: 'Minimalist site showcasing modern architectural projects.',
        imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop',
        tags: ['Web', 'Portfolio'],
        category: 'Web Design'
    },
    {
        id: 6,
        title: 'Crypto Exchange',
        description: 'Real-time trading platform with advanced charting.',
        imageUrl: 'https://images.unsplash.com/photo-1621763172657-bc811f81b6af?q=80&w=2670&auto=format&fit=crop',
        tags: ['Dashboard', 'Fintech'],
        category: 'UI/UX Design'
    },
    {
        id: 7,
        title: 'Restaurant Delivery',
        description: 'Hyper-local food delivery app with real-time tracking.',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile', 'Food'],
        category: 'Prototyping'
    },
    {
        id: 8,
        title: 'Eco-Friendly Brand',
        description: 'Brand identity and packaging for sustainable goods.',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=2626&auto=format&fit=crop',
        tags: ['Branding', 'Eco'],
        category: 'Brand Strategy'
    }
];

const CATEGORIES = ["All", "UI/UX Design", "Web Design", "Brand Strategy", "Prototyping"];

const AllProjects = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = useMemo(() => {
        return ALL_PROJECTS.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = activeCategory === "All" || project.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>All Projects.</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Explore my latest work across design and development.</p>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                {/* Search */}
                <div className={`glass ${styles.searchWrapper}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`${styles.filterChip} ${activeCategory === cat ? styles.active : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className={styles.masonryGrid}>
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={styles.masonryItem}
                        >
                            <ProjectCard
                                id={project.id}
                                title={project.title}
                                description={project.description}
                                imageUrl={project.imageUrl}
                                tags={project.tags}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
                    No projects found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default AllProjects;

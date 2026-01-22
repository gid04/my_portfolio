import { useLocation, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                {/* Back Button Logic */}
                {!isHome ? (
                    <Link to="/" className={styles.backButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <span>Back</span>
                    </Link>
                ) : (
                    <Link to="/">Gideon<span>.</span></Link>
                )}
            </div>
            <ul className={styles.navLinks}>
                <li><a href="/#about">About</a></li>
                <li><a href="/#experience">Experience</a></li>
                <li><a href="/#projects">Work</a></li>
                <li><a href="/#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;

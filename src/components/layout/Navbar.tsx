import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    // const location = useLocation();
    // const isHome = location.pathname === '/';

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">Gideon<span>.</span></Link>
            </div>
            <ul className={styles.navLinks}>
                <li><Link to="/#about">About</Link></li>
                <li><Link to="/#experience">Experience</Link></li>
                <li><Link to="/#projects">Work</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import FloatingDock from './FloatingDock';
import AntigravityBackground from './AntigravityBackground';
import MouseFollower from './MouseFollower';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <MouseFollower />
      <AntigravityBackground />
      <main className={styles.mainContent}>
        {children}
      </main>
      <FloatingDock />
    </div>
  );
};

export default Layout;

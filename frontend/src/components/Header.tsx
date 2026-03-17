import styles from '../styles/Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <span className={styles.logo}>start-ups collection</span>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/startups">Start-ups</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

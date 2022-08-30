import styles from './NavBar.module.scss';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <Container>
        <div className={styles.homeIconWrapper}>
          <span>Waiter.app</span>
        </div>
        <ul className={styles.linksListWrapper}>
          <li><NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} to="/">Home</NavLink></li>
        </ul>
      </Container>
    </nav>
  );
};

  export default NavBar;
import styles from './Footer.module.scss';
import { Container } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>
          Copyright © blazejew.ski 2022
        </p>
      </Container>
    </footer>
  );
};

  export default Footer;
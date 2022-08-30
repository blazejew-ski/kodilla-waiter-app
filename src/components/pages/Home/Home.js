import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';

const Home = () => {


  const tables = useSelector(getAllTables);

  return (
    <section className={styles.home}>
      <Container>
        <h2 className={styles.heading}>Browse tables</h2>
        <ul>
          {tables.map(table => (
            <li key={table.id} className={styles.table}>
              <div className={styles.tableLeft}>
                <span className={styles.tableTitle}>Table <span>{table.id}</span></span>
                <span className={styles.tablestatus}>Status: <span>{table.status}</span></span>
              </div>
              <Button className={styles.tableButton}>
                <Link to={'/table/' + table.id} className={styles.tableLink}>Show more</Link>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );

};

export default Home;
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Button, Container, Spinner } from 'react-bootstrap';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { useEffect, useReducer } from 'react';

const Home = () => {
  const tablesData = useSelector(getAllTables);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
    console.log('forceUpdate');
  }
//   if (tablesData.length === 0) {
//     setTimeout(() => {
//       handleClick()
//     }, 1500);

// // Without the forceupdate, the getAllTables was always returning empty, i had to improvise.

//     return (
//       <div className={styles.spinner}>
//         <Spinner animation="border" variant="primary"/>
//       </div>
//     );
//   }

  useEffect(() => {
    if (tablesData.length === 0) {
      setTimeout(() => {
        handleClick()
      }, 1500);
    }
  }, [tablesData.length === 0])

  console.log('tablesData :', tablesData);
  return (
    <section className={styles.home}>
      <Container>
        <ul>
          {tablesData.map(table => (
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
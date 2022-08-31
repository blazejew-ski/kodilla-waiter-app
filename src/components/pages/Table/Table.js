import { Button, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTableById, updateTableApi } from '../../../redux/tablesRedux';
import { useParams } from 'react-router';
import { Navigate, useNavigate  } from 'react-router-dom';
import styles from './Table.module.scss';
import { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

const Table = props => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch();
  const {tableId} = useParams();
  const id = tableId;
  const table = useSelector(state => getTableById(state, tableId));

  const [people, setPeople] = useState(table.people);
  const [maxPeople, setPeopleMax] = useState(table.maxPeople);
  const [bill, setBill] = useState(table.bill);
  const [status, setStatus] = useState(table.status);
  const navigate = useNavigate();
  if(!table) return <Navigate to="/404" />

  const setPeopleMaxInput = (value) => {
    console.log('on start: ' + value + ' / ' + maxPeople);
    if (parseInt(maxPeople) <= parseInt(value) ) {
      setPeople(maxPeople)
      console.log('if bigger: ' + value + ' / ' + maxPeople);
    } else if (parseInt(value) <= parseInt(maxPeople)) {
      setPeople(value);
      console.log('if smaller: ' + value + ' / ' + maxPeople);
    } else {
      setPeople('0');
    }
  }

  function handleClick() {
    forceUpdate();
    console.log('forceUpdate');
  }
  if (table.length === 0) {
    setTimeout(() => {
      handleClick()
    }, 1500);

// Without the forceupdate, the getAllTables was always returning empty, i had to improvise.

    return (
      <div className={styles.spinner}>
        <Spinner animation="border" variant="primary"/>
      </div>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('dispatch updateTableApi: ' + id + status + people + maxPeople + bill);
    dispatch(updateTableApi({id, status, people, maxPeople, bill}));
    console.log('dispatch-done updateTableApi: ' + id + status + people + maxPeople + bill);
    // navigate('/');
  };

  return (
    <Container>
      <section className={styles.tableWrapper}>
        <form onSubmit={handleSubmit} key={id} className={styles.table}>
          <h3>
            <span>Table:</span> {id}
          </h3>
          <div className={styles.tableLine}>
            <span>Status:</span>
            <Form.Select aria-label="Default select example" value={status} onChange={e => setStatus(e.target.value)}  className={styles.formSelect}>
              <option>Select table status</option>
              <option value="Busy">Busy</option>
              <option value="Free">Free</option>
              <option value="Needs cleaning">Needs cleaning</option>
            </Form.Select>
          </div>
          <div className={styles.tableLine}>
            <span>People:</span>
            <Form.Control className={styles.formInput} type="text" value={people} onChange={e => setPeopleMaxInput(e.target.value)} />
             /
             <Form.Control className={styles.formInput} plaintext readOnly defaultValue={table.maxPeople} />
          </div>
          <div className={styles.tableLine}>
            <span>Bill:</span> <Form.Control className={styles.formInputBill}  type="text" value={bill} onChange={e => setBill(e.target.value)} />
          </div>
          <div className={styles.tableLine}>
          <Button type="submit">
              Update table
          </Button>
          </div>
        </form>
      </section>
    </Container>
  );

};

export default Table;
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTableById, updateTable } from '../../../redux/tablesRedux';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import styles from './Table.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

const Table = props => {
  const dispatch = useDispatch();
  const {tableId} = useParams();
  const id = tableId;
  const table = useSelector(state => getTableById(state, tableId));

  const [people, setPeople] = useState(table.people);
  const [maxPeople, setPeopleMax] = useState(table.maxPeople);
  const [bill, setBill] = useState(table.bill);
  const [status, setStatus] = useState(table.status);
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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateTable({id, status, people, maxPeople, bill}));
    console.log('dispatch updateTable: ' + id + status + people + maxPeople + bill);
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
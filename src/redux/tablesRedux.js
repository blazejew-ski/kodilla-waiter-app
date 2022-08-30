//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const LOAD_TABLES = createActionName('LOAD_TABLES');

// action creators
export const updateTable = payload => ({
  type: UPDATE_TABLE,
  payload: {
    id: payload.id,
    status: payload.status,
    people: payload.people,
    maxPeople: payload.maxPeople,
    bill: payload.bill
  } });
export const loadTables = payload => ({ type: LOAD_TABLES, payload });
export const fetchTables = (dispatch) => {
    console.log('starting data import');
    fetch('http://localhost:3131/api/tables')
    .then(response => response.json())
    .then(tables => {
      dispatch(loadTables(tables));
      console.log('data loaded');
    })
  };


const tablesRedux = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE:
      return statePart.map((table) => {
        if (table.id === action.payload.id) {
          return Object.assign({}, table, {
            id: action.payload.id,
            status: action.payload.status,
            people: action.payload.people,
            maxPeople: action.payload.maxPeople,
            bill: action.payload.bill
          })
        }
        return table
      })
    case LOAD_TABLES:
      return [...action.payload]
    default:
      return statePart;
  };
};
export default tablesRedux;
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
  payload
  // payload: {
  //   id: payload.id,
  //   status: payload.status,
  //   people: payload.people,
  //   maxPeople: payload.maxPeople,
  //   bill: payload.bill
  // }
});

export const fetchTables = () => {
  return (dispatch) => {
    console.log('starting data import');
    fetch('http://localhost:3131/api/tables')
      .then(response => response.json())
      .then(tables => {
        dispatch(loadTables(tables));
        console.log('data loaded');
      })
  }
}

export const updateTableApi = (payload) => {
  return (dispatch) => {
    console.log('payload updateTableApi: ', payload);
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...payload }),
    };
    console.log('options updateTableApi: ', options);
    fetch(`http://localhost:3131/api/tables/${payload.id}`, options)
      .then(() => dispatch(updateTable({...payload})))
      .then(console.log('payload: ', payload))
      // .then(() => dispatch(loadTables(payload.json())))
      // .then(() => getAllTables({...payload}))
  }
}
export const loadTables = payload => ({ type: LOAD_TABLES, payload });

const tablesRedux = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE:
      // return statePart.map((table) => {
      //   if (table.id === action.payload.id) {
      //     return Object.assign({}, table, {
      //       id: action.payload.id,
      //       status: action.payload.status,
      //       people: action.payload.people,
      //       maxPeople: action.payload.maxPeople,
      //       bill: action.payload.bill
      //     })
      //   }
      //   return table
      // })
      return statePart.map(table => (table.id === action.payload.id ? {...table, ...action.payload } : table ));
    case LOAD_TABLES:
      return [...action.payload]
    default:
      return statePart;
  };
};
export default tablesRedux;
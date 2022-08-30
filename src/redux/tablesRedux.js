import shortid from "shortid";

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

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
    default:
      return statePart;
  };
};
export default tablesRedux;
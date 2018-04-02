const ADD = "todo/ADD";
const ADD_SUCCESS = "todo/ADD_SUCCESS";
const ADD_FAIL = "todo/ADD_FAIL";

const DELETE = "todo/DELETE";
const DELETE_SUCCESS = "todo/DELETE_SUCCESS";
const DELETE_FAIL = "todo/DELETE_FAIL";

const SEARCH = "todo/SEARCH";
const SEARCH_SUCCESS = "todo/SEARCH_SUCCESS";
const SEARCH_FAIL = "todo/SEARCH_FAIL";

const initialState = {
  todos: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        todos: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        todos: [],
        error: action.error,
      };
    case ADD:
      return {
        ...state,
        adding: true,
        refresh: false,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        refresh: true,
      };
    case ADD_FAIL:
      return {
        ...state,
        adding: false,
        error: action.error,
      };
    case DELETE:
      return {
        ...state,
        deleteing: true,
        refresh: false,
        error: null,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteing: false,
        refresh: true,
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleteing: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const addTodo = todoItem => ({
  types: [ADD, ADD_SUCCESS, ADD_FAIL],
  odoo: client => client.execKw("xml.rpc.demo", "create", [[{
    todo: todoItem.todo,
    game: todoItem.isDone,
  }]]),
});

export const deleteTodo = todoId => ({
  types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
  odoo: client => client.execKw("xml.rpc.demo", "unlink", [[todoId]]),
});

export const searchTodos = () => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  odoo: client => client.execKw("xml.rpc.demo", "search_read", [[[], ["todo", "game"]]]),
});

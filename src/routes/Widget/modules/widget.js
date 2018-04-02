import { OPERATION_CLONE, OPERATION_DELETE, OPERATION_EDIT } from "../../../components/Common/OperationConstant";

const ADD = "widget/ADD";
const ADD_SUCCESS = "widget/ADD_SUCCESS";
const ADD_FAIL = "widget/ADD_FAIL";

const DELETE = "widget/DELETE";
const DELETE_SUCCESS = "widget/DELETE_SUCCESS";
const DELETE_FAIL = "widget/DELETE_FAIL";

const EDIT = "widget/EDIT";
const EDIT_SUCCESS = "widget/EDIT_SUCCESS";
const EDIT_FAIL = "widget/EDIT_FAIL";

const SEARCH = "widget/SEARCH";
const SEARCH_SUCCESS = "widget/SEARCH_SUCCESS";
const SEARCH_FAIL = "widget/SEARCH_FAIL";

const OPEN = "widget/OPEN";

const OPERATION_FINISH = "widget/OPERATION_FINISH";

const initialState = {
  widgets: null,
  currentWidget: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        adding: true,
        refresh: false,
        operation: OPERATION_CLONE,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        refresh: true,
        operationResult: action.result,
      };
    case ADD_FAIL:
      return {
        ...state,
        adding: false,
        operationResult: action.result,
        error: action.error,
      };
    case DELETE:
      return {
        ...state,
        deleteing: true,
        refresh: false,
        operation: OPERATION_DELETE,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleteing: false,
        refresh: true,
        operationResult: action.result,
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleteing: false,
        operationResult: action.result,
        error: action.error,
      };
    case EDIT:
      return {
        ...state,
        editing: true,
        refresh: false,
        operation: OPERATION_EDIT,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        editing: false,
        refresh: true,
        operationResult: action.result,
      };
    case EDIT_FAIL:
      return {
        ...state,
        editing: false,
        operationResult: action.result,
        error: action.error,
      };
    case SEARCH:
      return {
        ...state,
        refresh: false,
        searching: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searching: false,
        widgets: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        widgets: [],
        searching: false,
        refresh: false,
        error: action.error,
      };
    case OPEN:
      return {
        ...state,
        currentWidget: action.result,
      };
    case OPERATION_FINISH:
      return {
        ...state,
        refresh: false,
      };
    default:
      return state;
  }
}

export const addWidget = widget => ({
  types: [ADD, ADD_SUCCESS, ADD_FAIL],
  odoo: client => client.execKw("sc.component", "create", [[widget]]),
});

export const deleteWidget = widgetId => ({
  types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
  odoo: client => client.execKw("sc.component", "unlink", [[[widgetId]]]),
});

export const editWidget = (widgetId, widget) => ({
  types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
  odoo: client => client.execKw("sc.component", "write", [[[widgetId], widget]]),
});

export const searchWidget = searchInfo => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  odoo: client => client.execKw("sc.component", "search_read", [[searchInfo, ["id", "category", "data", "name", "group"]]]),
});

export const openWidget = widget => ({
  type: OPEN,
  result: widget,
});

export const operationFinish = () => ({
  type: OPERATION_FINISH,
});

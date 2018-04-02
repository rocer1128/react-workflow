import { OPERATION_ADD, OPERATION_DELETE, OPERATION_SAVE } from "components/Common/OperationConstant";

const ADD_PAGE = "workbench/ADD_PAGE";
const ADD_PAGE_SUCCESS = "workbench/ADD_PAGE_SUCCESS";
const ADD_PAGE_FAIL = "workbench/ADD_PAGE_FAIL";

const DELETE_PAGE = "workbench/DELETE_PAGE";
const DELETE_PAGE_SUCCESS = "workbench/DELETE_PAGE_SUCCESS";
const DELETE_PAGE_FAIL = "workbench/DELETE_PAGE_FAIL";

const GET_PAGES = "workbench/SELECT";
const GET_PAGES_SUCCESS = "workbench/SELECT_SUCCESS";
const GET_PAGES_FAIL = "workbench/SELECT_FAIL";
const GET_DATASOURCES = "workbench/GET_DATASOURCES";
const GET_DATASOURCES_SUCCESS = "workbench/GET_DATASOURCES_SUCCESS";
const GET_DATASOURCES_FAIL = "workbench/GET_DATASOURCES_FAIL";

const SEARCH_WIDGET = "workbench/SEARCH_WIDGET";
const SEARCH_WIDGET_SUCCESS = "workbench/SEARCH_WIDGET_SUCCESS";
const SEARCH_WIDGET_FAIL = "workbench/SEARCH_WIDGET_FAIL";

const SAVE = "workbench/SAVE";
const SAVE_SUCCESS = "workbench/SAVE_SUCCESS";
const SAVE_FAIL = "workbench/SAVE_FAIL";

const ADD_WIDGET = "workbench/ADD_WIDGET";
const ADD_WIDGET_SUCCESS = "workbench/ADD_WIDGET_SUCCESS";
const ADD_WIDGET_FAIL = "workbench/ADD_WIDGET_FAIL";

const UPDATE_WIDGET = "workbench/UPDATE_WIDGET";
const UPDATE_WIDGET_SUCCESS = "workbench/UPDATE_WIDGET_SUCCESS";
const UPDATE_WIDGET_FAIL = "workbench/UPDATE_WIDGET_FAIL";

const SETUP_PROJECT_CURRENT_OBJECT = "workbench/SETUP_PROJECT_CURRENT_OBJECT";
const SETUP_PROJECT_CURRENT_OBJECT_SUCCESS = "workbench/SETUP_PROJECT_CURRENT_OBJECT_SUCCESS";
const SETUP_PROJECT_CURRENT_OBJECT_FAIL = "workbench/SETUP_PROJECT_CURRENT_OBJECT_FAIL";

const SETUP_WIDGET_CURRENT_OBJECT = "workbench/SETUP_WIDGET_CURRENT_OBJECT";
const SETUP_WIDGET_CURRENT_OBJECT_SUCCESS = "workbench/SETUP_WIDGET_CURRENT_OBJECT_SUCCESS";
const SETUP_WIDGET_CURRENT_OBJECT_FAIL = "workbench/SETUP_WIDGET_CURRENT_OBJECT_FAIL";

const CLEAR_CURRENT_OBJECT = "workbench/CLEAR_CURRENT_OBJECT";

const PAGE_OPERATION_FINISH = "workbench/PAGE_OPERATION_FINISH";
const WIDGET_OPERATION_FINISH = "workbench/WIDGET_OPERATION_FINISH";
const SEARCH_FINISH = "workbench/SEARCH_FINISH";
const SETUP_WIDGET_CURRENT_OBJECT_FINISH = "workbench/SETUP_WIDGET_CURRENT_OBJECT_FINISH";

const RESET_STATE = "workbench/RESET_STATE";
const SET_CURRENT_PAGE = "workbench/SET_CURRENT_PAGE";
const UPDATE_CURRENT_PAGE_OBJECTS = "workbench/UPDATE_CURRENT_PAGE_OBJECTS";
const UPDATE_PAGES_OBJECTS = "workbench/UPDATE_PAGES_OBJECTS";
const DELETE_PAGES_OBJECTS = "workbench/DELETE_PAGES_OBJECTS";

const initialState = {
  pages: [],
  currentObject: null,
  type: "",
  currentPage: {},
};

export default function reducer(state = initialState, action = {}) {
  const { pages, currentPage } = state;
  switch (action.type) {
    case ADD_PAGE:
      return {
        ...state,
        addPageing: true,
        pageOperationState: false,
        operation: OPERATION_ADD,
      };
    case ADD_PAGE_SUCCESS:
      return {
        ...state,
        addPageing: false,
        pageOperationState: true,
        operationResult: action.result,
      };
    case ADD_PAGE_FAIL:
      return {
        ...state,
        addPageing: false,
        operationResult: action.result,
        error: action.error,
      };
    case DELETE_PAGE:
      return {
        ...state,
        deletePageing: true,
        pageOperationState: false,
      };
    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        deletePageing: false,
        pageOperationState: true,
        operationResult: action.result,
        operation: OPERATION_DELETE,
      };
    case DELETE_PAGE_FAIL:
      return {
        ...state,
        deletePageing: false,
        operationResult: action.result,
        error: action.error,
      };
    case GET_PAGES:
      return {
        ...state,
        searchPageState: false,
        pages: [],
      };
    case GET_PAGES_SUCCESS:
      return {
        ...state,
        searchPageState: true,
        pages: action.result,
      };
    case GET_PAGES_FAIL:
      return {
        ...state,
        pagessss: true,
        error: action.error,
      };
    case GET_DATASOURCES:
      return {
        ...state,
        searchDataSourceState: false,
      };
    case GET_DATASOURCES_SUCCESS:
      return {
        ...state,
        searchDataSourceState: true,
        listDataSource: action.result,
      };
    case GET_DATASOURCES_FAIL:
      return {
        ...state,
        dataSourcess: true,
        error: action.error,
      };
    case SEARCH_WIDGET:
      return {
        ...state,
        searchWidgetState: false,
      };
    case SEARCH_WIDGET_SUCCESS:
      return {
        ...state,
        searchWidgetState: true,
        listWidget: action.result,
      };
    case SEARCH_WIDGET_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case SAVE:
      return {
        ...state,
        saveing: true,
        pageOperationState: false,
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        saveing: false,
        pageOperationState: true,
        operationResult: action.result,
        operation: OPERATION_SAVE,
      };
    case SAVE_FAIL:
      return {
        ...state,
        saveing: false,
        error: action.error,
      };
    case ADD_WIDGET:
      return {
        ...state,
        addWidgeting: true,
        widgetOperationState: false,
        operation: OPERATION_ADD,
      };
    case ADD_WIDGET_SUCCESS:
      return {
        ...state,
        addWidgeting: false,
        widgetOperationState: true,
        operationResult: action.result,
      };
    case ADD_WIDGET_FAIL:
      return {
        ...state,
        addWidgeting: false,
        error: action.error,
      };
    case UPDATE_WIDGET:
      return {
        ...state,
        updateWidgeting: true,
        widgetOperationState: false,
        operation: OPERATION_SAVE,
      };
    case UPDATE_WIDGET_SUCCESS:
      return {
        ...state,
        updateWidgeting: false,
        widgetOperationState: true,
        operationResult: action.result,
      };
    case UPDATE_WIDGET_FAIL:
      return {
        ...state,
        updateWidgeting: false,
        error: action.error,
      };
    case SETUP_PROJECT_CURRENT_OBJECT:
      return {
        ...state,
        type: "project",
      };
    case SETUP_PROJECT_CURRENT_OBJECT_SUCCESS:
      return {
        ...state,
        currentObject: action.result[0],
      };
    case SETUP_PROJECT_CURRENT_OBJECT_FAIL:
      return {
        ...state,
        currentPage: true,
        error: action.error,
      };
    case SETUP_WIDGET_CURRENT_OBJECT:
      return {
        ...state,
        type: "widget",
        setupWidgetCurrentObjectState: false,
      };
    case SETUP_WIDGET_CURRENT_OBJECT_SUCCESS:
      return {
        ...state,
        currentObject: action.result[0],
        setupWidgetCurrentObjectState: true,
      };
    case SETUP_WIDGET_CURRENT_OBJECT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_CURRENT_OBJECT:
      return {
        ...state,
        currentObject: null,
        type: "",
      };
    case PAGE_OPERATION_FINISH:
      return {
        ...state,
        pageOperationState: false,
        operation: "",
      };
    case WIDGET_OPERATION_FINISH:
      return {
        ...state,
        widgetOperationState: false,
        operation: "",
      };
    case SEARCH_FINISH:
      return {
        ...state,
        searchPageState: false,
        searchDataSourceState: false,
        searchWidgetState: false,
      };
    case SETUP_WIDGET_CURRENT_OBJECT_FINISH:
      return {
        ...state,
        setupWidgetCurrentObjectState: false,
      };
    case RESET_STATE:
      return {
        ...state,
        operationState: false,
        operation: "",
        searchPageState: false,
        searchDataSourceState: false,
        searchWidgetState: false,
        setupWidgetCurrentObjectState: false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.result,
      };
    case UPDATE_CURRENT_PAGE_OBJECTS:
      currentPage.data.objects = action.result;
      return {
        ...state,
        currentPage,
      };
    case UPDATE_PAGES_OBJECTS:
      pages.push(action.result);
      return {
        ...state,
        pages,
      };
    case DELETE_PAGES_OBJECTS:
      pages.splice(action.result, 1);
      return {
        ...state,
        pages,
      };
    default:
      return state;
  }
}

export function addPage(page) {
  const newPage = {
    // create_uid: 1,
    project_id: page.project_id,
    name: page.name,
    data: page.data,
  };
  return {
    types: [ADD_PAGE, ADD_PAGE_SUCCESS, ADD_PAGE_FAIL],
    odoo: client => client.execKw("sc.page", "create", [[newPage]]),
  };
}
export function deletePage(pageId) {
  return {
    types: [DELETE_PAGE, DELETE_PAGE_SUCCESS, DELETE_PAGE_FAIL],
    odoo: client => client.execKw("sc.page", "unlink", [[[pageId]]]),
  };
}
export function getPages(projectId) {
  return {
    types: [GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_FAIL],
    odoo: client => client.execKw("sc.page", "search_read", [[[["project_id", "=", projectId]], ["id", "name", "project_id", "write_uid", "data", "create_date", "write_date", "process_control"]]])
  };
}
export function getDataSources(projectId) {
  return {
    types: [GET_DATASOURCES, GET_DATASOURCES_SUCCESS, GET_DATASOURCES_FAIL],
    promise: client => client.get("projects/show/list", {
      urlParams: {
        project_id: projectId,
      },
    }),
  };
}
export const searchWidget = () => ({
  types: [SEARCH_WIDGET, SEARCH_WIDGET_SUCCESS, SEARCH_WIDGET_FAIL],
  odoo: client => client.execKw("sc.component", "search_read", [[[], ["id", "category", "data", "name", "group"]]]),
});

export const save = page => ({
  types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
  odoo: client => client.execKw("sc.page", "write", [
    [
      [page.id],
      {
        data: page.data,
      },
    ],
  ]),
});
export const addWidget = widget => ({
  types: [ADD_WIDGET, ADD_WIDGET_SUCCESS, ADD_WIDGET_FAIL],
  odoo: client => client.execKw("sc.component", "create", [[widget]]),
});
export const updateWidget = (widgetId, widget) => ({
  types: [UPDATE_WIDGET, UPDATE_WIDGET_SUCCESS, UPDATE_WIDGET_FAIL],
  odoo: client => client.execKw("sc.component", "write", [[[widgetId], widget]]),
});
export function setupProjectCurrentObject(projectId) {
  console.log(projectId);
  return {
    types: [SETUP_PROJECT_CURRENT_OBJECT, SETUP_PROJECT_CURRENT_OBJECT_SUCCESS, SETUP_PROJECT_CURRENT_OBJECT_FAIL],
    odoo: client => client.execKw("sc.project", "read", [[projectId]]),
  };
}
export function setupWidgetCurrentObject(widgetId) {
  return {
    types: [SETUP_WIDGET_CURRENT_OBJECT, SETUP_WIDGET_CURRENT_OBJECT_SUCCESS, SETUP_WIDGET_CURRENT_OBJECT_FAIL],
    odoo: client => client.execKw("sc.component", "search_read", [[[["id", "=", widgetId]], ["id", "category", "data", "name", "group"]]]),
  };
}
export function clearCurrentObject() {
  return {
    type: CLEAR_CURRENT_OBJECT,
  };
}
export function pageOperationFinish() {
  return {
    type: PAGE_OPERATION_FINISH,
  };
}
export function widgetOperationFinish() {
  return {
    type: WIDGET_OPERATION_FINISH,
  };
}
export function searchFinish() {
  return {
    type: SEARCH_FINISH,
  };
}
export function setupWidgetCurrentObjectFinish() {
  return {
    type: SETUP_WIDGET_CURRENT_OBJECT_FINISH,
  };
}
export function resetFinish() {
  return {
    type: RESET_STATE,
  };
}
export function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    result: currentPage,
  };
}
export function updateCurrentPageObjects(objects) {
  return {
    type: UPDATE_CURRENT_PAGE_OBJECTS,
    result: objects,
  };
}

export function updatePagesObjects(objects) {
  return {
    type: UPDATE_PAGES_OBJECTS,
    result: objects,
  };
}

export function deletePagesObjects(objects) {
  return {
    type: DELETE_PAGES_OBJECTS,
    result: objects,
  };
}

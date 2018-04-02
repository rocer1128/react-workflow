const GET_DATASOURCES = "storedprogramcontrol/GET_DATASOURCES";
const GET_DATASOURCES_SUCCESS = "storedprogramcontrol/GET_DATASOURCES_SUCCESS";
const GET_DATASOURCES_FAIL = "storedprogramcontrol/GET_DATASOURCES_FAIL";

const GET_PAGES = "storedprogramcontrol/GET_PAGES";
const GET_PAGES_SUCCESS = "storedprogramcontrol/GET_PAGES_SUCCESS";
const GET_PAGES_FAIL = "storedprogramcontrol/GET_PAGES_FAIL";
const GET_PAGES_FINISH = "storedprogramcontrol/GET_PAGES_FINISH";
const UNREGISTER_ALERT = "storedprogramcontrol/UNREGISTER_ALERT";
const SAVE = "storedprogramcontrol/SAVE";
const SAVE_SUCCESS = "storedprogramcontrol/SAVE_SUCCESS";
const SAVE_FAIL = "storedprogramcontrol/SAVE_FAIL";
const SET_CURRENT_PAGE = "storedprogramcontrol/SET_CURRENT_PAGE";
const CURRENTPAGE_FINISH = "storedprogramcontrol/CURRENTPAGE_FINISH";
const UPDATE_CURRENT_PAGE_OBJECTS = "storedprogramcontrol/UPDATE_CURRENT_PAGE_OBJECTS";
export const CHANGE_SEND_DATA = "storedprogramcontrol/CHANGE_SEND_DATA";
export const CHANGE_SEND_DATA_SUCCESS = "storedprogramcontrol/CHANGE_SEND_DATA_SUCCESS";
export const CHANGE_SEND_DATA_FAIL = "storedprogramcontrol/CHANGE_SEND_DATA_FAIL";
export const SENDMSG = "storedprogramcontrol/SENDMSG";
export const SEND = "storedprogramcontrol/SEND";
export const SENDMSGFAIL = "storedprogramcontrol/SENDMSGFAIL";
export const STOP = "storedprogramcontrol/SENDMSGFAIL";

const initialState = {
  listDataSource: [],
  pages: [],
  currentpage: {},
  saveState: false,
};

export default function reducer(state = initialState, action = {}) {
  const { currentPage } = state;
  switch (action.type) {
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
        error: action.error,
      };
    case GET_PAGES:
      return {
        ...state,
        searchPageState: false,
        pages: null,
      };
    case GET_PAGES_SUCCESS:
      return {
        ...state,
        searchPageState: true,
        currentPageState: true,
        refresh: false,
        pages: action.result,
      };
    case GET_PAGES_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case GET_PAGES_FINISH:
      return {
        ...state,
        searchPageState: false,
      };
    case UNREGISTER_ALERT:
      return {
        ...state,
        alertInfo: null,
      };
    case SAVE:
      return {
        ...state,
        saveState: false,
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        refresh: true,
        saveState: true,
      };
    case SAVE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPageState: false,
        currentPage: action.result,
      };
    case CURRENTPAGE_FINISH:
      return {
        ...state,
        currentPageState: true,
      };
    case UPDATE_CURRENT_PAGE_OBJECTS:
      currentPage.process_control = action.result;
      return {
        ...state,
        currentPage,
      };
    case SENDMSG:
      return {
        ...state,
      };
    case SEND:
      return {
        ...state,
        value: action.value,
        nodeId: action.nodeId,
        expectedDataId: action.expectedDataId,
        expectedValue: action.expectedValue,
      };
    case CHANGE_SEND_DATA:
      return {
        ...state,
        datachanged: false,
        datachange: true,
      };
    case CHANGE_SEND_DATA_SUCCESS:
      return {
        ...state,
        datachanged: true,
      };
    case CHANGE_SEND_DATA_FAIL:
      return {
        ...state,
        datachanged: false,
        error: action.error,
      };
    case SENDMSGFAIL:
      return {
        ...state,
        datachange: false,
      };
    case STOP:
      return {
        ...state,
        datachanged: false,
        datachange: false,
      };
    default:
      return state;
  }
}

/**
 * 获取数据源与点的综合信息
 */
export function getDataSources(projectId) {
  return {
    types: [GET_DATASOURCES, GET_DATASOURCES_SUCCESS, GET_DATASOURCES_FAIL],
    promise: client => client.get("projects/show/list", {
      urlParams: {
        project_id: 8,
      },
    }),
  };
}

export function getPages(projectId) {
  return {
    types: [GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_FAIL],
    // promise: client => client.get("pages/show", {
    //   urlParams: {
    //     project_id: projectId,
    //   },
    // }),
    odoo: client => client.execKw("sc.page", "search_read", [[[["project_id", "=", projectId]], ["id", "name", "project_id", "write_uid", "data", "create_date", "write_date", "process_control"]]])
  };
}

export function getPagesFinish() {
  return {
    type: GET_PAGES_FINISH,
  };
}

export function unregisterAlert() {
  return {
    type: UNREGISTER_ALERT,
  };
}

export function save(pageId, controlJson) {
  console.log(pageId, controlJson);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    // promise: client => client.post("process_control/update", {
    //   data: {
    //     page_id: pageId,
    //     process_control: controlJson,
    //   },
    // }),
    odoo: client => client.execKw("sc.page", "write", [
      [
        [pageId],
        {
          process_control: controlJson,
        },
      ],
    ]),
  };
}
export function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    result: currentPage,
  };
}

export function updateCurrentPageJson(controlJson) {
  return {
    type: UPDATE_CURRENT_PAGE_OBJECTS,
    result: controlJson,
  };
}

export const changeSendData = (id, value) => ({
  types: [CHANGE_SEND_DATA, CHANGE_SEND_DATA_SUCCESS, CHANGE_SEND_DATA_FAIL],
  promise: client => client.post("data_lives/update", {
    data: {
      data_node_id: id,
      value,
    },
  }),
});

export function stopProgrammed() {
  return {
    type: STOP
  };
}

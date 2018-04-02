const GET_DATASOURCES = "realTimePage/GET_DATASOURCES";
const GET_DATASOURCES_SUCCESS = "realTimePage/GET_DATASOURCES_SUCCESS";
const GET_DATASOURCES_FAIL = "realTimePage/GET_DATASOURCES_FAIL";

const GET_PAGES = "realTimePage/GET_PAGES";
const GET_PAGES_SUCCESS = "realTimePage/GET_PAGES_SUCCESS";
const GET_PAGES_FAIL = "realTimePageGET_PAGES_FAIL";
const GET_PAGES_FINISH = "realTimePage/GET_PAGES_FINISH";
const UNREGISTER_ALERT = "realTimePage/UNREGISTER_ALERT";

const initialState = {
  listDataSource: [], // 数据源与点综合信息
};

export default function reducer(state = initialState, action = {}) {
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
        project_id: projectId,
      },
    }),
  };
}

// export function getPages(projectId) {
//   return {
//     types: [GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_FAIL],
//     promise: client => client.get("pages/show", {
//       urlParams: {
//         project_id: projectId,
//       },
//     }),
//   };
// }
export function getPages(projectId) {
  return {
    types: [GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_FAIL],
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

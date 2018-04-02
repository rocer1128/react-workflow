const GET_DATASOURCES = "projectMonitor/GET_DATASOURCES";
const GET_DATASOURCES_SUCCESS = "projectMonitor/GET_DATASOURCES_SUCCESS";
const GET_DATASOURCES_FAIL = "projectMonitor/GET_DATASOURCES_FAIL";
// 获取历史数据
const GET_HISTORY = "projectMonitor/GET_HISTORY";
const GET_HISTORY_SUCCESS = "projectMonitor/GET_HISTORY_SUCCESS";
const GET_HISTORY_FAIL = "projectMonitor/GET_HISTORY_FAIL";
// 删除历史数据
const DELETE_HISTORY = "projectMonitor/DELETE_HISTORY";

const GET_PAGES = "projectMonitor/GET_PAGES";
const GET_PAGES_SUCCESS = "projectMonitor/GET_PAGES_SUCCESS";
const GET_PAGES_FAIL = "projectMonitor/GET_PAGES_FAIL";
const GET_PAGES_FINISH = "projectMonitor/GET_PAGES_FINISH";

const GET_ALERTS = "projectMonitor/GET_ALERTS";
const GET_ALERTS_SUCCESS = "projectMonitor/GET_ALERTS_SUCCESS";
const GET_ALERTS_FAIL = "projectMonitor/GET_ALERTS_FAIL";

const REGISTER_ALERT = "projectMonitor/REGISTER_ALERT";
const UNREGISTER_ALERT = "projectMonitor/UNREGISTER_ALERT";

const initialState = {
  alerts: [],
  listDataSource: [], // 数据源与点综合信息
  listHistory: new Map(), // 历史数据对象
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
    case GET_HISTORY:
      return {
        ...state,
        searchHistoryState: false,
      };
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        searchHistoryState: true,
        listHistory: state.listHistory.set(action.curveKey, action.result),
      };
    case GET_HISTORY_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_HISTORY:
      state.listHistory.delete(action.curveKey);
      return {
        ...state,
        listHistory: state.listHistory,
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
    case GET_ALERTS:
      return {
        ...state,
        searchState: false,
        alerts: [],
      };
    case GET_ALERTS_SUCCESS:
      return {
        ...state,
        searchState: true,
        alerts: action.result,
      };
    case GET_ALERTS_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case REGISTER_ALERT:
      return {
        ...state,
        alertInfo: action.result,
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
  console.log(projectId);
  return {
    types: [GET_DATASOURCES, GET_DATASOURCES_SUCCESS, GET_DATASOURCES_FAIL],
    promise: client => client.get("projects/show/list", {
      urlParams: {
        project_id: projectId,
      },
    }),
  };
}

/**
 * 获取历史数据
 */
export function getHistory(data, key) {
  return {
    types: [GET_HISTORY, GET_HISTORY_SUCCESS, GET_HISTORY_FAIL],
    promise: client => client.post("history_data/show", {
      data,
    }),
    curveKey: key,
  };
}

/**
 * 获取历史数据
 */
export function deleteHistory(key) {
  return {
    type: DELETE_HISTORY,
    curveKey: key,
  };
}

export function getPages(projectId) {
  return {
    types: [GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_FAIL],
    /* promise: client => client.get("pages/show", {
       urlParams: {
         project_id: 10,
       },
     }),*/
    odoo: client => client.execKw("sc.page", "search_read", [[[["project_id", "=", projectId]], ["id", "name", "project_id", "write_uid", "data", "create_date", "write_date", "process_control"]]]),
  };
}

export function getPagesFinish() {
  return {
    type: GET_PAGES_FINISH,
  };
}

export function getAlerts(projectId, startTime, endTime, level, type) {
  return {
    types: [GET_ALERTS, GET_ALERTS_SUCCESS, GET_ALERTS_FAIL],
    promise: client => client.post("data_alerts/show", {
      data: {
        project_id: projectId,
        start_date: startTime,
        end_date: endTime,
        level,
        alert_type: type,
      },
    }),
  };
}

export function registerAlert(alertInfo) {
  return {
    type: REGISTER_ALERT,
    result: alertInfo,
  };
}

export function unregisterAlert() {
  return {
    type: UNREGISTER_ALERT,
  };
}

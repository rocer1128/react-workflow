// 查询曲线图
const GET_DATACURVE = "projectMonitor/GET_DATACURVE";
const GET_DATACURVE_SUCCESS = "projectMonitor/GET_DATACURVE_SUCCESS";
const GET_DATACURVE_FAIL = "projectMonitor/GET_DATACURVE_FAIL";
// 新建曲线图
const ADD_DATACURVE = "projectMonitor/ADD_DATACURVE";
const ADD_DATACURVE_SUCCESS = "projectMonitor/ADD_DATACURVE_SUCCESS";
const ADD_DATACURVE_FAIL = "projectMonitor/ADD_DATACURVE_FAIL";
// 删除曲线图
const DELETE_DATACURVE = "projectMonitor/DELETE_DATACURVE";
const DELETE_DATACURVE_SUCCESS = "projectMonitor/DELETE_DATACURVE_SUCCESS";
const DELETE_DATACURVE_FAIL = "projectMonitor/DELETE_DATACURVE_FAIL";
// 更新曲线图
const UPADTE_DATACURVE = "projectMonitor/UPADTE_DATACURVE";
const UPADTE_DATACURVE_SUCCESS = "projectMonitor/UPADTE_DATACURVE_SUCCESS";
const UPADTE_DATACURVE_FAIL = "projectMonitor/UPADTE_DATACURVE_FAIL";

const initialState = {
  listDataCurve: [], // 数据曲线的列表
  refresh: false, // 刷新
};

export default function curveReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_DATACURVE:
      return {
        ...state,
        refresh: false,
      };
    case GET_DATACURVE_SUCCESS:
      return {
        ...state,
        listDataCurve: action.result,
      };
    case GET_DATACURVE_FAIL:
      return {
        ...state,
        listDataCurve: [],
        error: action.error,
      };
    case ADD_DATACURVE:
      return {
        ...state,
        refresh: false,
      };
    case ADD_DATACURVE_SUCCESS:
      return {
        ...state,
        refresh: true,
      };
    case ADD_DATACURVE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_DATACURVE:
      return {
        ...state,
        refresh: false,
      };
    case DELETE_DATACURVE_SUCCESS:
      return {
        ...state,
        refresh: true,
      };
    case DELETE_DATACURVE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case UPADTE_DATACURVE:
      return {
        ...state,
        refresh: false,
      };
    case UPADTE_DATACURVE_SUCCESS:
      return {
        ...state,
        refresh: true,
      };
    case UPADTE_DATACURVE_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

/**
 * 获取数据曲线
 */
export function getDataCurves(projectId) {
  return {
    types: [GET_DATACURVE, GET_DATACURVE_SUCCESS, GET_DATACURVE_FAIL],
    promise: client => client.get("data_curves/show", {
      urlParams: {
        project_id: projectId,
      },
    }),
  };
}

/**
 * 添加数据曲线
 */
export function addDataCurves(data) {
  return {
    types: [ADD_DATACURVE, ADD_DATACURVE_SUCCESS, ADD_DATACURVE_FAIL],
    promise: client => client.post("data_curves/create", {
      data,
    }),
  };
}

/**
 * 删除数据曲线
 */
export function deleteDataCurves(index) {
  return {
    types: [DELETE_DATACURVE, DELETE_DATACURVE_SUCCESS, DELETE_DATACURVE_FAIL],
    promise: client => client.post("data_curves/delete", {
      data: {
        id: index,
      },
    }),
  };
}

// 新建数据曲线
export function updateDataCurves(data) {
  return {
    types: [UPADTE_DATACURVE, UPADTE_DATACURVE_SUCCESS, UPADTE_DATACURVE_FAIL],
    promise: client => client.post("data_curves/update", {
      data,
    }),
  };
}

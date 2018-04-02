import { OPERATION_DELETE, OPERATION_CREATE, OPERATION_EDIT, OPERATION_IMPORT } from "../../../components/Common/OperationConstant";

// 数据源Action type
// 新建数据源
const UPLOAD = "dataSource/UPLOAD";
const UPLOAD_SUCCESS = "dataSource/UPLOAD_SUCCESS";
const UPLOAD_FAIL = "dataSource/UPLOAD_FAIL";
// 删除数据源
const DELETE = "dataSource/DELETE";
const DELETE_SUCCESS = "dataSource/DELETE_SUCCESS";
const DELETE_FAIL = "dataSource/DELETE_FAIL";
// 编辑保存数据源
const SAVE = "dataSource/SAVE";
const SAVE_SUCCESS = "dataSource/SAVE_SUCCESS";
const SAVE_FAIL = "dataSource/SAVE_FAIL";
// 加载数据源
const ONLOAD = "dataSource/ONLOAD";
const ONLOAD_SUCCESS = "dataSource/ONLOAD_SUCCESS";
const ONLOAD_FAIL = "dataSource/ONLOAD_FAIL";
// 加载数据源与点的综合信息
const ONLOADDATA = "dataLink/ONLOADDATA";
const ONLOADDATA_SUCCESS = "dataLink/ONLOADDATA_SUCCESS";
const ONLOADDATA_FAIL = "dataLink/ONLOADDATA_FAIL";
// 导入数据源
const IMPORTDATA = "dataLink/IMPORTDATA";
const IMPORTDATA_SUCCESS = "dataLink/IMPORTDATA_SUCCESS";
const IMPORTDATA_FAIL = "dataLink/IMPORTDATA_FAIL";
// 清空数据源列表
const REMOVEDATA = "dataLink/REMOVEDATA";
const REMOVEDATA_SUCCESS = "dataLink/REMOVEDATA_SUCCESS";
const REMOVEDATA_FAIL = "dataLink/REMOVEDATA_FAIL";


// 数据点Action type
// 新建数据点
const UPLOADPOINT = "dataPoint/UPLOAD";
const UPLOADPOINT_SUCCESS = "dataPoint/UPLOAD_SUCCESS";
const UPLOADPOINT_FAIL = "dataPoint/UPLOAD_FAIL";
// 编辑保存数据点
const SAVEPOINT = "dataPoint/SAVE";
const SAVEPOINT_SUCCESS = "dataPoint/SAVE_SUCCESS";
const SAVEPOINT_FAIL = "dataPoint/SAVE_FAIL";
// 删除数据点
const DELETEPOINT = "dataPoint/DELETE";
const DELETEPOINT_SUCCESS = "dataPoint/DELETE_SUCCESS";
const DELETEPOINT_FAIL = "dataPoint/DELETE_FAIL";
// 加载数据点
const ONLOADPOINT = "dataPoint/ONLOAD";
const ONLOADPOINT_SUCCESS = "dataPoint/ONLOAD_SUCCESS";
const ONLOADPOINT_FAIL = "dataPoint/ONLOAD_FAIL";

// 数据源初始state
const initialSourceState = {
  listDatasource: [],
  listDataSourcePoint: [], // 数据源与数据点的综合信息列表
};

// 数据点初始state
const initialPointState = {
  listDataPoint: [],
  refresh: false,
};

/**
 * 数据源的reducer
 * @param  {Object} state [数据源初始状态]
 * @param  {Object} action [动作]
 * @return {Object} 更新后的状态
 */
export function sourceReducer(state = initialSourceState, action = {}) {
  switch (action.type) {
    case ONLOAD:
      return {
        ...state,
        refresh: false,
        importRefresh: false,
        error: null,
      };
    case ONLOAD_SUCCESS:
      return {
        ...state,
        listDatasource: action.result,
      };
    case ONLOAD_FAIL:
      return {
        ...state,
        listDatasource: [],
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
        operation: OPERATION_DELETE,
        operationResult: action.result,
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleteing: false,
        operationResult: action.result,
        error: action.error,
      };
    case UPLOAD:
      return {
        ...state,
        uploading: true,
        refresh: false,
        error: null,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        refresh: true,
        operation: OPERATION_CREATE,
        operationResult: action.result,
        uploading: false,
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        operationResult: action.result,
        error: action.error,
      };
    case SAVE:
      return {
        ...state,
        refresh: false,
        saving: true,
        error: null,
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        refresh: true,
        operation: OPERATION_EDIT,
        operationResult: action.result,
        saving: false,
      };
    case SAVE_FAIL:
      return {
        ...state,
        saving: false,
        operationResult: action.result,
        error: action.error,
      };
    case ONLOADDATA:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case ONLOADDATA_SUCCESS:
      return {
        ...state,
        listDataSourcePoint: action.result,
      };
    case ONLOADDATA_FAIL:
      return {
        ...state,
        listDataSourcePoint: [],
        error: action.error,
      };
    case IMPORTDATA:
      return {
        ...state,
        uploading: true,
        refresh: false,
        importRefresh: false,
        error: null,
      };
    case IMPORTDATA_SUCCESS:
      return {
        ...state,
        refresh: true,
        importRefresh: true,
        operation: OPERATION_IMPORT,
        operationResult: action.result,
        uploading: false,
      };
    case IMPORTDATA_FAIL:
      return {
        ...state,
        uploading: false,
        operationResult: action.result,
        error: action.error,
      };
    case REMOVEDATA:
      return {
        ...state,
        refresh: false,
        error: null,
        listDatasource: [],
      };
    default:
      return state;
  }
}

// 查看数据源
export function onloadDataSource(index) {
  return {
    types: [ONLOAD, ONLOAD_SUCCESS, ONLOAD_FAIL],
    promise: client => client.get("data_sources/show", {
      urlParams: {
        project_id: index,
      },
    }),
  };
}

// 删除数据源
export function deleteDataSource(index) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: client => client.post("data_sources/delete", {
      data: {
        id: index,
      },
    }),
  };
}

// 添加数据源
export function uploadDataSource(dataSource) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: client => client.post("data_sources/create", {
      data: dataSource,
    }),
  };
}

// 保存数据源
export function saveDataSource(dataSource) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: client => client.post("data_sources/update", {
      data: dataSource,
    }),
  };
}

// 查看数据源和数据点的组合信息
export function onloadDataSourcePoint(index) {
  return {
    types: [ONLOADDATA, ONLOADDATA_SUCCESS, ONLOADDATA_FAIL],
    promise: client => client.get("data_sources/show/list", {
      urlParams: {
        project_id: index,
      },
    }),
  };
}

// 导入数据源
export function importDataSource(dataSource) {
  return {
    types: [IMPORTDATA, IMPORTDATA_SUCCESS, IMPORTDATA_FAIL],
    promise: client => client.post("data_sources/import_data", {
      data: dataSource,
    }),
  };
}
// 切换工程时清空数据源列表
// export function removeDataSource() {
//   return {
//     type: REMOVEDATA,
//   }
// }
export function removeDataSource() {
  return {
    type: REMOVEDATA,
  }
}

/**
 * 数据点的reducer
 * @param  {Object} state [数据源初始状态]
 * @param  {Object} action [动作]
 * @return {Object} 更新后的状态
 */
export function pointReducer(state = initialPointState, action = {}) {
  switch (action.type) {
    case ONLOADPOINT:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case ONLOADPOINT_SUCCESS:
      return {
        ...state,
        listDataPoint: action.result,
      };
    case ONLOADPOINT_FAIL:
      return {
        ...state,
        listDataPoint: [],
        error: action.error,
      };
    case DELETEPOINT:
      return {
        ...state,
        deleteing: true,
        refresh: false,
        error: null,
      };
    case DELETEPOINT_SUCCESS:
      return {
        ...state,
        deleteing: false,
        refresh: true,
        operation: OPERATION_DELETE,
        operationResult: action.result,
      };
    case DELETEPOINT_FAIL:
      return {
        ...state,
        deleteing: false,
        operationResult: action.result,
        error: action.error,
      };
    case UPLOADPOINT:
      return {
        ...state,
        uploading: true,
        refresh: false,
        error: null,
      };
    case UPLOADPOINT_SUCCESS:
      return {
        ...state,
        refresh: true,
        operation: OPERATION_CREATE,
        operationResult: action.result,
        uploading: false,
      };
    case UPLOADPOINT_FAIL:
      return {
        ...state,
        uploading: false,
        operationResult: action.result,
        error: action.error,
      };
    case SAVEPOINT:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case SAVEPOINT_SUCCESS:
      return {
        ...state,
        refresh: true,
        operation: OPERATION_EDIT,
        operationResult: action.result,
        saving: false,
      };
    case SAVEPOINT_FAIL:
      return {
        ...state,
        saving: false,
        operationResult: action.result,
        error: action.error,
      };
    default:
      return state;
  }
}

// 查看数据点
export function onloadDataPoint(index) {
  return {
    types: [ONLOADPOINT, ONLOADPOINT_SUCCESS, ONLOADPOINT_FAIL],
    promise: client => client.get("data_nodes/show", {
      urlParams: {
        data_source_id: index,
      },
    }),
  };
}

// 删除数据点
export function deleteDataPoint(index) {
  return {
    types: [DELETEPOINT, DELETEPOINT_SUCCESS, DELETEPOINT_FAIL],
    promise: client => client.post("data_nodes/delete", {
      data: {
        id: index,
      },
    }),
  };
}

// 添加数据点
export function uploadDataPoint(dataSource) {
  return {
    types: [UPLOADPOINT, UPLOADPOINT_SUCCESS, UPLOADPOINT_FAIL],
    promise: client => client.post("data_nodes/create", {
      data: dataSource,
    }),
  };
}

// 保存数据点
export function saveDataPoint(dataSource) {
  return {
    types: [SAVEPOINT, SAVEPOINT_SUCCESS, SAVEPOINT_FAIL],
    promise: client => client.post("data_nodes/update", {
      data: dataSource,
    }),
  };
}

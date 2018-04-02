import { OPERATION_DELETE, OPERATION_CREATE, OPERATION_EDIT } from "../../../components/Common/OperationConstant";

// 数据联动Action type
// 新建数据联动
const UPLOAD = "dataLink/UPLOAD";
const UPLOAD_SUCCESS = "dataLink/UPLOAD_SUCCESS";
const UPLOAD_FAIL = "dataLink/UPLOAD_FAIL";
// 删除数据联动
const DELETE = "dataLink/DELETE";
const DELETE_SUCCESS = "dataLink/DELETE_SUCCESS";
const DELETE_FAIL = "dataLink/DELETE_FAIL";
// 编辑保存数据联动
const SAVE = "dataLink/SAVE";
const SAVE_SUCCESS = "dataLink/SAVE_SUCCESS";
const SAVE_FAIL = "dataLink/SAVE_FAIL";
// 加载数据联动
const ONLOAD = "dataLink/ONLOAD";
const ONLOAD_SUCCESS = "dataLink/ONLOAD_SUCCESS";
const ONLOAD_FAIL = "dataLink/ONLOAD_FAIL";
// 加载数据源与点的综合信息
const ONLOADDATA = "dataLink/ONLOADDATA";
const ONLOADDATA_SUCCESS = "dataLink/ONLOADDATA_SUCCESS";
const ONLOADDATA_FAIL = "dataLink/ONLOADDATA_FAIL";

const initialState = {
  listDataLink: [], // 数据联动列表
  listDataSource: [], // 数据源与数据点的综合信息列表
};

/**
 * [数据联动的reducer]
 * @param  {Object} state [初始状态]
 * @param  {Object} action [动作]
 * @return {Object} [更新的状态]
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ONLOAD:
      return {
        ...state,
        refresh: false, // 是否刷新
        error: null, // 错误信息
      };
    case ONLOAD_SUCCESS:
      return {
        ...state,
        listDataLink: action.result,
      };
    case ONLOAD_FAIL:
      return {
        ...state,
        listDataLink: [],
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
        listDataSource: action.result,
      };
    case ONLOADDATA_FAIL:
      return {
        ...state,
        listDataSource: [],
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
    default:
      return state;
  }
}

// 查看数据联动
export function onloadDataLink(index) {
  return {
    types: [ONLOAD, ONLOAD_SUCCESS, ONLOAD_FAIL],
    promise: client => client.get("data_links/show", {
      urlParams: {
        project_id: index,
      },
    }),
  };
}

// 查看数据源和数据点的组合信息
export function onloadDataSource(index) {
  return {
    types: [ONLOADDATA, ONLOADDATA_SUCCESS, ONLOADDATA_FAIL],
    promise: client => client.get("projects/show/list", {
      urlParams: {
        project_id: index,
      },
    }),
  };
}

// 删除数据联动
export function deleteDataLink(index) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: client => client.post("data_links/delete", {
      data: {
        id: index,
      },
    }),
  };
}

// 添加数据联动
export function uploadDataLink(dataLink) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: client => client.post("data_links/create", {
      data: dataLink,
    }),
  };
}

// 保存数据联动
export function saveDataLink(dataLink) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: client => client.post("data_links/update", {
      data: dataLink,
    }),
  };
}

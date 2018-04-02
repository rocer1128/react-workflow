// export default function reducer(state = {}, action = {}) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

export const SAVE = "calender/SAVE";
export const SAVE_SUCCESS = "calender/SAVE_SUCCESS";
export const SAVE_FAIL = "calender/SAVE_FAIL";
export const INIT_DATA = "calender/INIT_DATA";
export const INIT_DATA_SUCCESS = "calender/INIT_DATA_SUCCESS";
export const INIT_DATA_FAIL = "calender/INIT_DATA_FAIL";
export const INIT_PAGE_DATA = "calender/INIT_PAGE_DATA";
export const INIT_PAGE_DATA_SUCCESS = "calender/INIT_PAGE_DATA_SUCCESS";
export const INIT_PAGE_DATA_FAIL = "calender/INIT_PAGE_DATA_FAIL";
export const EVENTS = "calender/EVENTS";
export const CREATE_TASK = "calender/CREATE_TASK";
export const CREATE_TASK_SUCCESS = "calender/CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAIL = "calender/CREATE_TASK_FAIL";
export const INIT_TASK = "calender/INIT_TASK";
export const INIT_TASK_SUCCESS = "calender/INIT_TASK_SUCCESS";
export const INIT_TASK_FAIL = "calender/INIT_TASK_FAIL";
export const DELETE_TASK = "calender/DELETE_TASK";
export const DELETE_TASK_SUCCESS = "calender/DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAIL = "calender/DELETE_TASK_FAIL";
export const INIT_HISTORY_DATA = "calender/INIT_HISTORY_DATA";
export const INIT_HISTORY_DATA_SUCCESS = "calender/INIT_HISTORY_DATA_SUCCESS";
export const INIT_HISTORY_DATA_FAIL = "calender/INIT_HISTORY_DATA_FAIL";

import __ from "lodash";
import { CALENDER_CATEGORY_TYPES } from "components/Common/ComponentConstant";
import { OPERATION_DELETE, OPERATION_CREATE } from "../../../components/Common/OperationConstant";

const initialState = {
  newevents: [],
  listProject: [],
  listPage: [],
  events: [],
  options: [],
  listHistory: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        refresh: false,
      };
    case INIT_DATA_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        listProject: action.result,
        init: true,
      };
    case INIT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case INIT_PAGE_DATA:
      return {
        ...state,
        refresh: false,
      };
    case INIT_PAGE_DATA_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        listPage: action.result,
      };
    case INIT_PAGE_DATA_FAIL:
      return {
        ...state,
        listPage: [],
        error: action.error,
      };
    case CREATE_TASK:
      return {
        ...state,
        refresh: false,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        operation: OPERATION_CREATE,
        operationResult: action.result,
        refresh: true,
      };
    case CREATE_TASK_FAIL:
      console.log(action.error);
      return {
        ...state,
        error: action.error,
      };
    case INIT_TASK:
      return {
        ...state,
        refresh: false,
        init: false,
      };
    case INIT_TASK_SUCCESS:
      console.log(action.result);
      const eventGroup = __.groupBy(action.result, event => event.category); // 根据categroy进行分组
      const options = __.map(eventGroup, (val, key) => ({
        label: CALENDER_CATEGORY_TYPES[key],
        value: key,
      }));
      return {
        ...state,
        events: action.result,
        init: true,
        options,
      };
    case INIT_TASK_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case DELETE_TASK:
      return {
        ...state,
        refresh: false,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        operation: OPERATION_DELETE,
        operationResult: action.result,
        refresh: true,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case INIT_HISTORY_DATA:
      return {
        ...state,
        refresh: false,
      };
    case INIT_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        listHistory: action.result,
      };
    case INIT_HISTORY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case EVENTS:
      return {
        ...state,
        refresh: false,
        newevents: action.events,
        init: false,
      };
    default:
      return state;
  }
}

export const initInfo = uid => ({
  types: [INIT_DATA, INIT_DATA_SUCCESS, INIT_DATA_FAIL],
  odoo: client => client.execKw("sc.project", "search_read", [[[["create_uid", "=", uid]], []]]),
});

export const initPageInfo = projectId => ({
  types: [INIT_PAGE_DATA, INIT_PAGE_DATA_SUCCESS, INIT_PAGE_DATA_FAIL],
  odoo: client => client.execKw("sc.page", "search_read", [[[["project_id", "=", projectId]], []]]),
});

export const groupEvents = events => ({
  type: EVENTS,
  events,
});

export const creatTasks = datas => ({
  types: [CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_FAIL],
  odoo: client =>
    client.execKw("sc.task", "create", [
      [
        {
          name: datas.name,
          page_id: datas.page_id,
          start_time: datas.start_time,
          end_time: datas.end_time,
          category: datas.category,
        },
      ],
    ]),
});

export const initTasks = () => ({
  types: [INIT_TASK, INIT_TASK_SUCCESS, INIT_TASK_FAIL],
  odoo: client => client.execKw("sc.task", "search_read", [[[], []]]),
});

export const deleteTasks = id => ({
  types: [DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_FAIL],
  odoo: client => client.execKw("sc.task", "unlink", [[[id]]]),
});

export const initHistoryInfo = datas => ({
  types: [INIT_HISTORY_DATA, INIT_HISTORY_DATA_SUCCESS, INIT_HISTORY_DATA_FAIL],
  promise: client =>
    client.post("from_history_data/show", {
      data: datas,
    }),
});

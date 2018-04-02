export const CONNECT = "runtimer/CONNECT";
export const CONNECTED = "runtimer/CONNECTED";
export const CONNECTING = "runtimer/CONNECTING";
export const DISCONNECT = "runtimer/DISCONNECT";
export const SUBSCRIBE = "runtimer/SUBSCRIBE";
export const UNSUBSCRIBE = "runtimer/UNSUBSCRIBE";
export const MERGE_DATA = "runtimer/MERGE_DATA";
export const CHANGE = "runtimer/CHANGE";
export const START = "runtimer/START";
export const END = "runtimer/END";
export const INIT_DATA = "runtimer/INIT_DATA";
export const INIT_DATA_SUCCESS = "runtimer/INIT_DATA_SUCCESS";
export const INIT_DATA_FAIL = "runtimer/INIT_DATA_FAIL";
export const INIT_DEFAULT_DATA = "runtimer/INIT_DEFAULT_DATA";
export const INIT_DEFAULT_DATA_SUCCESS = "runtimer/INIT_DEFAULT_DATA_SUCCESS";
export const INIT_DEFAULT_DATA_FAIL = "runtimer/INIT_DEFAULT_DATA_FAIL";
export const CHANGE_DATA = "runtimer/CHANGE_DATA";
export const CHANGE_DATA_SUCCESS = "runtimer/CHANGE_DATA_SUCCESS";
export const CHANGE_DATA_FAIL = "runtimer/CHANGE_DATA_FAIL";
export const GET_PROJECT_DSMAP = "runtimer/GET_PROJECT_DSMAP";
export const GET_PROJECT_DSMAP_SUCCESS = "runtimer/GET_PROJECT_DSMAP_SUCCESS";
export const GET_PROJECT_DSMAP_FAIL = "runtimer/GET_PROJECT_DSMAP_FAIL";
export const INIT_DEFAULT_ALERT_DATA = "runtimer/INIT_DEFAULT_ALERT_DATA";
export const INIT_DEFAULT_ALERT_DATA_SUCCESS = "runtimer/INIT_DEFAULT_ALERT_DATA_SUCCESS";
export const INIT_DEFAULT_ALERT_DATA_FAIL = "runtimer/INIT_DEFAULT_ALERT_DATA_FAIL";
export const MERGE_ALERT_DATA = "runtimer/MERGE_ALERT_DATA";
export const SET_ALERT_MESSAGE = "runtimer/SET_ALERT_MESSAGE";
export const SAVE = "runtimer/SAVE";
export const SAVE_SUCCESS = "runtimer/SAVE_SUCCESS";
export const SAVE_FAIL = "runtimer/SAVE_FAIL";
export const SWITCH_DEVICE = "runtimer/SWITCH_DEVICE";
export const SWITCH_DEVICE_SUCESS = "runtimer/SWITCH_DEVICE_SUCESS";
export const SWITCH_DEVICE_FAIL = "runtimer/SWITCH_DEVICE_FAIL";
export const SUBMITFORM = "runtimer/SUBMITFORM";
export const SUBMITFORM_SUCESS = "runtimer/SUBMITFORM_SUCESS";
export const SUBMITFORM_FAIL = "runtimer/SUBMITFORM_FAIL";
// 1. dsMap:当前工程下的数据源和数据点的集合，数据点没有value值，用来构建左侧的树，即DataSourcePanel视图
// dsMap:[{
//         "data_source_id": 1,
//         "data_source_name": ""数据源A"",
//         "nodes": [
//           {
//             "data_node_id": 1,
//             "data_node_name": "88888"
//           },...
//         ]
//       },...]
// 2.defaultData:在打开本地测试时，一次性 获得当前工程下的数据点的id和value组成的对象
// defaultData: {
//     "3": null,
//     "4": null,
//     "5": null,
//     "6": null,
//     "7": 3
//   }
// 3. data:在线测试，开启mq监听时，获得的实时yx数据组成的对象，属性为 dataPointId:value
// data: {
//     "3": null,
//     "4": null,
//     "5": null,
//     "6": null,
//     "7": 3
//   }
// 4. alertData:在线测试，开启mq监听时，获得的实时报警数据组成的对象，属性为 dataPointId:level
// alertData: {
//   "3": null,
//   "4": null,
//   "5": null,
//   "6": null,
//   "7": 3
// }
// 5. alertMesage：报警信息
//  alertMessage": {
//       "id": 74011,
//       "data_node_id": 9,
//       "data_node_name": "写蜂鸣器",
//       "level": 1,
//       "alert_type": null,
//       "alert_info": "{\"err\":\"timeout\"}",
//       "alert_time": "2017-04-10T14:27:22.061+08:00"
//     }
// 6.defaultAlertData 在打开本地测试时，一次性 获得当前工程下的数据点的id和level组成的对象
//  defaultAlertData: {
//    "3": null,
//    "4": null,
//    "5": null,
//    "6": null,
//    "7": 3
//  }
const initialState = {
  isConnected: false, // 标识是否与 mq建立连接
  projectId: null,
  defaultData: null,
  data: null,
  dsMap: [],
  alertMesage: null,
  defaultAlertData: null,
  alertData: {},
  page: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONNECTING:
      return {
        ...state,
        projectId: action.projectId,
      };
    case CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case END:
      return {
        ...state,
        isConnected: false,
      };
    case MERGE_DATA:
      return {
        ...state,
        data: action.newData,
      };
    case INIT_DATA:
      return {
        ...state,
        dataIniting: true,
        error: null,
      };
    case INIT_DATA_SUCCESS:
      console.log("data_lives====", action.result);
      return {
        ...state,
        dataIniting: false,
        data: action.result,
      };
    case INIT_DATA_FAIL:
      return {
        ...state,
        dataIniting: false,
        error: action.error,
      };
    case INIT_DEFAULT_DATA:
      return {
        ...state,
        defaultDataIniting: true,
        error: null,
      };

    case INIT_DEFAULT_DATA_SUCCESS:
      return {
        ...state,
        defaultDataIniting: false,
        defaultData: action.result,
      };

    case INIT_DEFAULT_DATA_FAIL:
      return {
        ...state,
        defaultDataIniting: false,
        error: action.error,
      };
    case INIT_DEFAULT_ALERT_DATA:
      return {
        ...state,
        defaultAlertDataIniting: true,
        error: null,
      };

    case INIT_DEFAULT_ALERT_DATA_SUCCESS:
      return {
        ...state,
        defaultAlertDataIniting: false,
        defaultAlertData: action.result,
      };

    case INIT_DEFAULT_ALERT_DATA_FAIL:
      return {
        ...state,
        defaultAlertDataIniting: false,
        error: action.error,
      };
    case GET_PROJECT_DSMAP:
      return {
        ...state,
        getDsMaping: true,
        error: null,
      };
    case GET_PROJECT_DSMAP_SUCCESS:
      console.log("test.dsMap:", action.result)
      return {
        ...state,
        getDsMaping: false,
        dsMap: action.result,
      };
    case GET_PROJECT_DSMAP_FAIL:
      return {
        ...state,
        getDsMaping: false,
        error: action.error,
      };
    case CHANGE_DATA:
      return {
        ...state,
        changed: false,
        dataChanging: true,
      };
    case CHANGE_DATA_SUCCESS:
      return {
        ...state,
        changed: true,
        dataChanging: false,
      };
    case CHANGE_DATA_FAIL:
      return {
        ...state,
        changed: false,
        dataChanging: false,
        error: action.error,
      };
    case MERGE_ALERT_DATA:
      return {
        ...state,
        alertData: action.newData,
      };
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMesage: action.newAlertMessage,
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
      };
    case SAVE_FAIL:
      return {
        ...state,
        saveing: false,
        error: action.error,
      };
    case SWITCH_DEVICE:
      return {
        ...state,
        deviceSwitch: true,

      };
    case SWITCH_DEVICE_SUCESS:
      return {
        ...state,
        deviceSwitch: false,
      };

    case SWITCH_DEVICE_FAIL:
      return {
        ...state,
        deviceSwitch: false,
        error: action.error,
      };
    case SUBMITFORM:
      return {
        ...state,
        submit: true,

      };
    case SUBMITFORM_SUCESS:
      return {
        ...state,
        submit: false,
      };
    case SUBMITFORM_FAIL:
      return {
        ...state,
        submit: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const start = projectId => {
  return ({
    type: START,
    projectId,
  });
}

export const connecting = projectId => {
  return ({
    type: CONNECTING,
    projectId,
  });
}

export const connected = () => ({
  type: CONNECTED,
});

export const initData = projectId => ({

  types: [INIT_DATA, INIT_DATA_SUCCESS, INIT_DATA_FAIL],
  promise: client => client.get(`data_lives/show/project_id/${projectId}`),
});

export const initDefaultData = projectId => ({

  types: [INIT_DEFAULT_DATA, INIT_DEFAULT_DATA_SUCCESS, INIT_DEFAULT_DATA_FAIL],
  promise: client => client.get(`projects/show/default/value/project_id/${projectId}`),
});

export const getDsMap = projectId => ({
  types: [GET_PROJECT_DSMAP, GET_PROJECT_DSMAP_SUCCESS, GET_PROJECT_DSMAP_FAIL],
  promise: client => client.get(`projects/show/list/project_id/${projectId}`),
});

export const end = () => ({
  type: END,
});

export const mergeData = newData => ({
  type: MERGE_DATA,
  newData,
});

export const changeData = (id, value) => ({

  types: [CHANGE_DATA, CHANGE_DATA_SUCCESS, CHANGE_DATA_FAIL],
  promise: client => client.post("data_lives/update", {
    data: {
      data_node_id: id,
      value,
    },
  }),
});

export const initDefaultAlertData = projectId => ({
  types: [INIT_DEFAULT_ALERT_DATA, INIT_DEFAULT_ALERT_DATA_SUCCESS, INIT_DEFAULT_ALERT_DATA_FAIL],
  promise: client => client.get(`projects/show/alert/level/project_id/${projectId}`),
});

export const mergeAlertData = newData => ({
  type: MERGE_ALERT_DATA,
  newData,
});

export const setAlertMesage = newAlertMessage => ({

  type: SET_ALERT_MESSAGE,
  newAlertMessage,
});

export const save = (page) => ({
  types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
  // promise: (client) => client.post("pages/update", {
  //   data: page,
  // }),
  odoo: client => client.execKw("sc.page", "write", [
    [
      [page.id],
      {
        data: page.data,
      },
    ],
  ]),
});

export const switchDevice = (id) => ({
  types: [SWITCH_DEVICE, SWITCH_DEVICE_SUCESS, SWITCH_DEVICE_FAIL],
  promise: (client) => client.post("projects/device_switch", {
    data: {
      data_node_id: id
    }
  }),
});

export const submitForm = (pageId, ...args) => {
  let data = [];
  if (args) {
    args.map((item, index) => {
      data.push({
        data_node_id: Object.keys(item)[0],
        value: Object.values(item)[0]
      });

    })
  }
  return ({
    types: [SUBMITFORM, SUBMITFORM_SUCESS, SUBMITFORM_FAIL],
    promise: (client) => client.post("from_history_data/create", {
      data: {
        page_id: pageId,
        data: data
      }
    }),
  })
};


import { browserHistory } from "react-router";
import { OPERATION_DELETE, OPERATION_CREATE, OPERATION_EDIT, OPERATION_DEPLOY, OPERATION_CANCEL_DEPLOY } from "../../../components/Common/OperationConstant";

const INIT_INFO = "service/INIT_INFO";
const INIT_INFO_SUCCESS = "service/INIT_INFO_SUCCESS";
const INIT_INFO_FAIL = "service/INIT_INFO_FAIL";

const SEARCH_BY_CONDITION = "service/SEARCH_BY_CONDITION";
const SEARCH_BY_CONDITION_SUCCESS = "service/SEARCH_BY_CONDITION_SUCCESS";
const SEARCH_BY_CONDITION_FAIL = "service/SEARCH_BY_CONDITION_FAIL";

const GETDEVICEINFO = "service/GETDEVICEINFO";
const GETDEVICEINFO_SUCCESS = "service/GETDEVICEINFO_SUCCESS";
const GETDEVICEINFO_FAIL = "service/GETDEVICEINFO_FAIL";

const SEARCH_CLICK = "service/SEARCH_CLICK";
const RETURNSEARCH = "service/RETURNSEARCH";

const CHECKED = "service/CHECKED";
const EXITCHECKED = "service/EXITCHECKED";

const EXITSEARCH = "service/EXITSEARCH";

const FINSH_SEARCH = "service/FINSH_SEARCH";


const initialState = {
  list: [],
  searchBar: false,
  detailInfo: {},
  detail: false,
  isSearch: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_INFO:
      return {
        ...state,
        searching: true,
        refresh: false,
        error: null,
      };
    case INIT_INFO_SUCCESS:
      return {
        ...state,
        searching: true,
        refresh: true,
        list: action.result,
      };
    case INIT_INFO_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };
    case SEARCH_BY_CONDITION:
      return {
        ...state,
        refresh: false,
        searchByCondition: true,

      };
    case SEARCH_BY_CONDITION_SUCCESS:
      return {
        ...state,
        searchByCondition: false,
        refresh: true,
        isSearch: false,
        list: action.result,
      };
    case SEARCH_BY_CONDITION_FAIL:
      return {
        ...state,
        refresh: false,
        searchByCondition: false,
        err: action.error,
      };
    case GETDEVICEINFO:
      return {
        ...state,
        deviceInfo: false
      };
    case GETDEVICEINFO_SUCCESS:
      return {
        ...state,
        deviceInfo: true,
      };
    case GETDEVICEINFO_FAIL:
      return {
        ...state,
        deviceInfo: false
      }
    case SEARCH_CLICK:
      return {
        ...state,
        searchBar: true,
      };
    case RETURNSEARCH:
      console.log("-=-=-=", state);
      return {
        ...state,
        isSearch: true,
      }
    case CHECKED:
      return {
        ...state,
        detail: true,
        detailInfo: action.Info,
      };
    case EXITCHECKED:
      return {
        ...state,
        detail: false,
        isSearch: false,
      };
    case EXITSEARCH:
      return {
        ...state,
        searchBar: false,
      };

    case FINSH_SEARCH:
      return {
        ...state,
        refresh: false,
        searchBar: false,
      };

    default:
      return state;
  }
}
export function getAllResult() {
  return {
    types: [INIT_INFO, INIT_INFO_SUCCESS, INIT_INFO_FAIL],
    wechat: client => client.get("/repair/get_repair_record", {
      urlParams: {
        "user_id": 1,
        "state": 1
      }
    })
  };
}


export function finishSearch() {
  return {
    type: FINSH_SEARCH,
  };
}

export function getQueryResult(code) {
  console.log(code);
  return {
    types: [SEARCH_BY_CONDITION, SEARCH_BY_CONDITION_SUCCESS, SEARCH_BY_CONDITION_FAIL],
    wechat: client => client.get("/query/get_repair_record_by_device_code", {
      urlParams: {
        "user_id": 1,
        "code": code,
      }
    })
  };
}
export function getDeviceInfo(code) {
  console.log(code);
  return {
    types: [GETDEVICEINFO, GETDEVICEINFO_SUCCESS, GETDEVICEINFO_FAIL],
  // wechat: client => client.get("/repair/get_repair_record", {
  //   urlParams: {
  //     "user_id": 1,
  //     "state": 1
  //   }
  // })
  };
}

export function returnSearch() {
  return {
    type: RETURNSEARCH,
  };
}

export function searchClick() {
  return {
    type: SEARCH_CLICK,

  }
}

export function checkDetailInfo(Info) {
  console.log("dateil::", Info)
  return {
    type: CHECKED,
    Info,
  }
}

export function exitCheckDetail() {
  return {
    type: EXITCHECKED,
  }
}


export function exitSearch() {
  return {
    type: EXITSEARCH,
  }
}

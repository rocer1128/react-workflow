import { browserHistory } from "react-router";
import { OPERATION_DELETE, OPERATION_CREATE, OPERATION_EDIT, OPERATION_DEPLOY, OPERATION_CANCEL_DEPLOY } from "../../../components/Common/OperationConstant";

const INIT_INFO = "repair/INIT_INFO";
const INIT_INFO_SUCCESS = "repair/INIT_INFO_SUCCESS";
const INIT_INFO_FAIL = "repair/INIT_INFO_FAIL";

const SEARCH_STAFF = "repair/SEARCH_STAFF";
const SEARCH_STAFF_SUCCESS = "repair/SEARCH_STAFF_SUCCESS";
const SEARCH_STAFF_FAIL = "repair/SEARCH_STAFF_FAIL";

const SEARCH_STATION = "repair/SEARCH_STATION";
const SEARCH_STATION_SUCCESS = "repair/SEARCH_STATION_SUCCESS";
const SEARCH_STATION_FAIL = "repair/SEARCH_STATION_FAIL";

const SEARCH_BY_CONDITION = "repair/SEARCH_BY_CONDITION";
const SEARCH_BY_CONDITION_SUCCESS = "repair/SEARCH_BY_CONDITION_SUCCESS";
const SEARCH_BY_CONDITION_FAIL = "repair/SEARCH_BY_CONDITION_FAIL";

const SEARCH_CLICK = "repair/SEARCH_CLICK";

const DELETE = "repair/DELETE";
const DELETE_SUCCESS = "repair/DELETE_SUCCESS";
const DELETE_FAIL = "repair/DELETE_FAIL";

const CREATE = "repair/CREATE";
const CREATE_SUCCESS = "repair/CREATE_SUCCESS";
const CREATE_FAIL = "repair/CREATE_FAIL";

const EDIT = "repair/EDIT";
const EDIT_SUCCESS = "repair/EDIT_SUCCESS";
const EDIT_FAIL = "repair/EDIT_FAIL";

const CONNECT = "repair/CONNECT";
const CONNECT_SUCCESS = "repair/CONNECT_SUCCESS";
const CONNECT_FAIL = "repair/CONNECT_FAIL";

const CHECKED = "repair/CHECKED";
const EXITCHECKED = "repair/EXITCHECKED";

const EXITSEARCH = "repair/EXITSEARCH";
const EXIT_SEARCH_RESULT = "repair/EXIT_SEARCH_RESULT";

const FINSH_SEARCH = "repair/FINSH_SEARCH";


// const OPEN = "project/OPEN";

const initialState = {
  repairs: [],
  searchBar: false,
  detailInfo: {},
  detail: false,
  searchResult: false,
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
      console.log("result====", action.result);
      return {
        ...state,
        searching: true,
        refresh: true,
        repairs: action.result,
      };
    case INIT_INFO_FAIL:
      console.log("-=-=", action.error);
      return {
        ...state,
        searching: false,
        error: action.error,
      };
    case SEARCH_STAFF:
      return {
        ...state,
        searching: true,
        refresh: false,
        error: null,
      };
    case SEARCH_STAFF_SUCCESS:
      console.log("staff::", action.result);
      return {
        ...state,
        searching: false,
        refresh: true,
        staffs: action.result,
      };
    case SEARCH_STAFF_FAIL:
      return {
        ...state,
        searching: false,
        refresh: false,
        error: action.error,
      };
    case SEARCH_BY_CONDITION:
      return {
        ...state,
        searchByCondition: true,

      };
    case SEARCH_BY_CONDITION_SUCCESS:
      console.log("findResult::", action.result);
      return {
        ...state,
        searchByCondition: false,
        searchBar: false,
        repairs: action.result,
      };
    case SEARCH_BY_CONDITION_FAIL:
      return {
        ...state,
        searchByCondition: false,
        err: action.error,
      };

    case SEARCH_STATION:
      return {
        ...state,
        searching: true,
        refresh: false,
        error: null,
      };
    case SEARCH_STATION_SUCCESS:
      return {
        ...state,
        searching: false,
        refresh: true,
        stations: action.result,
      };
    case SEARCH_STATION_FAIL:
      return {
        ...state,
        searching: false,
        error: action.error,
      };
    case SEARCH_CLICK:
      return {
        ...state,
        searchBar: true,
        searchResult: true
      };
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
      };
    case EXITSEARCH:
      return {
        ...state,
        searchBar: false,
      };
    case EXIT_SEARCH_RESULT:
      return {
        ...state,
        searchResult: false,
      }

    case FINSH_SEARCH:
      return {
        ...state,
        refresh: false,
      };

    default:
      return state;
  }
}
export function getAllResult() {
  return {
    types: [INIT_INFO, INIT_INFO_SUCCESS, INIT_INFO_FAIL],
    wechat: client => client.get("/apply/get_apply_record", {
      urlParams: {
        "user_id": 1,
        "state": 1
      }
    })
  // odoo: client => client.execKw("sc.project", "search_read", [[[], ["id", "name"]]]),
  };
}

export function searchStaff(uid) {
  return {
    types: [SEARCH_STAFF, SEARCH_STAFF_SUCCESS, SEARCH_STAFF_FAIL],
    wechat: client => client.get("/query/get_apply_users_info", {
      urlParams: {
        "user_id": uid,
      }
    })
  // odoo: client => client.execKw("sc.project", "search_read", [[[], ["id", "name"]]]),
  };
}

export function finishSearch() {
  return {
    type: FINSH_SEARCH,
  };
}

export function getQueryResult(conditions) {
  console.log(conditions);
  return {
    types: [SEARCH_BY_CONDITION, SEARCH_BY_CONDITION_SUCCESS, SEARCH_BY_CONDITION_FAIL],
    wechat: client => client.post("/query/query_repair_apply", {
      data: {
        "user_id": conditions.user_id,
        "station": conditions.station,
        "applyUserId": conditions.applyUserId,
        "starttime": conditions.starttime,
        "endtime": conditions.endtime,
        "recordContent": conditions.recordContent

      }
    })
  // odoo: client => client.execKw("sc.project", "search_read", [[[["id", "=", conditions.station]], ["id", "name"]]]),
  }


}

export function searchStations() {
  return {
    types: [SEARCH_STATION, SEARCH_STATION_SUCCESS, SEARCH_STATION_FAIL],
    odoo: client => client.execKw("sc.project", "search_read", [[[], ["id", "name"]]]),
  }

}

export function searchClick() {
  return {
    type: SEARCH_CLICK,

  }

}

export function exitSearchResult() {
  return {
    type: EXIT_SEARCH_RESULT,
  }

}

export function checkDetailInfo(Info) {
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

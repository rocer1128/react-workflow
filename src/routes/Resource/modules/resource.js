import { OPERATION_DELETE, OPERATION_UPLOAD } from "../../../components/Common/OperationConstant";

const SEARCH = "resource/SEARCH";
const SEARCH_SUCCESS = "resource/SEARCH_SUCCESS";
const SEARCH_FAIL = "resource/SEARCH_FAIL";

const SEARCHBYNAME = "resource/SEARCHBYNAM";
const SEARCHBYNAME_SUCCESS = "resource/SEARCHBYNAME_SUCCESS";
const SEARCHBYNAME_FAIL = "resource/SEARCHBYNAME_FAIL";

const UPLOAD = "resource/UPLOAD";
const UPLOAD_SUCCESS = "resource/UPLOAD_SUCCESS";
const UPLOAD_FAIL = "resource/UPLOAD_FAIL";

const DELETE = "resource/DELETE";
const DELETE_SUCCESS = "resource/DELETE_SUCCESS";
const DELETE_FAIL = "resource/DELETE_FAIL";

const initialState = {
  listRes: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        listRes: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        listRes: [],
        error: action.error,
      };
    case SEARCHBYNAME:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    case SEARCHBYNAME_SUCCESS:
      return {
        ...state,
        listRes: action.result,
      };
    case SEARCHBYNAME_FAIL:
      return {
        ...state,
        listRes: [],
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
        operation: OPERATION_UPLOAD,
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
    default:
      return state;
  }
}

export function searchResource() {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    odoo: client => client.execKw("sc.resource", "search_read", [[[], ["id", "category", "name", "file_type"]]]),
  };
}

export function searchResourceByName(name) {
  return {
    types: [SEARCHBYNAME, SEARCHBYNAME_SUCCESS, SEARCHBYNAME_FAIL],
    odoo: client => client.execKw("sc.resource", "search_read", [[[["name", "=", name]], ["id", "category", "name", "file_type"]]]),
  };
}

export function deleteResource(index) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    odoo: client => client.execKw("sc.resource", "unlink", [[[index]]]),
  };
}

export function uploadResource(rs) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    odoo: client => client.execKw("sc.resource", "create", [
      [
        {
          name: rs.name,
          category: rs.category,
          file_type: rs.file_type,
        },
      ],
    ]),
  };
}

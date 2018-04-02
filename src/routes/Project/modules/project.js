import { browserHistory } from "react-router";
import { OPERATION_DELETE, OPERATION_CREATE, OPERATION_EDIT, OPERATION_DEPLOY, OPERATION_CANCEL_DEPLOY } from "../../../components/Common/OperationConstant";

const SEARCH = "project/SEARCH";
const SEARCH_SUCCESS = "project/SEARCH_SUCCESS";
const SEARCH_FAIL = "project/SEARCH_FAIL";

const DEPLOY = "project/DEPLOY";
const DEPLOY_SUCCESS = "project/DEPLOY_SUCCESS";
const DEPLOY_FAIL = "project/DEPLOY_FAIL";

const CANCEL_DEPLOY = "project/CANCEL_DEPLOY";
const CANCEL_DEPLOY_SUCCESS = "project/CANCEL_DEPLOY_SUCCESS";
const CANCEL_DEPLOY_FAIL = "project/CANCEL_DEPLOY_FAIL";

const DELETE = "project/DELETE";
const DELETE_SUCCESS = "project/DELETE_SUCCESS";
const DELETE_FAIL = "project/DELETE_FAIL";

const CREATE = "project/CREATE";
const CREATE_SUCCESS = "project/CREATE_SUCCESS";
const CREATE_FAIL = "project/CREATE_FAIL";

const EDIT = "project/EDIT";
const EDIT_SUCCESS = "project/EDIT_SUCCESS";
const EDIT_FAIL = "project/EDIT_FAIL";

const GET_PROJECT_INFO = "project/GET_PROJECT_INFO";
const GET_PROJECT_INFO_SUCCESS = "project/GET_PROJECT_INFO_SUCCESS";
const GET_PROJECT_INFO_FAIL = "project/GET_PROJECT_INFO_FAIL";

const GET_PROJECT_PAGES = "project/GET_PROJECT_PAGES";
const GET_PROJECT_PAGES_SUCCESS = "project/GET_PROJECT_PAGES_SUCCESS";
const GET_PROJECT_PAGES_FAIL = "project/GET_PROJECT_PAGES_FAIL";


const OPEN = "project/OPEN";

const initialState = {
  listProject: [],
  projectInfo: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searching: true,
        refresh: false,
        error: null,
      };
    case SEARCH_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        searching: false,
        listProject: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searching: false,
        listProject: [],
        error: action.error,
      };
    case DEPLOY:
      return {
        ...state,
        deplying: true,
        refresh: false,
        error: null,
      };
    case DEPLOY_SUCCESS:
      return {
        ...state,
        deplying: false,
        operationResult: action.result,
        refresh: true,
        operation: OPERATION_DEPLOY,
      };
    case DEPLOY_FAIL:
      return {
        ...state,
        deplying: false,
        operationResult: action.result,
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
        operationResult: action.result,
        refresh: true,
        operation: OPERATION_DELETE,
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleteing: false,
        operationResult: action.result,
        error: action.error,
      };
    case EDIT:
      return {
        ...state,
        editing: true,
        refresh: false,
        error: null,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        editing: false,
        operationResult: action.result,
        refresh: true,
        operation: OPERATION_EDIT,
      };
    case EDIT_FAIL:
      return {
        ...state,
        editing: false,
        operationResult: action.result,
        error: action.error,
      };
    case CREATE:
      return {
        ...state,
        createing: true,
        createState: false,
        refresh: false,
        error: null,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        createing: false,
        createState: true,
        operationResult: action.result,
        operation: OPERATION_CREATE,
      };
    case CREATE_FAIL:
      return {
        ...state,
        createing: false,
        operationResult: action.result,
        error: action.error,
      };
    case OPEN:
      return {
        ...state,
        createState: false,
        refresh: false,
        error: null,
      };
    case GET_PROJECT_INFO:
      return {
        ...state,
        refresh: false,
        infoChaning: true,
        error: null,
      };
    case GET_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        infoChaning: false,
        refresh: false,
        projectInfo: action.result[0],
      };
    case GET_PROJECT_INFO_FAIL:
      return {
        ...state,
        getProjectPages: false,
        error: action.error,
      };
    case GET_PROJECT_PAGES:
      return {
        ...state,
        refresh: false,
        getProjectPages: true,
        error: null,
      };
    case GET_PROJECT_PAGES_SUCCESS:
      return {
        ...state,
        getProjectPages: false,
        refresh: false,
        projectPages: action.result,
      };
    case GET_PROJECT_PAGES_FAIL:
      return {
        ...state,
        infoChaning: false,
        error: action.error,
      };
    case CANCEL_DEPLOY:
      return {
        ...state,
        deplying: true,
        refresh: false,
        error: null,
      };
    case CANCEL_DEPLOY_SUCCESS:
      return {
        ...state,
        deplying: false,
        operationResult: action.result,
        refresh: true,
        operation: OPERATION_CANCEL_DEPLOY,
      };
    case CANCEL_DEPLOY_FAIL:
      return {
        ...state,
        deplying: false,
        operationResult: action.result,
        error: action.error,
      };
    default:
      return state;
  }
}
export function searchProject() {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    odoo: client => client.execKw("sc.project", "search_read", [[[], ["id", "name", "category", "description", "work_ip", "devices_ip", "deploy_time", "state", "local_state", "create_date", "write_date"]]]),
  };
}

export function deplyProject(deploy) {
  console.log("deploy");
  return {
    types: [DEPLOY, DEPLOY_SUCCESS, DEPLOY_FAIL],
    odoo: client => client.execKw("sc.project", "write", [[[deploy.id], {
      deploy_time: deploy.deploy_time,
      state: deploy.state
    }]]),
  };
}
export function deleteProject(projectId) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    odoo: client => client.execKw("sc.project", "unlink", [[projectId]]),
  };
}

// export function deletePages(projectId){
//    return {
//     types: [DELETE_PAGE, DELETE_PAGE_SUCCESS, DELETE_PAGE_FAIL],
//     odoo: client => client.execKw("sc.page", "search", [[["page_id",'=',projectId]],(err,value)=>{
//       if (err){
//         console.log(err);
//       }
//       else{
//         odoo:client=>client.execKw('sc.page')
//       }

//     }),
//   };

// }
export function createProject(project) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    odoo: client => client.execKw("sc.project", "create", [[{
      name: project.name,
      // create_uid: project.user_id,
      category: project.category,
      description: project.description,
      state: false,
      work_ip: project.work_ip,
      device_ip: project.device_ip,
      local_state: false
    // is_create_health_data_sources: project.is_create_health_data_sources,
    }]]),

  };
}
export function editProject(project) {
  return {
    types: [EDIT, EDIT_SUCCESS, EDIT_FAIL],
    odoo: client => client.execKw("sc.project", "write", [[[project.id], {
      name: project.name,
      category: project.category,
      description: project.description,
      write_date: project.modify_time,
      work_ip: project.work_ip
    }]]),
  };
}
export function openProject(projectId) {
  browserHistory.push({
    pathname: "/workbench",
    query: {
      id: projectId,
      from: "project",
    },
  });
  return {
    type: OPEN,
    result: projectId,
  };
}


export const getProjectInfo = (projectId) => {
  return {
    types: [GET_PROJECT_INFO, GET_PROJECT_INFO_SUCCESS, GET_PROJECT_INFO_FAIL],
    odoo: client => client.execKw("sc.project", "read", [[projectId]]),
  };
};

export const getProjectPages = (projectId) => {
  return {
    types: [GET_PROJECT_PAGES, GET_PROJECT_PAGES_SUCCESS, GET_PROJECT_PAGES_FAIL],
    odoo: client => client.execKw("sc.page", "search_read", [[[["project_id", "=", projectId]], ["id"]]]),
  };
};

export function cancelDeplyProject(deploy) {
  return {
    types: [CANCEL_DEPLOY, CANCEL_DEPLOY_SUCCESS, CANCEL_DEPLOY_FAIL],
    odoo: client => client.execKw("sc.project", "write", [[[deploy.id], {
      deploy_time: null,
      state: deploy.state
    }]]),
  };
}

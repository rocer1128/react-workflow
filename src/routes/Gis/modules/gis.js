
export const CREATE = "gis/CREATE";
export const CREATE_SUCCESS = "gis/CREATE_SUCCESS";
export const CREATE_FAIL = "gis/CREATE_FAIL";
export const DELETE = "gis/DELETE";
export const DELETE_SUCCESS = "gis/DELETE_SUCCESS";
export const DELETE_FAIL = "gis/DELETE_FAIL";
export const INIT_DATA = "gis/INIT_DATA";
export const INIT_DATA_SUCCESS = "gis/INIT_DATA_SUCCESS";
export const INIT_DATA_FAIL = "gis/INIT_DATA_FAIL";
export const NEWMARKERS = "gis/NEWMARKERS";
export const NEWPROJECTLIST = "gis/NEWPROJECTLIST"
export const SETPOSITION = "gis/SETPOSITION";
export const SETOPTIONS = "gis/SETOPTIONS";
export const SEARCH_PAGE = "gis/SEARCH_PAGE";
export const SEARCH_PAGE_SUCCESS = "gis/SEARCH_PAGE_SUCCESS";
export const SEARCH_PAGE_FAIL = "gis/SEARCH_PAGE_FAIL";
export const SEARCH_PROJECT = "gis/SEARCH_PROJECT";
export const SEARCH_PROJECT_SUCCESS = "gis/SEARCH_PROJECT_SUCCESS";
export const SEARCH_PROJECT_FAIL = "gis/SEARCH_PROJECT_FAIL";
export const INIT_PROJECTLIST = "gis/INIT_PROJECTLIST";
export const INIT_PROJECTLIST_SUCCESS = "gis/INIT_PROJECTLIST_SUCCESS";
export const INIT_PROJECTLIST_FAIL = "gis/INIT_PROJECTLIST_FAIL";
export const LIST_PROJECTID = "gis/LIST_PROJECTID";
export const LIST_PROJECTID_SUCCESS = "gis/LIST_PROJECTID_SUCCESS";
export const LIST_PROJECTID_FAIL = "gis/LIST_PROJECTID_FAIL";
export const SEARCH_GIS_PAGE = "gis/SEARCH_GIS_PAGE";
export const SEARCH_GIS_PAGE_SUCCESS = "gis/SEARCH_GIS_PAGE_SUCCESS";
export const SEARCH_GIS_PAGE_FAIL = "gis/SEARCH_GIS_PAGE_FAIL";



import __ from "lodash";
import { GIS_CATEGORY_TYPES } from "components/Common/ComponentConstant";
import { OPERATION_DELETE, OPERATION_CREATE } from "../../../components/Common/OperationConstant";

const initialState = {
  listProject: [],
  listPages: [],
  markers: [],
  listPath: {},
  pages: [],
  options: [],
  listPageId: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        dataIniting: true,
        init: false,
        refresh: false,
        error: null,
      };
    case INIT_DATA_SUCCESS:
      const markers = [];
      // const newListPages = [];
      const listPath = [];
      const listGis = action.result;
      if (listGis) {
        listGis.map((gis, key) => {
          if (gis && !__.isEqual({}, gis)) {
            const newInfo = Object.assign(gis.gis_info, {
              // projectId: gis.project_id,
              pageId: gis.page_id,
              id: gis.id,
            });

            markers.push(newInfo);
            const position = __.pick(gis.gis_info, "position");
            const category = __.pick(gis.category, "category");
            const newPath = Object.assign(position, category, {
              pageId: gis.page_id,
              projectId: gis.gis_info.projectId,
              id: gis.id
            });
            listPath.push(newPath);
          }
        // } else {
        //   newListPages.push(page);
        // }
        });
      }

      let pathGroupByPid = __.groupBy(listPath, path => path.projectId); // 根据id进行分组
      let markerGroup = __.groupBy(markers, marker => marker.category); // 根据categroy进行分组
      const options = __.map(markerGroup, (val, key) => {
        return {
          label: GIS_CATEGORY_TYPES[key],
          value: key,
        };
      });
      return {
        ...state,
        dataIniting: true,
        markers: markers,
        listPath: pathGroupByPid,
        options: options,
        init: true,
      };
    case INIT_DATA_FAIL:
      return {
        ...state,
        dataIniting: false,
        error: action.error,
      };
    case INIT_PROJECTLIST:
      return {
        ...state,
        initProList: true,
      };
    case INIT_PROJECTLIST_SUCCESS:
      return {
        ...state,
        initProList: true,
        listProject: action.result,
      };
    case INIT_PROJECTLIST_FAIL:
      return {
        ...state,
        initProList: false,
        error: action.error,
      };
    case CREATE:
      return {
        ...state,
        saving: true,
        refresh: false,
      // operationState: false,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        saving: false,
        refresh: true,
        operationState: true,
        operationResult: action.result,
        operation: OPERATION_CREATE,
      };
    case CREATE_FAIL:
      return {
        ...state,
        saving: false,
        error: action.error,
      };
    case DELETE:
      return {
        ...state,
        deleting: true,
        refresh: false,
        // operationState: false,

      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        refresh: true,
        operationState: true,
        operationResult: action.result,
        searchGisByPage: false,
        operation: OPERATION_DELETE,
      };

    case DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        searchGisByPage: false,
        error: action.error,
      };

    case NEWMARKERS:
      return {
        ...state,
        refresh: false,
        init: false,
        operationState: false,
        newMarkers: action.markers,

      };
    case NEWPROJECTLIST:
      return {
        ...state,
        refresh: false,
        init: false,
        operationState: false,
        newProjectList: action.projectList,
      };
    case SETPOSITION:
      return {
        ...state,
        position: action.position,
      };
    case SETOPTIONS:
      return {
        ...state,
        options: action.options,
      };
    case SEARCH_PAGE:
      return {
        ...state,
        search: true,
      };
    case SEARCH_PAGE_SUCCESS:
      return {
        ...state,
        search: true,
        pages: action.result,

      };
    case SEARCH_PAGE_FAIL:
      return {
        ...state,
        search: false,
        error: action.error,
      };
    case SEARCH_PROJECT:
      return {
        ...state,
        searchProject: true,
      };
    case SEARCH_PROJECT_SUCCESS:
      const project = action.result;
      const gisInfo = project.gis_info;
      return {
        ...state,
        searchProject: true,
        gisInfo: gisInfo,

      };
    case SEARCH_PROJECT_FAIL:
      return {
        ...state,
        searchProject: false,
        error: action.error,
      };
    case LIST_PROJECTID:
      return {
        ...state,
        searchPageIds: true,
      };
    case LIST_PROJECTID_SUCCESS:
      const list = action.result;
      const listPageId = [];
      list.map((item, key) => {
        listPageId.push(
          item.page_id[0]
        );
      });
      console.log("-----", action.result);
      return {
        ...state,
        searchPageIds: true,
        listPageId: listPageId,
      };
    case LIST_PROJECTID_FAIL:
      return {
        ...state,
        searchPageIds: false,
        error: action.error,
      };
    case SEARCH_GIS_PAGE:
      return {
        ...state,
        searchGisByPage: true,
      };
    case SEARCH_GIS_PAGE_SUCCESS:
      console.log("pageId", action.result);
      return {
        ...state,
        searchGisByPage: true,
        pageId: action.result,
      };
    case SEARCH_GIS_PAGE_FAIL:
      return {
        ...state,
        searchGisByPage: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export const groupMarkers = markers => ({
  type: NEWMARKERS,
  markers,
});

export const newListProject = projectList => ({
  type: NEWPROJECTLIST,
  projectList,
});

export const initProjectList = () => ({
  types: [INIT_PROJECTLIST, INIT_PROJECTLIST_SUCCESS, INIT_PROJECTLIST_FAIL],
  odoo: client => client.execKw("sc.project", "search_read", [[[], ["id", "create_uid", "name", "category", "description", "work_ip", "devices_ip", "deploy_time", "state", "local_state", "create_date", "write_date"]]]),
});

export const initGisInfo = () => ({
  types: [INIT_DATA, INIT_DATA_SUCCESS, INIT_DATA_FAIL],
  odoo: client => client.execKw("sc.gis", "search_read", [[[], ["id", "name", "category", "gis_info", "page_id"]]]),
});

export const createGisInfo = (gisInfo) => ({
  types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
  odoo: client => client.execKw("sc.gis", "create", [[{
    name: gisInfo.name,
    category: gisInfo.category,
    gis_info: gisInfo,
    page_id: gisInfo.pageId
  }]]),
});

export const delGisInfo = gisId => ({
  types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
  odoo: client => client.execKw("sc.gis", "unlink", [[gisId]]),
});

export const searchGisByPageId = pageId => {
  console.log(pageId);
  return ({
    types: [SEARCH_GIS_PAGE, SEARCH_GIS_PAGE_SUCCESS, SEARCH_GIS_PAGE_FAIL],
    odoo: client => client.execKw("sc.gis", "search_read", [[[["page_id", "=", pageId]], ["id"]]]),
  });
}



export const searchPageIds = () => ({
  types: [LIST_PROJECTID, LIST_PROJECTID_SUCCESS, LIST_PROJECTID_FAIL],
  odoo: client => client.execKw("sc.gis", "search_read", [[[], ["page_id"]]]),
});


export const searchPages = (projectId, listPageId) => ({
  types: [SEARCH_PAGE, SEARCH_PAGE_SUCCESS, SEARCH_PAGE_FAIL],
  odoo: client => client.execKw("sc.page", "search_read", [[[["id", "not in", listPageId], ["project_id", "=", projectId]], ["id", "name", "project_id", "write_uid", "page_data", "create_date", "write_date", "process_control"]]]),

});


export const searchProject = projectId => ({
  types: [SEARCH_PROJECT, SEARCH_PROJECT_SUCCESS, SEARCH_PROJECT_FAIL],
  odoo: client => client.execKw("sc.project", "read", [projectId]),
});



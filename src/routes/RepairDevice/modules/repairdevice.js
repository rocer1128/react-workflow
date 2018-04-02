const SEARCH = "repairdevice/SEARCH";
const SEARCH_SUCCESS = "repairdevice/SEARCH_SUCCESS";
const SEARCH_FAIL = "repairdevice/SEARCH_FAIL";

const SUBMIT = "repairdevice/SUBMIT";
const SUBMIT_SUCCESS = "repairdevice/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "repairdevice/SUBMIT_FAIL";

const SUBMIT_WORKFLOW_FINISH = "repairdevice/SUBMIT_WORKFLOW_FINISH";

const initialState = {
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        catalog: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case SUBMIT:
      return {
        ...state,
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        refresh: action.result,
      };
    case SUBMIT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case SUBMIT_WORKFLOW_FINISH:
      return {
        ...state,
        refresh: false,
        error: null,
      };
    default:
      return state;
  }
}

export const searchInfo = (user) => {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    wechat: client => client.get(`/repair/get_apply_record?user_id=${user}`),
  };
};

export const submitInfo = (redata) => {
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    wechat: client => client.post("/repair/post_data_to_session", {
      data: redata,
    }),
  };
};

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

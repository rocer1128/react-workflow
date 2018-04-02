const SEARCH = "machinerepair/SEARCH";
const SEARCH_SUCCESS = "machinerepair/SEARCH_SUCCESS";
const SEARCH_FAIL = "machinerepair/SEARCH_FAIL";

const SUBMIT = "machinerepair/SUBMIT";
const SUBMIT_SUCCESS = "machinerepair/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "machinerepair/SUBMIT_FAIL";

const SUBMIT_WORKFLOW_FINISH = "machinerepair/SUBMIT_WORKFLOW_FINISH";

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

export const searchInfo = (user, code) => {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    wechat: client => client.get(`apply/get_device_fault_info?user_id=${user}&code=${code}`),
  };
};

export const submitInfo = (redata) => {
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    wechat: client => client.post("apply/post_repair_apply_info", {
      data: redata,
    }),
  };
};

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

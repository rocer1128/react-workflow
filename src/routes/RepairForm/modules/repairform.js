const SEARCH = "repairform/SEARCH";
const SEARCH_SUCCESS = "repairform/SEARCH_SUCCESS";
const SEARCH_FAIL = "repairform/SEARCH_FAIL";

const SUBMIT = "repairform/SUBMIT";
const SUBMIT_SUCCESS = "repairform/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "repairform/SUBMIT_FAIL";

const SUBMIT_WORKFLOW_FINISH = "repairform/SUBMIT_WORKFLOW_FINISH";

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
    wechat: client => client.get(`/repair/get_repair_form_info?user_id=${user}&repair_form_id=${code}`),
  };
};

export const submitInfo = (redata) => {
  return {
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    wechat: client => client.post("/repair/post_update_repair_form", {
      data: redata,
    }),
  };
};

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

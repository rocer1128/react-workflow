const SEARCH = "stoppage/SEARCH";
const SEARCH_SUCCESS = "stoppage/SEARCH_SUCCESS";
const SEARCH_FAIL = "stoppage/SEARCH_FAIL";

const SUBMIT = "stoppage/SUBMIT";
const SUBMIT_SUCCESS = "stoppage/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "stoppage/SUBMIT_FAIL";

const SUBMIT_WORKFLOW_FINISH = "stoppage/SUBMIT_WORKFLOW_FINISH";

const initialState = {};
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
        refresh: action.result.create_state,
        form: action.result.repair_form_id,
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

export const searchInfo = (uid, rid, type) => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  wechat: client => client.get(`/repair/get_fault_solution?user_id=${uid}&repair_apply_id=${rid}&apply_type=${type}`),
});

export const submitInfo = redata => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  wechat: client =>
    client.post("/repair/post_create_repair_form", {
      data: redata,
    }),
});

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

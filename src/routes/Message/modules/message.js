const SEARCH = "message/SEARCH";
const SEARCH_SUCCESS = "message/SEARCH_SUCCESS";
const SEARCH_FAIL = "message/SEARCH_FAIL";

const SUBMIT = "message/SUBMIT";
const SUBMIT_SUCCESS = "message/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "message/SUBMIT_FAIL";

const WRONG = "message/WRONG";
const WRONG_SUCCESS = "message/WRONG_SUCCESS";
const WRONG_FAIL = "message/WRONG_FAIL";
const SUBMIT_WORKFLOW_FINISH = "message/SUBMIT_WORKFLOW_FINISH";

const initialState = {
  type: null,
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
        type: action.result.apply_type,
      };
    case SUBMIT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case WRONG:
      return {
        ...state,
      };
    case WRONG_SUCCESS:
      return {
        ...state,
        type: "WRONG",
        wrong: action.result,
      };
    case WRONG_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case SUBMIT_WORKFLOW_FINISH:
      return {
        ...state,
        type: false,
        error: null,
      };
    default:
      return state;
  }
}

export const searchInfo = (uid, rid) => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  wechat: client => client.get(`/repair/get_info_handle?user_id=${uid}&repair_apply_id=${rid}`),
});

export const submitInfo = (uid, rid) => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  wechat: client => client.get(`/repair/get_handle_confirm?user_id=${uid}&repair_apply_id=${rid}`),
});

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

export const submitWrong = (uid, rid) => ({
  types: [WRONG, WRONG_SUCCESS, WRONG_FAIL],
  wechat: client => client.get(`/repair/get_handle_error?user_id=${uid}&repair_apply_id=${rid}`),
});

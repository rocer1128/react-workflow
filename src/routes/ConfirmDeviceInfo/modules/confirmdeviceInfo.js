const SEARCH = "confirmdeviceInfo/SEARCH";
const SEARCH_SUCCESS = "confirmdeviceInfo/SEARCH_SUCCESS";
const SEARCH_FAIL = "confirmdeviceInfo/SEARCH_FAIL";

const SUBMIT = "confirmdeviceInfo/SUBMIT";
const SUBMIT_SUCCESS = "confirmdeviceInfo/SUBMIT_SUCCESS";
const SUBMIT_FAIL = "confirmdeviceInfo/SUBMIT_FAIL";

const SUBMIT_WORKFLOW_FINISH = "confirmdeviceInfo/SUBMIT_WORKFLOW_FINISH";

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
        submit: action.result.apply_type,
        refresh: true,
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

export const searchInfo = (uid, rid) => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  wechat: client => client.get(`/repair/get_module_list?user_id=${uid}&repair_apply_id=${rid}`),
});

export const submitInfo = (uid, rid, mid) => ({
  types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
  wechat: client =>
    client.post("/repair/post_module_confirm", {
      data: {
        "user_id": uid,
        "repair_apply_id": rid,
        "module_id": mid,
      },
    }),
});

export const submitFinish = () => ({
  type: SUBMIT_WORKFLOW_FINISH,
});

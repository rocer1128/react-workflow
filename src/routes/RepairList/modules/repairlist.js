const SEARCH = "repairlist/SEARCH";
const SEARCH_SUCCESS = "repairlist/SEARCH_SUCCESS";
const SEARCH_FAIL = "repairlist/SEARCH_FAIL";

const initialState = {
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
      };
    case SEARCH_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        catalog: action.result,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export const searchInfo = (user) => {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    wechat: client => client.get(`/repair/get_repair_task?user_id=${user}`),
  };
};

const SEARCH = "modulelist/SEARCH";
const SEARCH_SUCCESS = "modulelist/SEARCH_SUCCESS";
const SEARCH_FAIL = "modulelist/SEARCH_FAIL";

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

export const searchInfo = (user, code) => {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    wechat: client => client.get(`/apply/get_device_module_info?user_id=${user}&code=${code}`),
  };
};

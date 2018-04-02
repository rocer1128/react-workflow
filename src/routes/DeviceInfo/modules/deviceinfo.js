const SEARCH = "deviceinfo/SEARCH";
const SEARCH_SUCCESS = "deviceinfo/SEARCH_SUCCESS";
const SEARCH_FAIL = "deviceinfo/SEARCH_FAIL";

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
        device: action.result,
      };
    case SEARCH_FAIL:
      console.log(action.error)
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
    wechat: client => client.get(`apply/get_device_info?user_id=${user}&code=${code}`),
  };
};

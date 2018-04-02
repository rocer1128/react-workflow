const SIGN = "repair/SIGN";
const SIGN_SUCCESS = "repair/SIGN_SUCCESS";
const SIGN_FAIL = "repair/SIGN_FAIL";

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN:
      return {
        ...state,
      };
    case SIGN_SUCCESS:
      console.log(action);
      return {
        sign: action.result,
        ...state,
      };
    case SIGN_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function sign() {
  console.log("sign");
  return {
    types: [SIGN, SIGN_SUCCESS, SIGN_FAIL],
    wechat: client =>
      client.get("wechat/get_jsapi_signature?url=http://www.baidu.com"),
  };
}

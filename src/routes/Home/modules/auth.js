import { OPERATION_LOGIN } from "components/Common/OperationConstant";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";
const LOGIN_FINISH = "auth/LOGIN_FINISH";

const WECHAT_LOGIN = "auth/WECHAT_LOGIN";
const WECHAT_LOGIN_SUCCESS = "auth/WECHAT_LOGIN_SUCCESS";
const WECHAT_LOGIN_FAIL = "auth/WECHAT_LOGIN_FAIL";

const CONNECT = "auth/CONNECT";
const CONNECT_SUCCESS = "auth/CONNECT_SUCCESS";
const CONNECT_FAIL = "auth/CONNECT_FAIL";

const LOGOUT = "auth/LOGOUT";
const QLOGIN = "auth/QLOGIN";

const initialState = {
  // user: 1,
  // operationState: true,
  wechat: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        operationState: false,
        operation: OPERATION_LOGIN,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        operationState: true,
        user: action.result,
      // user: 1,
      };
    case LOGIN_FAIL:
      console.log(action.error);
      return {
        ...state,
        loggingIn: false,
        user: null,
        error: action.error,
      };
    case QLOGIN:
      console.log(action.query);
      return {
        ...state,
        operationState: true,
        wechat: true,
        user: action.query.uid,
        back_uri: action.query.back_uri,
      };
    case WECHAT_LOGIN:
      return {
        ...state,
        connecting: true,
        operationState: false,
      };
    case WECHAT_LOGIN_SUCCESS:
      console.log("user::", action.result);
      return {
        ...state,
        connecting: false,
        operationState: true,
        wechat: true,
        user: action.result,
      };
    case WECHAT_LOGIN_FAIL:
      return {
        ...state,
        connecting: false,
        user: null,
        error: action.error,
      };
    case CONNECT:
      return {
        ...state,
        wechat: true,
      };
    case LOGIN_FINISH:
      return {
        ...state,
        operation: "",
        operationState: false,
        error: null,
      };
    case LOGOUT:
      return {
        user: null,
      };

    default:
      return state;
  }
}

// export function login(username, password) {
//   return {
//     types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
//     promise: (client) => new Promise((resolve, reject) => {
//       if (username) {
//         resolve({
//           username,
//           password,
//         });
//       } else {
//         reject({
//           code: "001",
//           message: "login error!"
//         })
//       }
//     })
//   }
// }

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    /* promise: (client) => client.post("users/login", {
      data: {
        name: username,
        password: password,
      },
    }), */
    odoo: client => client.authenticate(username, password),
  };
}

export function QLogin(query) {
  return {
    type: QLOGIN,
    query,
  };
}

// export function wechatLogin() {
//   return {
//     types: [WECHAT_LOGIN, WECHAT_LOGIN_SUCCESS, WECHAT_LOGIN_FAIL],
//     wechat: client => client.get("/wechat/post_login", {
//       urlParams: {
//         back_uri: "http://116.90.82.49/wechat/post_login"
//       },
//     })
//   }
// }

export function wechatLogin() {
  console.log("wechat");
  return {
    type: [CONNECT],
  };
}

/* export function wechatConnect(url) {
  console.log(url);
  return {
    types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL],
    wechat: client => client.get("/wechat/post_login", {
      urlParams: {
        redirect: url,
      },
    })
  }
} */

export function loginFinish() {
  return {
    type: LOGIN_FINISH,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}

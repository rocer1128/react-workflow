import superagent from "superagent";
import __ from "lodash";

const methods = ["get", "post", "put", "patch", "del"];
// const OptURL = "http://www.afctoolz.top:5000";
const OptURL = "http://116.90.82.49:5000";
// 格式化URL地址，进行地址的拼接
function formatUrl(path, urlParams = {}) {
  let adjustedPath = path[0] !== "/" ? `/${path}` : path;
  let i = 0;
  __.forIn(urlParams, (value, key) => {
    if (i === 0) {
      adjustedPath += value === "" || value === undefined || value === null ? "" : `?${key}=${value}`;
    } else {
      adjustedPath += value === "" || value === undefined || value === null ? "" : `&${key}=${value}`;
    }
    i++;
  });
  return OptURL + adjustedPath;
}

export default class WechatClient {
  constructor() {
    methods.forEach(
      method => (this[method] = (path, { params, urlParams, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path, urlParams));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }
        /* request.end((err, {
             body
           } = {}) => err ? reject(body || err) : resolve(body)); */
        request.end((err, { status, body } = {}) => {
          if (err) {
            console.log("status==", status);
            if (status === 406) {
              return reject(body.error);
            }
            return reject({
              code: "000",
              message: `状态:${status} 错误:${err}`,
            });
          }
          return resolve(body.data);
        });
      })),
    );
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}

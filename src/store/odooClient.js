import xmlrpc from "xmlrpc";
import url from "url";
import { odooConfig } from "../../config/web.config";

/* const odoo = window.config.odoo;
const uid = odoo.userId;
const password = odoo.password;
*/
const purl = "http://192.168.4.105";
const port = 8069;
const db = "SC2";
const username = "123";
const uid = 1;
const password = "123";

export default class OdooClient {
  constructor() {
    // const urlparts = url.parse(odooConfig.url);
    // this.host = urlparts.hostname;
    // this.port = odooConfig.port || urlparts.port;
    // this.db = odooConfig.db;
    // this.username = odooConfig.username;
    // this.password = odooConfig.password;
    const urlparts = url.parse(purl);
    this.host = urlparts.hostname;
    this.port = port || urlparts.port;
    this.db = db;
    this.secure = true;
    if (urlparts.protocol !== "https:") {
      this.secure = false;
    }
  }

  connect(username, password) {
    const clientOptions = {
      host: this.host,
      port: this.port,
      path: "/xmlrpc/2/common",
    };
    let client;
    if (this.secure === false) {
      client = xmlrpc.createClient(clientOptions);
      console.log("client normal");
    } else {
      client = xmlrpc.createSecureClient(clientOptions);
      console.log(clientOptions);
      console.log(`client https ${this.port}`);
    }
    const params = [this.db, username, password, {}];

    const connectPromise = new Promise((resolve, reject) => {
      client.methodCall("authenticate", params, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });

    return connectPromise;
  }

  execOdoo(model, method, params, type) {
    const clientOptions = {
      host: this.host,
      port: this.port,
      path: "/xmlrpc/2/object",
    };
    let client;
    if (this.secure === false) {
      client = xmlrpc.createClient(clientOptions);
    } else {
      client = xmlrpc.createSecureClient(clientOptions);
    }

    const fparams = [this.db, uid, password, model, method, ...params];

    const promise = new Promise((resolve, reject) => {
      client.methodCall(type, fparams, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });

    return promise;
  }

  authenticate(username, password) {
    const authPromise = new Promise((resolve, reject) => {
      this.connect(username, password).then(value => resolve(value), error => reject(error));
    });
    return authPromise;
  }

  execKw(model, method, params) {
    const kwPromise = new Promise((resolve, reject) => {
      this.execOdoo(model, method, params, "execute_kw").then(value => resolve(value), error => reject(error));
    });
    return kwPromise;
  }

  execWorkflow(model, method, params) {
    const wfPromise = new Promise((resolve, reject) => {
      this.execOdoo(uid, model, method, params, "exec_workflow").then(value => resolve(value), error => reject(error));
    });
    return wfPromise;
  }
}

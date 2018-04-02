import socketIoClient from "socket.io-client";
import moment from "moment";

const SOCKETURL = "http://192.168.4.69:5100"; // socket服务器地址和端口

/**
 * 参考原 wildFox,采用单例模式，静态方法获得 实例
 * 功能：实现 socket客户端 与  socket服务端之间通信,完成数据交互
 */
class Koder {

  /**
   * 静态方法
   * @return  koder实例
   */
  static getInstance() {
    // koder实例为undefine,则进行创建
    if (!Koder.instance) {
      Koder.instance = new Koder();
    }
    return Koder.instance;
  }

  /**
   * 建立socket连接
   */
  start = () => {
    this.socketClient = "";
    this.socket = socketIoClient(SOCKETURL);
    this.socket.on("connect", () => {
      // 连接成功时，添加标记
      this.socketClient = "connect";
    });
    console.log("----------建立socket连接", SOCKETURL);
  }

  /**
   * 发送初始化指令
   * @param  {number} projectId [工程Id]
   */
  startInit = (projectId) => {
    // 0在逻辑为false，但也是合法的projectId
    if (projectId === 0 || (projectId)) {
      const initUrl = `init${projectId}`;
      this.socket.emit(initUrl);
    }
    console.log("----------发送初始化指令", SOCKETURL);
  }
  /**
   * 获取初始化数据
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getInitData = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const initUrl = `init${projectId}`;
      this.socket.on(initUrl, (msg) => {
        console.log("init_info msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
    console.log("--------------获取初始化数据", projectId);
  }

  syncChannelId = (projectId) => {
    // 0在逻辑为false，但也是合法的projectId
    if (projectId === 0 || (projectId)) {
      const syncChannelId = `syncChannelId${projectId}`;
      this.socket.emit(syncChannelId);
    }
    console.log("----------发送初始化指令", SOCKETURL);
  }

  /**
   * 发送初始化指令
   * @param  {number} projectId [工程Id]
   */
  startWaveInit = (projectId) => {
    // 0在逻辑为false，但也是合法的projectId
    if (projectId === 0 || (projectId)) {
      const initUrl = `syncChannelData${projectId}`;
      this.socket.emit(initUrl);
    }
    console.log("----------发送示波器初始化指令", SOCKETURL);
  }

  /**
   * 获取初始化数据
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getSyncChannelId = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const syncChannelId = `syncChannelId${projectId}`;
      this.socket.on(syncChannelId, (msg) => {
        console.log("init_info msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
    console.log("--------------获取初始化数据", projectId);
  }

  /**
   * 监听服务器事件，获取实时数据
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getRealData = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const scanUrl = `scan${projectId}`;
      this.socket.on(scanUrl, (msg) => {
        console.log("YX_info msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
  }

  /**
   * 监听服务器事件，获取报警信息
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getAlertData = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const alertUrl = `alert${projectId}`;
      this.socket.on(alertUrl, (msg) => {
        console.log("alert_info msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
  }

  /**
   * 触发服务器事件，实现遥控
   * @param  {number} projectId  [工程Id]
   * @param  {number} dataNodeId [数据点Id]
   * @param  {[number]} value    [数据点值]
   */
  changeData = (projectId, dataNodeId, value) => {
    const data = {
      project_id: projectId,
      data_node_id: dataNodeId,
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      value,
    };
    console.log("------------遥控数据", data);
    const controlUrl = `control${projectId}`;
    this.socket.emit(controlUrl, data);
  }

  /**
   * 发送绑定信息
   * @param  {[type]} projectId  [工程id]
   * @param  {[type]} dataNodeId [数据点id]
   * @param  {[type]} channelId  [通道id]
   * @return {[type]}            [description]
   */
  bindChannel = (projectId, dataNodeId, channelId) => {
    const data = {
      project_id: projectId,
      data_node_id: dataNodeId,
      channel_id: channelId,
      time: moment().format("YYYY-MM-DD HH:mm:ss"),

    };
    console.log("-----------------绑定Channel通道", data);
    const bind = `bind${projectId}`;
    this.socket.emit(bind, data); // 向koder发送数
  }

  /**
   * 发送解除绑定信息
   * @param  {[type]} projectId  [工程id]
   * @param  {[type]} dataNodeId [数据点id]
   * @param  {[type]} channelId  [通道id]
   * @return {[type]}            [description]
   */
  unbindChannel = (projectId, dataNodeId, channelId) => {
    const data = {
      project_id: projectId,
      data_node_id: dataNodeId,
      channel_id: channelId,
      time: moment().format("YYYY-MM-DD HH:mm:ss"),

    };
    console.log("-----------------解绑Channel通道", data);
    const unbind = `unbind${projectId}`;
    this.socket.emit(unbind, data);
  }

  /**
   * [接收返回的绑定信息]
   * @param  {[type]}   projectId [工程id]
   * @param  {Function} callback  [description]
   * @return {[type]}             [description]
   */
  receiveBindMsg = (projectId, callback) => {
    const bind = `bind${projectId}`;
    this.socket.on(bind, (msg) => { // 接受koder返回的数据
      console.log("Bind_msg=", msg);
      if (msg) {
        callback(msg);
      }
    });
  }

  /**
   * [接收返回的解除绑定信息]
   * @param  {[type]}   projectId [工程id]
   * @param  {Function} callback  [description]
   * @return {[type]}             [description]
   */
  receiveUnbindMsg = (projectId, callback) => {
    const unbind = `unbind${projectId}`;
    this.socket.on(unbind, (msg) => { // 接受koder返回的数据
      console.log("Unbind_msg=", msg);
      if (msg) {
        callback(msg);
      }
    });
  }

  /**
   * 获取初始化CH1数据
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getCH1Data = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const initUrl = `syncChannelData${projectId}CH1`;
      this.socket.on(initUrl, (msg) => {
        console.log("init_info1 msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
    console.log("--------------获取ch1初始化数据", projectId);
  }

  /**
   * 获取初始化CH2数据
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  getCH2Data = (projectId, callback) => {
    if (projectId === 0 || (projectId)) {
      const initUrl = `syncChannelData${projectId}CH2`;
      this.socket.on(initUrl, (msg) => {
        console.log("init_info2 msg=", msg);
        if (msg) {
          callback(msg);
        }
      });
    }
    console.log("--------------获取ch2初始化数据", projectId);
  }

  removeListener = (projectId) => {
    console.log("removeAllListener");
    const syncChannelId = `syncChannelId${projectId}`;
    const bind = `bind${projectId}`;
    const unbind = `unbind${projectId}`;
    this.socket.removeListener(syncChannelId);
    this.socket.removeListener(bind);
  }

  /**
   * 关闭监听CH1CH2
   * @param  {number} projectId [工程Id]
   * @param  {Function} callback  [回调函数]
   */
  offReceiveData = (projectId) => {
    if (projectId === 0 || (projectId)) {
      const offCH1Url = `syncChannelData${projectId}CH1`;
      const offCH2Url = `syncChannelData${projectId}CH2`;
      this.socket.off(offCH1Url);
      this.socket.off(offCH2Url);
    }
    console.log("--------------关闭ch1ch2监听", projectId);
  }

  /**
   * 触发服务器事件，关闭连接
   */
  end = () => {
    console.log("------------关闭连接");
    // socketClient不为undefined
    if (Koder.instance && this.socketClient) {
      this.socket.disconnect();
      this.socketClient = "";
    }
  }
}

// Koder模块导出的是对象
module.exports = Koder.getInstance();

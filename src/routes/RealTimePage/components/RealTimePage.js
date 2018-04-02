import React, { Component, PropTypes } from "react";
import Page from "./Page";

/**
 * ProjectMonitor：运行时类
 */
export default class RealTimePage extends Component {
  static propTypes = {
    getDataSources: PropTypes.func.isRequired, // 加载数据源和点的综合信息
    realTimePage: PropTypes.object.isRequired, // realTimePage对象
    location: PropTypes.object.isRequired, // 地址对象
    getPages: PropTypes.func.isRequired, // 获取页面方法
    getPagesFinish: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    end: PropTypes.func.isRequired,
    test: PropTypes.object.isRequired,
    unregisterAlert: PropTypes.func.isRequired,
    changeData: PropTypes.func.isRequired,
    switchDevice: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataSource: null,
      alerts: null,
      alertSource: null,
    };
  }

  componentWillMount() {
    this.props.getPages(parseInt(this.props.location.query.id, 10));
    this.props.start(parseInt(this.props.location.query.id, 10));
    this.props.getDataSources(parseInt(this.props.location.query.id, 10));
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  componentWillReceiveProps(nextProps) {
    const { test, realTimePage } = nextProps;
    if (realTimePage.searchPageState === true) {
      this.setState({
        data: realTimePage.pages,
      });
      this.props.getPagesFinish();
    }
    if (test.dsMap.length > 0) {
      this.setState({
        dataSource: test.data,
      });
    }
    if (realTimePage.alertInfo) {
      this.registerNotifiaction(realTimePage.alert);
      this.props.unregisterAlert();
    }

    if (test.alertData) {
      this.setState({
        alertSource: test.alertData,
      });
    }
    if (test.alertMesage) {
      this.setState({
        alerts: test.alertMesage,
      });
    }
  }

  /**
  * 卸载的时候停止刷新
  */
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
    window.removeEventListener("unload", this.handleDestroy);
  }

  /**
   * 作为beforeunload事件的回调函数
   */
  onUnload = (e) => { // the method that will be used for both add and remove event
    e.returnValue = "离开该网站";
  }

  setAlert = (key, value) => {
    const { alertSource } = this.state;
    if (key in alertSource) {
      alertSource[key] = value;
      this.setState({
        alertSource,
      });
    }
  }

  setData = (key, value) => {
    this.props.changeData(key, value);
  }

  setDevice = (key) => {
    this.props.switchDevice(key);
  }

  submitForm = (pageId, ...args) => {
    this.props.submitForm(pageId, ...args);
  }

  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    this.props.end();
  }

  render() {
    const { test, realTimePage } = this.props;
    console.log(this.props);
    return (
      <div style={{ marginTop: "5px" }}>
        {test.data && realTimePage.pages && <Page
                                              pKey={this.props.location.query.key ? parseInt(this.props.location.query.key, 10) : 1}
                                              pages={realTimePage.pages}
                                              pKey={this.props.location.query.key ? parseInt(this.props.location.query.key, 10) : 1}
                                              dataSource={test.data}
                                              setData={this.setData}
                                              alertSource={test.alertData}
                                              setAlert={this.setAlert}
                                              alerts={test.alertMesage}
                                              setDevice={this.setDevice}
                                              submitForm={this.submitForm}
                                              ref={ref => (this.realTimePage = ref)}
                                            />}
      </div>
      );
  }
}

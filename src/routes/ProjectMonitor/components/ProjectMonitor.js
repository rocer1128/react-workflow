import React, { Component, PropTypes } from "react";
import moment from "moment";
import ProjectMonitorNavigation from "./ProjectMonitorNavigation";
import ProjectMonitorContent from "./ProjectMonitorContent";
import "./ProjectMonitor.scss";
import DataCurveList from "./RealTimeCurve/DataCurveList";

/**
 * ProjectMonitor：运行时类
 */
export default class ProjectMonitor extends Component {
  static propTypes = {
    getDataSources: PropTypes.func.isRequired, // 加载数据源和点的综合信息
    getDataCurves: PropTypes.func.isRequired, // 加载数据曲线的方法
    getHistory: PropTypes.func.isRequired, // 获取历史数据的方法
    deleteHistory: PropTypes.func.isRequired, // 删除历史数据的方法
    projectMonitor: PropTypes.object.isRequired, // projectMonitor对象
    addDataCurves: PropTypes.func.isRequired, // 新建数据曲线的方法
    deleteDataCurves: PropTypes.func.isRequired, // 删除数据曲线的方法
    updateDataCurves: PropTypes.func.isRequired, // 更新数据曲线的方法
    curve: PropTypes.object.isRequired, // 数据曲线对象
    location: PropTypes.object.isRequired, // 地址对象
    getPages: PropTypes.func.isRequired, // 获取页面方法
    getPagesFinish: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    end: PropTypes.func.isRequired,
    test: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    unregisterAlert: PropTypes.func.isRequired,
    changeData: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired, // 获取警告
    switchDevice: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowAlerts: false,
      viewName: "",
      data: null,
      dataSource: null,
      open: false, // 显示数据曲线组列表
      curveIndex: -1, // 点击的数据曲线组标签索引，默认-1是没有点击
      alerts: null,
      alertSource: null,
    };
    // react-datatime显示改为中文
    moment.updateLocale("en", {
      months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
      monthsShort: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
      weekdaysShort: "周一_周二_周三_周四_周五_周六_周天".split("_"),
      weekdaysMin: "一_二_三_四_五_六_日".split("_"),
    });
    this.onClickDataSource = this.onClickDataSource.bind(this);
    this.onClickAlert = this.onClickAlert.bind(this);
    this.onClickCurve = this.onClickCurve.bind(this);
    this.onClickPage = this.onClickPage.bind(this);
    this.setData = this.setData.bind(this);
    this.setDevice = this.setDevice.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    // this.props.getPages(this.props.location.query.id);
    // this.props.start(this.props.location.query.id);
    // this.props.getDataSources(this.props.location.query.id);
    this.onClickPage();
  }

  componentDidMount() {
    this.props.start(parseInt(this.props.location.query.id, 10));
    this.props.getDataSources(parseInt(this.props.location.query.id, 10));
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  componentWillReceiveProps(nextProps) {
    const { test } = nextProps;
    if (nextProps.projectMonitor.searchPageState === true) {
      this.setState({
        data: nextProps.projectMonitor.pages,
      });
      this.props.getPagesFinish();
    }
    if (test.dsMap.length > 0) {
      this.setState({
        dataSource: test.data,
      });
    }
    if (nextProps.projectMonitor.alertInfo) {
      this.registerNotifiaction(nextProps.projectMonitor.alert);
      this.props.unregisterAlert();
    }
    // 如果对曲线图进行了数据库操作
    if (nextProps.curve.refresh === true) {
      nextProps.getDataCurves(parseInt(this.props.location.query.id, 10));
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

  /**
   * 点击实时数据运行的函数
   */
  onClickDataSource() {
    this.setState({
      viewName: "data",
      open: false,
    });
  }

  /**
   * 点击警告管理运行的函数
   */
  onClickAlert() {
    this.setState({
      viewName: "alert",
      open: false,
    });
  }

  /**
   * 点击数据曲线标签运行的函数
   */
  onClickCurve() {
    // 加载保存在数据库里的曲线组
    this.props.getDataCurves(parseInt(this.props.location.query.id, 10));
    this.setState({
      viewName: "curve",
      open: true,
      curveIndex: -1,
    });
  }

  /**
   * 点击实时画面运行的函数
   */
  onClickPage() {
    this.props.getPages(parseInt(this.props.location.query.id, 10));
    this.setState({
      viewName: "page",
      open: false,
    });
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
   * 选择的要展示的曲线组
   */
  curveIndexShow = (index) => {
    this.setState({
      curveIndex: index,
    });
  }
  // 加载要展示的曲线组
  curveGetShow = (index) => {
    this.projectMonitor.getCurveShow(index);
  }

  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    this.props.end();
  }

  render() {
    if (this.state.data) {
      this.tabId = this.state.data[0].id;
    }
    // 数据方法
    const DataInfo = {
      getHistory: this.props.getHistory,
      deleteHistory: this.props.deleteHistory,
      listDataSource: this.props.projectMonitor.listDataSource,
      listHistory: this.props.projectMonitor.listHistory,
    };
    // 数据曲线方法
    const CurveInfo = {
      addDataCurves: this.props.addDataCurves,
      deleteDataCurves: this.props.deleteDataCurves,
      updateDataCurves: this.props.updateDataCurves,
      listDataCurve: this.props.curve.listDataCurve,
      curveIndex: this.state.curveIndex,
      curveIndexShow: this.curveIndexShow,
    };

    const DataAlert = {
      getAlerts: this.props.getAlerts,
      alerts: this.props.projectMonitor.alerts,
    };

    return (
      <div className="pageview">
        <input type="checkbox" id="sideTogglel" />
        <aside className="asidel">
          <div className="scrolll">
            <ProjectMonitorNavigation onClickCurve={this.onClickCurve} onClickAlert={this.onClickAlert} onClickPage={this.onClickPage} onClickDataSource={this.onClickDataSource} />
            {this.state.open && <DataCurveList listDataCurve={this.props.curve.listDataCurve} curveIndex={this.state.curveIndex} curveIndexShow={this.curveIndexShow} curveGetShow={this.curveGetShow} />}
          </div>
        </aside>
        <div className="warpl_container">
          <div className="warpl">
            <label id="sideMenuControl" htmlFor="sideTogglel">
              <div className="arrowsl" />
            </label>
          </div>
        </div>
        <div className="view">
          <ProjectMonitorContent
            auth={this.props.auth}
            CurveInfo={CurveInfo}
            DataInfo={DataInfo}
            DataAlert={DataAlert}
            viewName={this.state.viewName}
            projectId={parseInt(this.props.location.query.id, 10)}
            pKey={this.props.location.query.key ? parseInt(this.props.location.query.key, 10) : this.tabId}
            data={this.state.data}
            dataSource={this.state.dataSource}
            setData={this.setData}
            alertSource={this.state.alertSource}
            setAlert={this.setAlert}
            alerts={this.state.alerts}
            setDevice={this.setDevice}
            submitForm={this.submitForm}
            ref={ref => (this.projectMonitor = ref)}
          />
        </div>
      </div>
      );
  }
}

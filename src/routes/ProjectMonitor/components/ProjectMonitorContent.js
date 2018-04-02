import React, { Component, PropTypes } from "react";
import ProjectMonitorData from "./RealTimeData/ProjectMonitorData";
import ProjectMonitorAlert from "./RealTimeAlert/ProjectMonitorAlert";
import ProjectMonitorCurve from "./RealTimeCurve/ProjectMonitorCurve";
import ProjectMonitorPage from "./RealTimePage/ProjectMonitorPage";

export default class ProjectMonitorContent extends Component {
  static propTypes = {
    viewName: PropTypes.string.isRequired, // 点击的标签的名字
    projectId: PropTypes.number.isRequired, // 工程id
    pKey: PropTypes.number.isRequired,
    DataAlert: PropTypes.object.isRequired, // 警告管理方法
    DataInfo: PropTypes.object.isRequired, // 警告管理方法
    dataSource: PropTypes.object, // 数据源点信息
    data: PropTypes.array,
    setData: PropTypes.func.isRequired,
    alertSource: PropTypes.object,
    setAlert: PropTypes.func.isRequired,
    setDevice: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    alerts: PropTypes.object, // 警告信息
    CurveInfo: PropTypes.object.isRequired, // 曲线方法
  }

  static defaultProps = {
    dataSource: null, // 不是isrequire的变量设置默认值
    data: null,
    alertSource: null,
    alerts: null,
  }

  // 点击数据曲线下”xx组“的时候调用的方法：执行要加载的json
  getCurveShow = (index) => {
    this.projectCurve.clickShow(index);
  }

  render() {
    return (<div>
              {this.props.viewName === "data" && <ProjectMonitorData projectId={this.props.projectId} DataInfo={this.props.DataInfo} dataSource={this.props.dataSource} />}
              {this.props.viewName === "alert" && <ProjectMonitorAlert projectId={this.props.projectId} DataAlert={this.props.DataAlert} />}
              {this.props.viewName === "page" && <ProjectMonitorPage
                                                   auth={this.props.auth}
                                                   projectId={this.props.projectId}
                                                   pKey={this.props.pKey}
                                                   pages={this.props.data}
                                                   dataSource={this.props.dataSource}
                                                   setData={this.props.setData}
                                                   alertSource={this.props.alertSource}
                                                   setAlert={this.props.setAlert}
                                                   alerts={this.props.alerts}
                                                   setDevice={this.props.setDevice}
                                                   submitForm={this.props.submitForm}
                                                 />}
              {this.props.viewName === "curve" && <ProjectMonitorCurve projectId={this.props.projectId} DataInfo={this.props.DataInfo} CurveInfo={this.props.CurveInfo} ref={ref => (this.projectCurve = ref)} />}
            </div>);
  }
}

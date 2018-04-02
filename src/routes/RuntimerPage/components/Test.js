import React, { Component, PropTypes } from "react";
import LocalTest from "./LocalTest";
import OnlineTest from "./OnlineTest";

/**
 *  1. isStarted 是否需要，然后向下传，控制 事件 yk等等操作
 *  2. 提供默认值，减少资源的传递http的请求次数
 *  3. 可以使用isStarted,进行清空数据
 */

/**
 *  作为 本地测试和在线测试的父组件，提供数据和回调函数的支撑
 */
export default class Test extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired, // 地址对象
    test: PropTypes.object.isRequired, // 获取测试信息
    project: PropTypes.object.isRequired, // 获取工程信息
    workbench: PropTypes.object.isRequired, // 获取工作台信息
    initDefaultData: PropTypes.func.isRequired, // 获得数据点默认值
    initDefaultAlertData: PropTypes.func.isRequired, // 获得默认报警数据
    getDsMap: PropTypes.func.isRequired, // 获得当前工程数据源数据点api
    start: PropTypes.func.isRequired, // 开启mq监听api
    end: PropTypes.func.isRequired, // 关闭mq监听api
    deplyProject: PropTypes.func.isRequired, // 部署工程 api
    getProjectInfo: PropTypes.func.isRequired, // 获取工程信息 api
    changeData: PropTypes.func.isRequired, // yk api
    save: PropTypes.func.isRequired, // 保存测试页面
    switchDevice: PropTypes.func.isRequired, // 健康数据源主备切换，yk api
    submitForm: PropTypes.func.isRequired // 提交表单数据
  }

  /**
   dataSourceMp:[{
        ""data_source_id"": 1,
        ""data_source_name"": ""数据源A"",
        ""nodes"": [
          {
            ""data_node_id"": 1,
            ""data_node_name"": ""88888""
          },...
        ]
      },...]
   dataSource: {
          ""3"": null,
          ""4"": null,
          ""5"": null,
          ""6"": null,
          ""7"": 3
        }

   alertSource: {
          ""3"": null,
          ""4"": null,
          ""5"": null,
          ""6"": null,
          ""7"": 3
        }
   */
  constructor(props) {
    super(props);
    const { data } = this.props.workbench.currentPage;
    this.state = {
      componentsJSon: data,
      dataSource: {},
      dataSourceMap: [],
      projectInfo: {},
      alertSource: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("-----------------componentWillReceiveProps(nextProps)", nextProps);
    // 本地调试时，获取默认值
    const { location, test, project } = nextProps;

    if (location.query.type === "localTest") {
      if (test.dsMap && test.defaultData && test.defaultAlertData && test.dsMap.length > 0 && Object.keys(test.defaultData).length > 0) {
        this.setState({
          dataSource: test.defaultData,
          dataSourceMap: test.dsMap,
          alertSource: test.defaultAlertData,
        });
      }
    } else if (location.query.type === "onLineTest") {
      // 在线调试时，获取实时值
      if (test.dsMap && test.data && test.dsMap.length > 0 && Object.keys(test.data).length > 0) {
        this.setState({
          dataSource: test.data,
          dataSourceMap: test.dsMap,
        });
      }

      // 在线调试，获取实时报警值
      if (test.alertData) {
        this.setState({
          alertSource: test.alertData,
        });
      }

      // 获取工程信息
      if (project.refresh) {
        this.props.getProjectInfo(this.props.workbench.currentPage.project_id[0]);
      }

      // 工程取消部署时，执行操作
      if (project.projectInfo && project.projectInfo.state !== this.state.projectInfo.state) {
        // 此处需要测试，判断是否需要根据state状态，进行清空
        this.setState({
          projectInfo: project.projectInfo,
          dataSourceMap: [],
          dataSource: {},
        });
      }
    }
  }

  /**
   *   本地调试时，获得默认值的api
   */
  getDefaultValue = () => {
    const { project_id: projectId } = this.props.workbench.currentPage;
    if (projectId === 0 || projectId) {
      this.props.initDefaultData(projectId);
      this.props.initDefaultAlertData(projectId);
      this.props.getDsMap(projectId);
    }
  }

  /**
   * 发送yk api
   * @param  {[number]} key   [数据点id]
   * @param  {[number]} value [数据点值]
   */
  setData = (key, value) => {
    // 本地测试，模拟 yk 的操作
    if (this.props.location.query.type === "localTest") {
      const { dataSource } = this.state;
      if (key in dataSource) {
        dataSource[key] = value;
        this.setState({
          dataSource,
        });
      }
    } else if (this.props.location.query.type === "onLineTest") { // 在线测试，进行yk操作
      console.log("-----yk", key, value);
      this.props.changeData(key, value);
    }
  }

  submitForm = (pageId, ...args) => {
    if (this.props.location.query.type === "onLineTest") { // 在线测试，进行yk操作
      this.props.submitForm(pageId, ...args);
    }
  }

  setDevice = (key) => {
    if (this.props.location.query.type === "onLineTest") { // 在线测试，进行yk操作
      this.props.switchDevice(key);
    }
  }

  /**
   * 只在前端，设置恢复报警
   * @param  {[number]} key   [数据点id]
   * @param  {[number]} value [level值]
   */
  setAlert = (key, value) => {
    const { alertSource } = this.state;
    // 如果key在组件中，修改key对应的值
    if (key in alertSource) {
      alertSource[key] = value;
      this.setState({
        alertSource,
      });
    }
  }

  /**
   * 本地调试，修改数据源时，修改状态值，提供回调函数
   * @param  {[object]} diffDataSource [变化的数据点及其值]
   * @param  {[object]} diffAlertData  [变化的报警点及其值]
   */
  handleChange = (diffDataSource, diffAlertData) => {
    const { dataSource, alertSource } = this.state;
    const newDataSource = Object.assign({}, dataSource, diffDataSource);
    const newAlertData = Object.assign({}, alertSource, diffAlertData);

    this.setState({
      dataSource: newDataSource,
      alertSource: newAlertData,
    });
  }

  /**
   * 设置 state中的值
   */
  handleClearData = () => {
    const { data } = this.props.workbench.currentPage;
    this.setState({
      componentsJSon: data,
      dataSource: {},
      dataSourceMap: [],
      projectInfo: {},
      alertSource: {},
    });
  }

  /**
   * 修改组件json时，实现页面刷新，进行回调
   * @param  {[object]} componentsJson [页面的组件json]
   */
  handleClick = (componentsJson) => {
    this.setState({
      componentsJSon: componentsJson,
    });
  }

  /**
   * 开启监听
   */
  start = () => {
    console.log(" 开启监听");
    this.props.start(this.props.workbench.currentPage.project_id);
  }

  /**
   * 关闭监听
   */
  end = () => {
    console.log(" 取消监听");
    this.props.end(this.props.workbench.currentPage.project_id);
    this.handleClearData();
  }

  /**
   * 保存测试页面
   */
  handleSave = () => {
    const { componentsJSon } = this.state;
    if (componentsJSon) {
      const newPage = Object.assign(this.props.workbench.currentPage, {
        data: componentsJSon,
      });
      // 执行保存操作
      this.props.save(newPage);
    }
  }

  render() {
    return (<div>
              {this.props.location.query.type === "localTest" && <LocalTest
                                                                   dataSource={this.state.dataSource}
                                                                   dataSourceMap={this.state.dataSourceMap}
                                                                   componentsJSon={this.state.componentsJSon}
                                                                   pageId={this.props.workbench.currentPage.id}
                                                                   onChange={this.handleChange}
                                                                   onhandleClick={this.handleClick}
                                                                   onHandleClear={this.handleClearData}
                                                                   setData={this.setData}
                                                                   alertSource={this.state.alertSource}
                                                                   setAlert={this.setAlert}
                                                                   getDefaultValue={this.getDefaultValue}
                                                                   onSave={this.handleSave}
                                                                   setDevice={this.setDevice}
                                                                   submitForm={this.submitForm}
                                                                 />}
              {this.props.location.query.type === "onLineTest" && <OnlineTest
                                                                    dataSource={this.state.dataSource}
                                                                    dataSourceMap={this.state.dataSourceMap}
                                                                    componentsJSon={this.state.componentsJSon}
                                                                    pageId={this.props.workbench.currentPage.id}
                                                                    projectInfo={this.state.projectInfo}
                                                                    project_id={this.props.workbench.currentPage.project_id}
                                                                    onChange={this.handleChange}
                                                                    onhandleClick={this.handleClick}
                                                                    onDeply={this.props.deplyProject}
                                                                    onStart={this.start}
                                                                    onEnd={this.end}
                                                                    setData={this.setData}
                                                                    alertSource={this.state.alertSource}
                                                                    setAlert={this.setAlert}
                                                                    onSave={this.handleSave}
                                                                    setDevice={this.setDevice}
                                                                    submitForm={this.submitForm}
                                                                  />}
            </div>);
  }
}

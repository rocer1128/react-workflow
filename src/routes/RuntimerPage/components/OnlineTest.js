import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import DataSourcePanel from "../../../components/CellsArt/DataSourcePanel";
import Runtimer from "../../../components/CellsArt/Runtimer";
import JsonPanel from "../../../components/CellsArt/JsonPanel";
import "../../../components/styles/CodePage.scss";
import "./RuntimerPage.scss";

export default class OnlineTest extends Component {
  // 参考父组件  Test.js 中的说明
  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    alertSource: PropTypes.object.isRequired,
    componentsJSon: PropTypes.object.isRequired,
    project_id: PropTypes.number.isRequired,
    dataSourceMap: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    onhandleClick: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    onDeply: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    projectInfo: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    setDevice: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    pageId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDeploy: false,
      isStart: false,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  /**
   * 获得工程部署信息
   */
  componentWillReceiveProps(nextProps) {

    if (nextProps.projectInfo) {
      const { state } = nextProps.projectInfo;
      if ((typeof state !== "undefined") && this.state.isDeploy !== state) {
        this.setState({
          isDeploy: state,
        });
      }
    }
  }

  /**
   * 切换组件时，关闭mq连接和改变工程部署状态，设置父组件中state的默认值
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
   *  工程部署api
   */
  onDeply = () => {
    this.props.onDeply({
      id: this.props.project_id[0],
      deploy_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      state: true,
    });
  }
  /**
   * 
   * 工程取消部署api
   */
  onCancelDeply = () => {
    this.onEndClick();
    this.props.onDeply({
      id: this.props.project_id[0],
      deploy_time: null,
      state: false,
    });
  }

  /**
   * 开启mq监听
   */
  onStartClick = () => {
    this.props.onStart();
    this.setState({
      isStart: true,
    });
  }
  /**
   * 关闭mq监听
   */
  onEndClick = () => {
    this.props.onEnd();
    this.setState({
      isStart: false,
    });
  }

  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    const { projectInfo } = this.props;
    if (projectInfo && Object.keys(projectInfo).length > 0 && projectInfo.state) {
      this.onEndClick();
      this.onCancelDeply();
    }
  }

  render() {
    const { dataSource, dataSourceMap, onChange, alertSource, componentsJSon, onhandleClick, setData, setAlert, setDevice, submitForm, pageId } = this.props;
    return (
      <div>
        <div className="runtimertoolbar">
          <div className="floatl">
            <Button bsStyle="warning" onClick={this.props.onSave}>
              保存页面
            </Button>
          </div>
          <div className="floatr">
            {this.state.isDeploy === false &&
             <Button bsStyle="primary" onClick={this.onDeply}>
               工程部署
             </Button>}
            {this.state.isDeploy === true &&
             <Button bsStyle="primary" onClick={this.onCancelDeply}>
               取消部署
             </Button>}
            <Button bsStyle="primary" style={{ marginLeft: "3px" }} disabled={!(this.state.isDeploy && !this.state.isStart)} onClick={this.onStartClick}>
              启动
            </Button>
            <Button bsStyle="primary" style={{ marginLeft: "3px" }} disabled={!(this.state.isDeploy && this.state.isStart)} onClick={this.onEndClick}>
              停止
            </Button>
          </div>
        </div>
        <div style={{ clear: "both", height: 5 }} />
        <div className="cvcontainer" style={{ clear: "both" }}>
          <ReflexContainer orientation="vertical">
            <ReflexElement className="left-pane" minSize="200" flex={0.15}>
              <div className="pane-content">
                <DataSourcePanel type="onLineTest" dataSource={dataSource} dataSourceMap={dataSourceMap} onChange={onChange} alertSource={alertSource} />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement className="middle-pane" minSize="200" maxSize="800" flex={0.5}>
              <div className="pane-content">
                <JsonPanel objects={componentsJSon} onhandleClick={onhandleClick} />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement className="right-pane" minSize="200" maxSize="600">
              <div className="pane-content">
                <Runtimer
                  pageId={pageId}
                  objects={componentsJSon.objects}
                  dataSource={dataSource}
                  setData={setData}
                  alertSource={alertSource}
                  setAlert={setAlert}
                  setDevice={setDevice}
                  submitForm={submitForm}
                />
              </div>
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>);
  }
}

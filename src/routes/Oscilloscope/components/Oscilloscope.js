import React, { Component, PropTypes } from "react";
import { Button } from "react-bootstrap";
import ShowWaveform from "./dataPage/ShowWaveform";
import ShowTest from "./modelPage/showTest";
import koder from "../../EquipmentPage/components/Koder";
import config from "./modelPage/componentsJson"

export default class Oscilloscope extends Component {
  /**
   * 构造函数
   * 用于定义state
   */
  constructor(props) {
    super(props);
    // 用于切换视图名称 默认是模型视图
    this.state = {
      viewName: "model",
      buttonCondition: true, // 设置button状态
    };
  }

  componentWillMount() {
    // 建立连接
    koder.start();
  // koder.startInit(this.props.workbench.currentPage.project_id);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  /**
  * 卸载的时候停止刷新
  */
  componentWillUnmount() {
    koder.end();
    window.removeEventListener("beforeunload", this.onUnload);
    window.removeEventListener("unload", this.handleDestroy);
  }

  onShowModelView = () => {
    this.setState({
      viewName: "model",
      buttonCondition: true,
    });
  }
  onShowDataView = () => {
    this.setState({
      viewName: "data",
      buttonCondition: false,
    });
  }

  /**
   * 作为beforeunload事件的回调函数
   */
  onUnload = (e) => { // the method that will be used for both add and remove event
    e.returnValue = "离开该网站";
  }

  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    koder.end();
  }

  render() {
    // const { workbench } = this.props;
    return (
      <div>
        <div style={{ textAlign: "right", margin: "5px 0px" }}>
          <Button bsStyle="success" disabled={this.state.buttonCondition} style={{ marginRight: 3 }} onClick={this.onShowModelView}>
            模式视图
          </Button>
          <Button bsStyle="success" disabled={!this.state.buttonCondition} style={{ marginRight: 3 }} onClick={this.onShowDataView}>
            数据视图
          </Button>
        </div>
        {this.state.viewName === "model" &&
         <ShowTest componentsJSon={config.componentsJSon} projectId={config.projectId} />}
        {this.state.viewName === "data" &&
         <ShowWaveform projectId={config.projectId} />}
      </div>);
  }
}

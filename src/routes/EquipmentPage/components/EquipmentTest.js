import React, { Component, PropTypes } from "react";
import { Button, Row, Col } from "react-bootstrap";
import _ from "lodash";
import koder from "./Koder";
import "./styles.scss";
import Runtimer from "../../../components/CellsArt/Runtimer";

export default class EquipmentTest extends Component {

  static propTypes = {
    componentsJSon: PropTypes.object.isRequired, // componentsJson   组件信息的json对象
    projectId: PropTypes.number.isRequired, // 工程ID
  }

  constructor(props) {
    super(props);
    console.log("--------EquipmentTest", props);
    this.state = {
      componentsJSon: this.props.componentsJSon,
      projectId: this.props.projectId,
      dataSource: {}, // yx值
      isStart: false, // 标识socket连接是否成功，按钮能否点击
      alertSource: {}, // 报警值

    };
  }

  /**
   * 切换页面时，关闭socket连接
   */
  componentWillUnmount() {
    koder.end();
    this.setState({
      isStart: false,
      dataSource: {},
      alertSource: {},
    });
    console.log("--------- 关闭页面");
  }

  /**
   * 开启与socket服务器建立连接
   */
  onStartClick = () => {
    const { projectId } = this.state;
    // 建立连接
    koder.start();
    // 向socket服务器发送初始化事件
    koder.startInit(projectId);
    // 获取初始化数据,设置初始化yx值
    koder.getInitData(projectId, (msg) => {
      const InitData = Object.assign({}, this.state.dataSource, msg);
      this.setState({
        isStart: true,
      });
      this.setState({
        dataSource: InitData,
      });
    });
    // 获取实时数据，实时更新yx数据值
    koder.getRealData(projectId, (msg) => {
      // state中的yx值与实时数据进行合并，得到新的yx值
      const newDataSource = Object.assign({}, this.state.dataSource, msg);
      // state中的yx值与新的yx值不同时，进行更新
      if (!_.isEqual(this.state.dataSource, newDataSource)) {
        this.setState({
          dataSource: newDataSource,
        });
      }
    });
    // 获取实时数据，实时更新报警数据值，原理同yx值
    koder.getAlertData(projectId, (msg) => {
      const newAlertSource = Object.assign({}, this.state.alertSource, msg);
      if (!_.isEqual(this.state.alertSource, newAlertSource)) {
        this.setState({
          alertSource: newAlertSource,
        });
      }
    });
  }

  /**
   * 关闭与socket服务器的连接
   */
  onEndClick = () => {
    koder.end();
    this.setState({
      isStart: false,
      dataSource: {},
      alertSource: {},
    });
  }

  /**
   * 触发socket服务器事件，实现遥控
   * @param  {[number]} dataNodeId    [数据点ID]
   * @param  {[number]} dataNodeValue [yk值]
   */
  setData = (dataNodeId, dataNodeValue) => {
    let id = dataNodeId;
    let value = dataNodeValue;

    // 将string类型转换为number类型
    if ((typeof dataNodeId) && (typeof dataNodeId === "string")) {
      id = parseInt(dataNodeId, 10);
    }
    if ((typeof dataNodeValue) && (typeof dataNodeValue === "string")) {
      value = parseInt(dataNodeValue, 10);
    }

    if ((typeof dataNodeId === "number") && (typeof dataNodeValue === "number")) {
      koder.changeData(this.state.projectId, id, value);
    }
  }

  /**
   * 恢复报警
   * @param  {[number]} key   [数据点ID]
   * @param  {[number]} value [报警值]
   */
  setAlert = (key, value) => {
    const { alertSource } = this.state;
    console.log("---------setAlert", alertSource, key, value);
    if (key in alertSource) {
      alertSource[key] = value;
      this.setState({
        alertSource,
      });
    }
  }

  render = () => {
    console.log("this.state.dataSource=", this.state.dataSource);
    return (
      <div>
        <div className="operationbar">
          <Button bsStyle="primary" disabled={this.state.isStart} onClick={this.onStartClick}>
            启动
          </Button>
          <Button bsStyle="primary" disabled={!this.state.isStart} onClick={this.onEndClick} style={{ marginLeft: "3px" }}>
            停止
          </Button>
        </div>
        <Row>
          <Col xsOffset={2} xs={10}>
          <Runtimer objects={this.state.componentsJSon.objects} dataSource={this.state.dataSource} setData={this.setData} alertSource={this.state.alertSource} setAlert={this.setAlert} />
          </Col>
        </Row>
      </div>
      );
  }
}

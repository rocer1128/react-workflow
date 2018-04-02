import React, { Component, PropTypes } from "react";
import { Button, Row, Col } from "react-bootstrap";
import _ from "lodash";
import koder from "../../../EquipmentPage/components/Koder";
import "./styles.scss";
import Runtimer from "../../../../components/CellsArt/Runtimer";
import __ from "lodash";

export default class ShowTest extends Component {

  static propTypes = {
    componentsJSon: PropTypes.object.isRequired, // componentsJson   组件信息的json对象
    projectId: PropTypes.number.isRequired, // 工程ID
  }

  state = {
    componentsJSon: this.props.componentsJSon,
    projectId: this.props.projectId,
    dataSource: {}, // yx值
  // alertSource: {}, // 报警值
  };

  /**
   * 切换页面时，关闭socket监听
   */
  componentWillUnmount() {
    // this.onEndClick();
    koder.removeListener(this.state.projectId);
    console.log("--------- 关闭ShowTest监听");
  }

  componentDidMount() {
    this.onStartClick();
  }

  /**
   * 开启与socket服务器建立连接
  */
  onStartClick = () => {
    const { projectId } = this.state;
    // 建立连接
    // koder.start();
    // 向socket服务器发送初始化事件
    // koder.startInit(projectId);

    /*koder.getInitData(projectId, (msg) => {
     console.log("msg:", msg);
     this.setState({
     isStart: true,
     });
     });
    */

    // 向socket服务器发送初始化事件
    koder.syncChannelId(projectId);
    // 获取初始化数据
    koder.getSyncChannelId(projectId, (msg) => {
      let dataSource = {};
      msg.map((item, index) => {
        if (item.data_node_id) {
          dataSource = Object.assign({}, dataSource, {
            [item.data_node_id]: item.channel_id
          });
        }
      });
      this.setState({
        dataSource
      });
    });
  // 接收绑定后返回的信息
  /* koder.receiveBindMsg(projectId, (msg) => {
     const dataSource = Object.assign({}, this.state.dataSource, {
       [msg.data_node_id]: msg.channel_id
     });
     this.setState({
       dataSource
     });
   });
   // 返回解绑后返回的信息
   koder.receiveUnbindMsg(projectId, (msg) => {
     const dataSource = __.omit(this.state.dataSource, [msg.data_node_id]);
     this.setState({
       dataSource
     });
   });*/
  }
  /**
   * 关闭与socket服务器的连接
   */
  onEndClick = () => {
    koder.end();
    this.setState({
      dataSource: {},
    // alertSource: {},
    });
  }
  sendBindMsg = (dataNodeId, channelId) => {
    koder.bindChannel(this.state.projectId, dataNodeId, channelId);
    koder.receiveBindMsg(this.state.projectId, (msg) => {
      const dataSource = Object.assign({}, this.state.dataSource, {
        [msg.data_node_id]: msg.channel_id
      });
      this.setState({
        dataSource
      });
    });
  }

  sendUnbindMsg = (dataNodeId, channelId) => {
    koder.unbindChannel(this.state.projectId, dataNodeId, channelId);
    koder.receiveUnbindMsg(this.state.projectId, (msg) => {
      const dataSource = __.omit(this.state.dataSource, [msg.data_node_id]);
      this.setState({
        dataSource
      });
    });
  }

  /*setData = (dataNodeId, channelId) => {
  koder.bindChannel(this.state.projectId, dataNodeId, channelId);

  }*/

  render = () => {
    console.log("this.state.dataSource=", this.state.dataSource);
    return (
      <div style={{ height: "calc(100vh - 100px)", width: "calc(100vw - 30px)" }}>
        <Runtimer objects={this.state.componentsJSon.objects} dataSource={this.state.dataSource} sendBindMsg={this.sendBindMsg} sendUnbindMsg={this.sendUnbindMsg} />
      </div>
      );
  }
}

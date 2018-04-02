import React, { Component, PropTypes } from "react";
import Wave from "./Wave";
import koder from "../../../EquipmentPage/components/Koder";

export default class ShowWaveform extends Component {
  static propTypes = {
    projectId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      dataSourceCH1: "", // 获取CH1通道数据
      dataSourceCH2: "", // 获取CH2通道数据
    };
  }

  componentWillMount() {
    const { projectId } = this.state;
    // 向socket服务器发送初始化事件
    koder.startWaveInit(projectId);
    // 获取初始化数据,设置初始化dataSourceCH1,dataSourceCH2值
    koder.getCH1Data(projectId, (msg) => {
      if (Object.keys(msg).length > 0) {
        this.setState({
          isStart: true,
          dataSourceCH1: msg.value.data,
        });
      }
    });
    koder.getCH2Data(projectId, (msg) => {
      if (Object.keys(msg).length > 0) {
        this.setState({
          isStart: true,
          dataSourceCH2: msg.value.data,
        });
      }
    });
  }
  /**
   * 切换页面时，关闭socket连接
   */
  componentWillUnmount() {
    const { projectId } = this.state;
    koder.offReceiveData(projectId);
    this.setState({
      dataSourceCH1: "", // 重置CH1通道数据
      dataSourceCH2: "", // 重置CH2通道数据
    });
  }

  render() {
    return (<div>
              <Wave dataSource={this.state.dataSourceCH1} count={1000} />
              <div style={{ height: 50, textAlign: "center" }}>
                通道1波形图
              </div>
              <Wave dataSource={this.state.dataSourceCH2} count={1000} />
              <div style={{ height: 50, textAlign: "center" }}>
                通道2波形图
              </div>
            </div>);
  }
}

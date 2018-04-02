import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Panel, Table } from "react-bootstrap";
import CheckMonitor from "./CheckMonitor";
import { LEVEL_TYPES, ALERT_TYPES1, ALERT_TYPES2 } from "../../../../components/Common/ComponentConstant";

/**
 * ProjectMonitorAlert：警告管理
 */
export default class ProjectMonitorAlert extends Component {
  static propTypes = {
    DataAlert: PropTypes.object.isRequired, // 警告管理对象
    projectId: PropTypes.number.isRequired, // 工程id
  }

  constructor(props) {
    super(props);
    this.checkAlert = this.checkAlert.bind(this);
  }

  /**
   * 查询警告信息的函数
   */
  checkAlert(startTime, endTime, level, type) {
    this.props.DataAlert.getAlerts(this.props.projectId, startTime, endTime, level, type);
  }

  render() {
    const style = {
      textAlign: "center",
      verticalAlign: "middle",
    };

    const trs = (<tr>
                   <th style={style}>
                     数据点名称
                   </th>
                   <th style={style}>
                     级别
                   </th>
                   <th style={style}>
                     类型
                   </th>
                   <th style={style}>
                     信息
                   </th>
                   <th style={style}>
                     时间
                   </th>
                 </tr>);

    const rows = this.props.DataAlert.alerts.map((element, index) => (
      <tr key={index}>
        <td style={style}>
          {element.data_node_name}
        </td>
        <td style={style}>
          {LEVEL_TYPES[element.level]}
        </td>
        <td style={style}>
          {element.alert_type < 5 ? ALERT_TYPES1[element.alert_type] : ALERT_TYPES2[element.alert_type]}
        </td>
        <td style={style}>
          {element.alert_info}
        </td>
        <td style={style}>
          {moment(element.alert_time).format("YYYY-MM-DD HH:mm:ss")}
        </td>
      </tr>));

    return (
      <div>
        <Panel header={"警告管理"}>
          <CheckMonitor getAlert={this.checkAlert} projectId={this.props.projectId} />
          <Table bordered={true} striped={true}>
            <thead>
              {trs}
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </Panel>
      </div>
      );
  }
}

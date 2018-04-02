import React, { Component } from "react";
import { PanelGroup, Panel, Table, } from "react-bootstrap";
import _ from "lodash";
import Operation from "./Operation";
import style from "./ProjectMonitorData.scss";

/**
 * ProjectMonitorData：实时数据类
 */
export default class ProjectMonitorData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertinfo: {},
      dataSource: {
        ...this.props.dataSource,
      },
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.state.dataSource, nextProps.dataSource)) {
      let newAlertInfo = {};
      for (let i of Object.keys(this.state.dataSource)) {
        if (nextProps.dataSource[i] !== this.state.dataSource[i]) {
          newAlertInfo[i] = 1;
        } else {
          newAlertInfo[i] = 0;
        }
      }
      this.setState({
        alertinfo: newAlertInfo,
        dataSource: {
          ...nextProps.dataSource
        },
      });
    }

  }

  render() {
    const style = {
      textAlign: "center",
      verticalAlign: "middle",
    };

    const Datas = this.props.DataInfo.listDataSource.length ? this.props.DataInfo.listDataSource.map((element, index) => (
      <Panel key={index} header={element.data_source_name} bsStyle="success">
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th style={style}>
                {'数据点名称'}
              </th>
              <th style={style}>
                {'值'}
              </th>
              <th style={style}>
                {'操作'}
              </th>
            </tr>
          </thead>
          <tbody>
            {element.nodes.length > 0 ? element.nodes.map((points, index) => (
               <tr key={index} className={this.state.alertinfo[points.data_node_id] ? "alert" : null}>
                 <td style={style}>
                   {points.data_node_name}
                 </td>
                 <td style={style}>
                   {this.props.dataSource[points.data_node_id]}
                 </td>
                 <td style={style}>
                   <Operation PointId={points.data_node_id} listHistory={this.props.DataInfo.listHistory} getHistory={this.props.DataInfo.getHistory} />
                 </td>
               </tr>
             )) : []}
          </tbody>
        </Table>
      </Panel>)) : [];

    return (
      <div>
        <PanelGroup>
          <Panel header={"实时数据"}>
            {Datas}
          </Panel>
        </PanelGroup>
      </div>
      );
  }
}
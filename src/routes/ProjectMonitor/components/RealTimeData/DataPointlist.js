import React, { Component, } from "react";
import { Button, Table, Modal, } from "react-bootstrap";

export default class DataPointlist extends Component {

  render() {
    const style = {
      textAlign: "center",
      verticalAlign: "middle",
    };

    const trs = (<tr>
                   <th style={style}>
                     {'时间'}
                   </th>
                   <th style={style}>
                     {'值'}
                   </th>
                 </tr>);

    const rows = this.props.historyData.length > 0 ? this.props.historyData.map((element, index) => (
      <tr key={index}>
        <td style={style}>
          {element.time}
        </td>
        <td style={style}>
          {element.value}
        </td>
      </tr>)) : [];

    return (
      <div>
        <Table bordered={true} striped={true}>
          <thead>
            {trs}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
      );
  }
}

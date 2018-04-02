import React, { Component } from "react";
import style from "./styles";
import ConditionButton from "./ConditionButton";

export default class ConditionList extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <table bordered striped responsive>
          <thead>
            <tr>
              <th style={style.table}>
                名称
              </th>
              <th style={style.table}>
                状态
              </th>
              <th style={style.table}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((element, index) => {
               const { name, ...rest } = element;
               return (<tr key={index}>
                         <td style={style.table}>
                           {name}
                         </td>
                         <td style={{ maxWidth: "200px", border: "1px solid #d2d2d2", overflow: "hidden" }}>
                           {JSON.stringify(rest)}
                         </td>
                         <td style={style.table}>
                           {name !== "default" && <ConditionButton value={index} onDelete={this.props.onDelete} />}
                         </td>
                       </tr>);
             })}
          </tbody>
        </table>
      </div>
      );
  }
}

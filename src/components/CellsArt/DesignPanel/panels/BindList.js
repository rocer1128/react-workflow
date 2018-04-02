import React, { Component } from "react";
import style from "./styles";
import BindButton from "./EventButton";

export default class BindList extends Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>条件</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {value.map(
              (element, index) =>
                element && (
                  <tr key={index}>
                    <td style={style.table}>{element}</td>
                    <td style={style.table}>
                      <BindButton onDelete={this.props.onDelete} value={index} />
                    </td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from "react";
import Radium from "radium";
import _ from "lodash";
import style from "./styles";
import EventButton from "./EventButton";

export default class EventList extends Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>条件</th>
              <th>事件</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map(
              (element, index) =>
                value[element] && (
                  <tr key={index}>
                    <td style={style.table}>{element}</td>
                    <td style={style.table}>与{value[element].replace(/[^0-9]/gi, "")}号数据点绑定</td>
                    <td style={style.table}>
                      <EventButton onDelete={this.props.onDelete} value={element} />
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

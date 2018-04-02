import React, { Component } from "react";
import Radium from "radium";
import _ from "lodash";


export default class EventButton extends Component {

  delete = () => {
    this.props.onDelete(this.props.value);

  }

  render() {
    return (
      <button onClick={this.delete}>
        删除
      </button>
      );
  }
}
import React, { Component, PropTypes } from "react";

export default class ConditionButton extends Component {

  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
  };

  deleteItem = () => {
    this.props.onDelete(this.props.value);
  }

  render() {
    return (
      <button onClick={this.deleteItem}>
        删除
      </button>
      );
  }
}

import React, { Component, PropTypes } from "react";

export default class TodoHeader extends Component {
  constructor() {
    super();
  }
  handlerKeyUp(e) {
    if (e.keyCode == 13) {
      let value = e.target.value;
      if (!value) {
        return false;
      }
      let newTodoItem = {
        todo: value,
        isDone: false
      };
      e.target.value = "";
      this.props.addTodo(newTodoItem); // 使用props调用App组件传过来的方法。
    }
  }
  render() {
    return (
      <div className="panel-header">
        <input className="panel-input" onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    )
  }
}
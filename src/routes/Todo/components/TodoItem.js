import React, { Component } from "react";
import ReactDOM from "react-dom"

export default class TodoItem extends Component {
  constructor() {
    super();
  }
  // 改变任务是否已完成的状态
  handlerChange() {
    let isDone = !this.props.isDone;
  }
  // 鼠标移入事件
  handlerMouseOver() {
    ReactDOM.findDOMNode(this).style.background = "#eee";
    ReactDOM.findDOMNode(this.refs.delButton).style.display = "inline-block";
  }
  handlerMouseOut() {
    ReactDOM.findDOMNode(this).style.background = "#fff";
    ReactDOM.findDOMNode(this.refs.delButton).style.display = "none";
  }
  // 删除当前任务
  handlerDelete() {
    this.props.deleteTodo(this.props.index);
  }
  render() {
    let className = this.props.isDone ? "task-done" : "";
    return (
      <li className="todo-li" onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
        <label>
          <input type="checkbox" style={{ marginRight: "10px" }} checked={this.props.isDone} onChange={this.handlerChange.bind(this)} />
          <span className={className}>{this.props.text}</span>
        </label>
        <button ref="delButton" className="btn btn-danger" onClick={this.handlerDelete.bind(this)}>
          删除
        </button>
      </li>
    )
  }
}
import React, { Component, PropTypes } from "react";
import "./main.scss";

export default class Todo extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.searchTodos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo.refresh === true) {
      this.props.searchTodos();
    }
  }

  handleKeyUp(e) {
    if (e.keyCode == 13) {
      let value = e.target.value;
      if (!value) {
        return false;
      }
      e.target.value = "";
      this.props.addTodo({
        todo: value,
        isDone: false
      });
    }
  }

  handleDelete(index) {
    this.props.deleteTodo(this.props.todo.todos[index].id);
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <input className="panel-input" onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认" />
        </div>
        <ul>
          {this.props.todo.todos.map((todo, index) => {
             return (
               <li className="todo-li">
                 <label>
                   <span>{todo.todo}</span>
                 </label>
                 <button className="btn btn-danger" onClick={this.handleDelete.bind(this, index)}>
                   删除
                 </button>
               </li>);
           })}
        </ul>
      </div>
    );
  }
}


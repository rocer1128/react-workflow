import React, { Component, PropTypes } from "react";
import TodoItem from "./TodoItem";

export default class TodoMain extends Component {
  render() {
    if (this.props.todos.length == 0) {
      return (
        <div className="todo-empty">
          恭喜您，目前没有待办任务！
        </div>
      )
    } else {
      return (
        <ul>
          {this.props.todos.map((todo, index) => {
             // {...this.props} 用来传递TodoMain的todos属性和delete、change方法。
             return <TodoItem text={todo.todo} isDone={todo.game} index={index} {...this.props}/>
           })}
        </ul>
      )
    }
  }
}
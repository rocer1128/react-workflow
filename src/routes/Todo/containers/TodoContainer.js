import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchTodos, deleteTodo, addTodo } from "../modules/todo";
import Todo from "../components/Todo";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchTodos,
  deleteTodo,
  addTodo,
}, dispatch);

const mapStateToProps = state => ({
  todo: state.todo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

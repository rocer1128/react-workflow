import React, { Component, PropTypes } from "react";
import SearchBar from "./SearchBar";
import ComponentList from "./ComponentList";
import { OPERATION_LEVEL_SUCCESS } from "../../../components/Common/OperationConstant";

export default class Widget extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  // 与redux相关的， store中state 和 actionCreator
  static propTypes = {
    auth: PropTypes.object.isRequired, // 与登录权限相关的state
    widget: PropTypes.object.isRequired, // 与组件相关的state
    searchWidget: PropTypes.func.isRequired, // 搜索的actionCreator
    editWidget: PropTypes.func.isRequired, // 编辑的actionCreator
    deleteWidget: PropTypes.func.isRequired, // 删除的actionCreator
    addWidget: PropTypes.func.isRequired, // 添加的actionCreator
    openWidget: PropTypes.func.isRequired, // 打开的actionCreator
  };

  componentDidMount() {
    this.props.searchWidget([]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.widget.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.widget.operation, "组件");
      this.props.searchWidget([]);
    }
  }

  /**
   * 按条件类型，分类，分组进行 搜索组件,
   * @param  {[string]} filterValue   [组件名称]
   * @param  {[number]} genreValue    [类型]
   * @param  {[number]} categoryValue [分类]
   * @param  {[number]} groupValue    [分组]
   */

  render() {
    const { widget, openWidget, deleteWidget, editWidget, addWidget } = this.props;
    return (
      <div>
        <SearchBar onSearch={this.props.searchWidget} />
        <ComponentList widgets={widget.widgets || []} onEditWidget={openWidget} onDelete={deleteWidget} onEdit={editWidget} onAdd={addWidget} auth={this.props.auth} />
      </div>
    );
  }
}

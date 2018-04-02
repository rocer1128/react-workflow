import React, { Component, PropTypes } from "react";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";
import AddDataLink from "./AddDataLink";
import DataLinkList from "./DataLinkList";

/**
 * DataLink：数据联动类
 */
export default class DataLink extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  static propTypes = {
    onloadDataLink: PropTypes.func.isRequired, // 加载数据联动的方法
    onloadDataSource: PropTypes.func.isRequired, // 加载数据源和数据点综合信息的方法
    location: PropTypes.object.isRequired, // 地址对象，取工程id用
    dataLink: PropTypes.object.isRequired, // 数据联动对象
    deleteDataLink: PropTypes.func.isRequired, // 删除数据联动的方法
    saveDataLink: PropTypes.func.isRequired, // 保存数据联动的方法
    uploadDataLink: PropTypes.func.isRequired, // 新建数据联动的方法
  }

  /**
   * 将要挂载组件时，从数据库加载已有“数据联动”，以及当前工程下数据源与数据点的信息
   */
  componentWillMount() {
    this.props.onloadDataLink(parseInt(this.props.location.query.id, 10));
    this.props.onloadDataSource(parseInt(this.props.location.query.id, 10));
  }

  /**
   * 接收新props时，即进行了“增删改查”操作成功时，重新加载数据库中“数据联动”;如果操作失败，提示失败信息
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataLink.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.dataLink.operation, "数据联动");
      this.props.onloadDataLink(parseInt(this.props.location.query.id, 10));
    } else if (nextProps.dataLink.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.dataLink.error.code], "数据联动");
    }
  }

  render() {
    const dataLinkMethod = {
      deleteLink: this.props.deleteDataLink,
      saveLink: this.props.saveDataLink,
      UploadLink: this.props.uploadDataLink,
      dataLink: this.props.dataLink,
    };
    return (
      <div>
        <AddDataLink projectId={parseInt(this.props.location.query.id, 10)} dataLinkMethod={dataLinkMethod} />
        <DataLinkList dataLinkMethod={dataLinkMethod} />
      </div>
      );
  }
}

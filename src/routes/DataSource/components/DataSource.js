import React, { Component, PropTypes } from "react";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";
import AddResource from "./AddResource";
import DataResourceList from "./DataResourceList";
import Option from "./Option";

/**
 * DataSource：数据源总类
 */
export default class DataSource extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  static propTypes = {
    onloadDataSource: PropTypes.func.isRequired, // 加载数据源的方法
    saveDataSource: PropTypes.func.isRequired, // 保存数据源的方法
    deleteDataSource: PropTypes.func.isRequired, // 删除数据源的方法
    uploadDataSource: PropTypes.func.isRequired, // 新建数据源的方法
    dataSource: PropTypes.object.isRequired, // 数据源对象
    location: PropTypes.object.isRequired, // 地址对象，取工程id用
    dataPoint: PropTypes.object.isRequired, // 数据点对象
    deleteDataPoint: PropTypes.func.isRequired, // 删除数据点的方法
    saveDataPoint: PropTypes.func.isRequired, // 编辑保存数据点的方法
    uploadDataPoint: PropTypes.func.isRequired, // 新建数据点的方法
    onloadDataPoint: PropTypes.func.isRequired, // 加载数据点的方法
    importDataSource: PropTypes.func.isRequired, // 导入数据源的方法
    onloadDataSourcePoint: PropTypes.func.isRequired, // 加载数据源数据点的方法
    removeDataSource: PropTypes.func.isRequired,
  }

  /**
    * 将要挂载组件时，从数据库加载已有“数据源”
    */
  componentWillMount() {
    this.props.onloadDataSource(parseInt(this.props.location.query.id, 10));
  }

  /**
   * 接收新props时，即进行了“增删改查”操作成功时，重新加载数据库中“数据源”;如果操作失败，提示失败信息
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.dataSource.operation, "数据源");
      this.props.onloadDataSource(parseInt(this.props.location.query.id, 10));
    } else if (nextProps.dataSource.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.dataSource.error.code], "数据源");
    }
  }
  componentWillUnmount() {
    this.props.removeDataSource();
  }

  render() {
    const dataSourceMethod = {
      deleteSource: this.props.deleteDataSource,
      saveSource: this.props.saveDataSource,
      importDataSource: this.props.importDataSource,
      onloadDataSourcePoint: this.props.onloadDataSourcePoint,
      dataSource: this.props.dataSource,
    };

    const dataPointMethod = {
      deletePoint: this.props.deleteDataPoint,
      savePoint: this.props.saveDataPoint,
      uploadPoint: this.props.uploadDataPoint,
      onloadPoint: this.props.onloadDataPoint,
      dataPoint: this.props.dataPoint,
    };

    return (
      <div>
        <AddResource UploadSource={this.props.uploadDataSource} projectId={parseInt(this.props.location.query.id, 10)} />
        <Option dataSource={this.props.dataSource} dataSourceMethod={dataSourceMethod} projectId={parseInt(this.props.location.query.id, 10)} />
        <div style={{ clear: "both", height: 5 }} />
        <DataResourceList dataSource={this.props.dataSource.listDatasource} dataSourceMethod={dataSourceMethod} dataPointMethod={dataPointMethod} />
      </div>
      );
  }
}

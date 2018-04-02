import React, { Component, PropTypes } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";
import DataFormTemp from "./DataFormTemp";
import DataPointForm from "./dataPoint/DataPointForm";

/**
 * ShowData：展示数据源数据点信息类
 */
export default class ShowData extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  static propTypes = {
    dataSource: PropTypes.object.isRequired, // 当前激活的数据源的Json信息
    tabPara: PropTypes.object.isRequired, // "Tabs"组件用到的方法
    onDelete: PropTypes.func.isRequired, // 点击"删除数据源"要运行的函数
    dataPointMethod: PropTypes.object.isRequired, // 数据点各种方法的对象
    dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
  }

  /**
   * 接收新props时，如果是进行了“增删改查”操作成功时，重新加载数据库中“数据点”;如果操作失败，提示失败信息
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPointMethod.dataPoint.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.dataPointMethod.dataPoint.operation, "数据点");
      this.props.dataPointMethod.onloadPoint(this.props.dataSource.id);
    } else if (nextProps.dataPointMethod.dataPoint.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.dataPointMethod.dataPoint.error.code], "数据点");
    }
  }

  render() {
    return (
      <Tabs activeKey={this.props.tabPara.tabkey} onSelect={this.props.tabPara.handleSelect} id="showtab" style={{ paddingTop: 5 }}>
        <Tab eventKey={1} title="数据源信息">
          <DataFormTemp data={this.props.dataSource} dataSourceMethod={this.props.dataSourceMethod} onDelete={this.props.onDelete} />
        </Tab>
        <Tab eventKey={2} title="数据点列表">
          <DataPointForm dataSource={this.props.dataSource} dataPointMethod={this.props.dataPointMethod} />
        </Tab>
      </Tabs>
      );
  }
}

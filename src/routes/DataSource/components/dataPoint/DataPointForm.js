import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import Radium from "radium";
import Operation from "./Operation";
import AddPoint from "./AddPoint";
import * as Types from "./types";

/**
 * DataPointForm：展示数据点信息
 */
const DataPointForm = ({ ...props }) => {
  const id = String(props.dataSource.data_template_id); // 当前数据源的模板id
  const tempKey = `DATAPOINTTEMP_TYPES${id}`; // 根据数据源模板id拼成的字符串，取数据点的模板
  const dataPoint = props.dataPointMethod.dataPoint.listDataPoint; // 数据点信息的列表
  const style = {
    textAlign: "center",
  };

  const trs = (<tr>
                 <th style={style}>
                   数据点名称
                 </th>
                 <th style={style}>
                   数据点类型
                 </th>
                 <th style={style}>
                   是否生效
                 </th>
                 <th style={style}>
                   是否存盘
                 </th>
                 <th style={style}>
                   是否报警
                 </th>
                 <th style={{ textAlign: "center", minWidth: 130 }}>
                   操作
                 </th>
               </tr>);

  const rows = dataPoint.map((element, index) => (
    <tr key={index}>
      <td>
        {element.name}
      </td>
      <td>
        {Types[tempKey][element.node_type]}
      </td>
      <td>
        {element.is_valid ? "是" : "否"}
      </td>
      <td>
        {element.is_save ? "是" : "否"}
      </td>
      <td>
        {element.is_alert ? "是" : "否"}
      </td>
      <td>
        <Operation dataTemplateId={props.dataSource.data_template_id} deletePoint={props.dataPointMethod.deletePoint} savePoint={props.dataPointMethod.savePoint} component={element} />
      </td>
    </tr>));

  return (
    <div>
      <AddPoint create={props.dataPointMethod.uploadPoint} dataSource={props.dataSource} />
      <Table bordered striped responsive>
        <thead>
          {dataPoint.length > 0 ? trs : []}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
    );
};

DataPointForm.propTypes = {
  dataSource: PropTypes.object.isRequired, // 数据源Json
  dataPointMethod: PropTypes.object.isRequired, // 数据点各种方法的对象
};

export default Radium(DataPointForm);

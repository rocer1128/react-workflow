import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import Radium from "radium";
import Operation from "./Operation";

/**
 * DataLinkList：数据联动列表展示
 */
const DataLinkList = ({ ...props }) => {
  const style = {
    textAlign: "center",
    verticalAlign: "middle",
  };
  // 表头
  const trs = (<tr>
                 <th style={style}>
                   名称
                 </th>
                 <th style={style}>
                   描述
                 </th>
                 <th style={style}>
                   是否生效
                 </th>
                 <th style={style}>
                   输入
                 </th>
                 <th style={style}>
                   输出
                 </th>
                 <th style={style}>
                   表达式
                 </th>
                 <th style={style}>
                   操作
                 </th>
               </tr>);
  // 每一行展示的内容
  const rows = props.dataLinkMethod.dataLink.listDataLink.map((element, index) => (
    <tr key={index}>
      <td style={style}>
        {element.name}
      </td>
      <td style={style}>
        {element.description}
      </td>
      <td style={style}>
        {element.is_valid ? "是" : "否"}
      </td>
      <td style={style}>
        {element.inputs.join(",")}
      </td>
      <td style={style}>
        {element.outputs}
      </td>
      <td style={style}>
        {element.formula}
      </td>
      <td style={style}>
        <Operation dataLinkMethod={props.dataLinkMethod} component={element} />
      </td>
    </tr>));

  return (
    <div>
      <Table bordered={true} striped={true}>
        <thead>
          {props.dataLinkMethod.dataLink.listDataLink.length > 0 ? trs : []}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
    );
};

DataLinkList.propTypes = {
  dataLinkMethod: PropTypes.object.isRequired, // 数据联动各种方法的对象
};

export default Radium(DataLinkList);

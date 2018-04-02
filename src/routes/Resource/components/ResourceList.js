import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import Radium from "radium";
import ResourceOperation from "./ResourceOperation";
import { RESOURCE_TYPE } from "../../../components/Common/ComponentConstant";

const ResourceList = ({ ...props }) => {
  const style = {
    verticalAlign: "middle",
  };
  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          <th style={style}>资源编号</th>
          <th style={style}>资源名称</th>
          <th style={style}>资源类型</th>
          <th style={style}>文件类型</th>
          <th style={style}>操作</th>
        </tr>
      </thead>
      <tbody>
        {props.listRes.map((element, index) =>
          <tr key={index}>
            <td style={style}>
              {element.id}
            </td>
            <td style={style}>
              {element.name}
            </td>
            <td style={style}>
              {RESOURCE_TYPE[element.category]}
            </td>
            <td style={style}>
              {element.file_type}
            </td>
            <td style={style} className="operation_btn">
              <ResourceOperation resource={element} onDelete={props.onDelete} />
            </td>
          </tr>,
        )}
      </tbody>
    </Table>
  );
};

ResourceList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  listRes: PropTypes.array.isRequired,
};

export default Radium(ResourceList);

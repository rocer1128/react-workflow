import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import Operation from "./Operation";
import { RESOURCE_TYPE, COMPONENT_GROUP } from "../../../components/Common/ComponentConstant";

const ComponentList = ({ ...props }) => {
  const style = {
    verticalAlign: "middle",
  };
  const trs = (
    <tr>
      <th>控件名称</th>
      <th>控件类型</th>
      <th>控件组别</th>
      <th>操作</th>
    </tr>
  );
  const { widgets } = props;
  let rows = [];

  if (widgets && widgets.length !== 0) {
    rows = widgets.map((element, index) =>
      <tr key={index}>
        <td style={style}>
          {element.name}
        </td>
        <td style={style}>
          {RESOURCE_TYPE[element.category]}
        </td>
        <td style={style}>
          {COMPONENT_GROUP[element.group]}
        </td>
        <td style={style} className="operation_btn">
          <Operation widget={element} onEditWidget={props.onEditWidget} onDelete={props.onDelete} onEdit={props.onEdit} onAdd={props.onAdd} auth={props.auth} />
        </td>
      </tr>,
    );
  }

  return (
    <Table bordered striped responsive>
      <thead>
        {trs}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
};

ComponentList.propTypes = {
  widgets: PropTypes.array.isRequired,
  onEditWidget: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
export default ComponentList;

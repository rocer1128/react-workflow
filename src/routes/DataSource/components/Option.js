import React, { PropTypes } from "react";
import Radium from "radium";
import Export from "./Export";
import Import from "./Import";

function Option({ ...props }) {
  return (
    <div style={{ float: "left", marginTop: 5 }}>
      <Export dataSourceMethod={props.dataSourceMethod} dataSource={props.dataSource} projectId={props.projectId} />
      <Import projectId={props.projectId} dataSourceMethod={props.dataSourceMethod} />
    </div>
    );
}
Option.propTypes = {
  dataSource: PropTypes.object.isRequired, // 数据源列表
  dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
  projectId: PropTypes.number.isRequired,
};
export default Radium(Option);

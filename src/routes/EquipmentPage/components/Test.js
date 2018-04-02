import React, { PropTypes } from "react";
import EquipmentTest from "./EquipmentTest";
/**
 * 就近控制的父组件
 * componentsJson   组件信息的json对象
 * projectId  工程ID
 */
const Test = ({ ...props }) => {
  const { workbench } = props;
  return (<div>
            <EquipmentTest componentsJSon={workbench.currentPage.data} projectId={workbench.currentPage.project_id} />
          </div>);
}

Test.propTypes = {
  workbench: PropTypes.object.isRequired,
};
export default Test;

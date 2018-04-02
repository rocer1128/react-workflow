import React, { PropTypes } from "react";
import ShowTest from "./showTest";
// import config from "./T1";

// const Test = () => (
//   <div>
//     <ShowTest componentsJSon={config.componentsJSon} projectId={config.projectId} />
//   </div>);
const Test = ({ ...props }) => {
  const { workbench } = props;
  return (<div>
            <ShowTest componentsJSon={workbench.currentPage.data} projectId={workbench.currentPage.project_id} />
          </div>);
}

Test.propTypes = {
  workbench: PropTypes.object.isRequired,
};
export default Test;




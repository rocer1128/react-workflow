import React, { PropTypes } from "react";
import Radium from "radium";

import style from "./styles";

const PropertyGroup = ({ showIf = true, ...props }) => {
  if (!showIf) {
    return <div style={style.empty} />;
  }
  return (
    <div style={style.propertyGroup}>
      {props.children}
    </div>
    );
};

PropertyGroup.propTypes = {
  showIf: PropTypes.bool,
  children: PropTypes.any,
};

PropertyGroup.defaultProps = {
  showIf: true,
  children: [],
};

export default Radium(PropertyGroup);

import React, { PropTypes } from "react";
import Radium from "radium";
import style from "./styles";

const Columns = ({ showIf = true, ...props }) => {
  if (!showIf) {
    return <div style={style.empty} />;
  }
  return (
    <div style={style.columns}>
      <div style={style.panelTitle}>
        {props.label}
      </div>
      {props.children}
    </div>
    );
};

Columns.propTypes = {
  showIf: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object.isRequired,
  label: PropTypes.string,
};

Columns.defaultProps = {
  showIf: true,
  children: null,
  label: null,
};

export default Radium(Columns);

import React, { PropTypes } from "react";
import Radium from "radium";

import style from "./styles";

const Column = ({ showIf = true, ...props }) => {
  if (!showIf) {
    return <div style={style.empty} />;
  }
  return (
    <div style={[style.column, props.style]}>
      {props.children ||
       <input style={[style.input, style.integerInput, props.style]} value={props.value} onChange={e => props.onChange(e.target.value)} />}
      {props.label &&
       <div style={style.inputHelper}>
         {props.label}
       </div>}
    </div>
    );
};

Column.propTypes = {
  showIf: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

Column.defaultProps = {
  showIf: true,
  children: null,
  value: null,
  label: null,
  onChange: null,
};

export default Radium(Column);

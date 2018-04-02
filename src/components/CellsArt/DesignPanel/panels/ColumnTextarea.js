import React, { Component } from "react";
import Radium from "radium";
import _ from "lodash";
import Icon from "../Icon";

import style from "./styles";

const ColumnTextarea = ({ showIf = true, ...props }) => {
  if (!showIf) {
    return <div style={style.empty} />;
  }
  return (
    <div style={[style.columnTextarea, props.style]}>
      {props.children ||
       <textarea rows="2" resize="none" style={[style.input, style.textareaInput]} value={props.value} onChange={(e) => props.onChange(e.target.value)} />}
    </div>
    );
};

export default Radium(ColumnTextarea);

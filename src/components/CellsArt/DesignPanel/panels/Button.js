import React, { PropTypes } from "react";
import Radium from "radium";
import style from "./styles";

const Button = ({ onClick, ...props }) => {
  const _onClick = (e, ...args) => {
    e.preventDefault();
    onClick(...args);
  };

  return (
    <a href="#" style={style.button} onClick={_onClick}>
      {props.children}
    </a>
    );
};

Button.propTypes = {
  showIf: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  showIf: true,
  children: [],
};

export default Radium(Button);

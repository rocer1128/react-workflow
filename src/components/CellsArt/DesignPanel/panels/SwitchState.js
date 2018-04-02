import React, { PropTypes } from "react";
import Radium from "radium";
import Icon from "../Icon";

const SwitchState = (props) => {
  const selected = props.value !== props.defaultValue;
  const newValue = selected ? props.defaultValue : props.nextState;
  return (
    <Icon icon={props.icon} active={selected} onClick={() => props.onChange(newValue)} />
    );
};

SwitchState.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  nextState: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

SwitchState.defaultProps = {
  value: null,
};

export default Radium(SwitchState);

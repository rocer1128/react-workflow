import React, { PropTypes } from "react";
import Radium from "radium";
import Portal from "react-portal";
import * as panels from "./index";
import style from "./styles";

const PanelList = ({ ...props }) => {
  const { offset, objectComponent } = props;
  const stylepanel = {
    left: offset.width + offset.x,
    top: offset.y + window.scrollY,
  };
  return (
    <Portal closeOnEsc closeOnOutsideClick isOpened={true}>
      <div style={[style.propertyPanel, stylepanel]}>
        {objectComponent.panels.map((panel, i) => {
           const Panel = panels[panel];
           return (<Panel key={i} {...props} />);
         })}
      </div>
    </Portal>
    );
};

PanelList.propTypes = {
  offset: PropTypes.object.isRequired,
  objectComponent: PropTypes.func.isRequired,
};

export default Radium(PanelList);

import React, { Component } from "react";
import Radium from "radium";
import { SketchPicker } from "react-color";
import _ from "lodash";
import Icon from "../Icon";

import style from "./styles";

class ColorInput extends Component {
  state = {
    show: false,
  };

  toggleVisibility() {
    this.setState({
      show: !this.state.show,
    })
  }

  handleChange(color) {
    let { r, g, b, a } = color.rgb;
    this.props.onChange(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  render() {
    const { value } = this.props;

    const popover = {
      position: "absolute",
      zIndex: "2",
    }
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    }

    return (
      <div style={style.column}>
        <a href="#" style={style.colorInput} onClick={this.toggleVisibility.bind(this)}><span style={[style.color, { backgroundColor: value }]} /></a>
        {this.state.show ? <div style={popover}>
                             <div style={cover} onClick={this.toggleVisibility.bind(this)} />
                             <SketchPicker color={value} onChange={this.handleChange.bind(this)} />
                           </div> : null}
        <div style={style.colinputHelper}>
          颜色
        </div>
      </div>
      );
  }
}

export default Radium(ColorInput);

import React, { Component } from "react";
import * as types from "../ComGroup/coms/types";
import __ from "lodash";
import DT from "./DT";

export default class Designer extends Component {
  state = {
    objects: null,
  }

  renderObjects(objects) {
    return objects.map((item, index) => {
      const { tag, id, ...rest } = item;
      const Type = DT(types[tag]);
      return <Type id={id} key={index} {...rest} />;
    });
  }

  componentWillMount() {
    if (this.state.objects === null) {
      this.setState({
        objects: this.renderObjects(this.props.objects),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!__.isEqual(this.props.objects, nextProps.objects)) {
      this.setState({
        objects: this.renderObjects(nextProps.objects),
      });
    }
  }

  render() {
    return (
      <div>
        <svg width={'100%'} height={'100%'} viewBox={"0 0 800 600"} preserveAspectRatio="xMidYMid meet">
          {this.state.objects}
        </svg>
      </div>);
  }
}

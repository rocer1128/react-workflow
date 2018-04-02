import React, { Component, PropTypes } from "react";
import RT from "../../CellsArt/RT";
import DT from "../../CellsArt/DT";
import * as type from "./type";

export default class Cell extends Component {
  static panels = ["SizePanel", "ArrangePanel"];

  static contextTypes = {
    setRef: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      self: null,
    };
  }

  renderObjects(objects) {
    const { id: cellId, isDesigner } = this.props;
    return objects.map((item, index) => {
      const { tag, id, ...rest } = item;
      const tagType = tag === "Cell" ? Cell : type[tag];
      const Type = isDesigner === true ? DT(tagType) : RT(tagType);
      const comId = cellId ? `${cellId}.${id}` : `${id}`;
      if (isDesigner === true) {
        return <Type id={comId} key={index} {...rest} />;
      }
        return <Type id={comId} ref={ref => this.context.setRef(comId, ref)} key={index} {...rest} />;
    });
  }

  componentWillMount() {
    if (this.state.self === null) {
      this.setState({
        self: this.renderObjects(this.props.objects),
      });
    }
  }

  render() {
    const { objects, styles, isDesigner, items, refHandler, index, ...rest } = this.props;
    return (
      <svg {...rest} {...refHandler} preserveAspectRatio="xMidYMid meet">
        {this.state.self}
      </svg>
    );
  }
}

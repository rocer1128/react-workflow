import React, { Component, PropTypes } from "react";

export default class SvgLine extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "StylePanel", "BehaviorPanel"];
  static defaultProps = {
    refHandler: {},
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    strokeDasharray: PropTypes.string.isRequired,
    strokeDashoffset: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    refHandler: PropTypes.object,
  };

  render() {
    const { x, y, width, height, x2, y2, stroke, strokeWidth, strokeDasharray, strokeDashoffset, cursor, refHandler } = this.props;

    // const width1 = Math.abs(parseInt(x2 - x), 10);
    // const height1 = Math.abs(parseInt(y2 - y), 10);
    // const x1 = Math.min(x, x2);
    // const y1 = Math.min(y, y2);

    return (
      <g x={x} y={y} height={height} width={width} {...refHandler} style={{ cursor }}>
        <line x1={x} x2={x2} y1={y} y2={y2} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      </g>
    );
  }
}

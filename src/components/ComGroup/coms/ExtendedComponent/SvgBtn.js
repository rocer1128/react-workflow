import React, { Component, PropTypes } from "react";

export default class SvgBtn extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    events: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    fill: "#cc0000",
    strokeWidth: 0,
    events: "",
    refHandler: {},
  };

  render() {
    const { x, y, height, width, fill, stroke, textColor, strokeWidth, events, text, fontSize, fontFamily, refHandler } = this.props;
    return (
      <svg x={x} y={y} width={width} height={height} {...refHandler} {...events}>
        <g>
          <rect x={0} y={0} width={width} height={height} ry="5" rx="5" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
          <text x="50%" y="50%" dy=".3em" textAnchor="middle" fill={textColor} fontWeight={"blod"} fontSize={fontSize} fontFamily={fontFamily}>
            {text}
          </text>
        </g>
      </svg>
    );
  }
}

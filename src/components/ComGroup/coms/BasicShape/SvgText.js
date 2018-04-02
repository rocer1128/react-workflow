import React, { Component, PropTypes } from "react";

export default class SvgText extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "TextPanel", "StylePanel"];
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    dx: PropTypes.string.isRequired,
    dy: PropTypes.string.isRequired,
    rotate: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    strokeDasharray: PropTypes.string.isRequired,
    strokeDashoffset: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    lengthAdjust: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    fontStyle: PropTypes.string.isRequired,
    textDecoration: PropTypes.string.isRequired,
    text: PropTypes.any,
    textAnchor: PropTypes.string,
    textLength: PropTypes.number,
    refHandler: PropTypes.object,
  };
  static defaultProps = {
    fill: "#000000",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
    textAnchor: "start",
    textLength: 0,
    text: "0",
    refHandler: {},
  };

  render() {
    const {
      x,
      y,
      width,
      height,
      dx,
      dy,
      text,
      rotate,
      fill,
      fontSize,
      fontFamily,
      textAnchor,
      stroke,
      strokeWidth,
      strokeDasharray,
      strokeDashoffset,
      textLength,
      lengthAdjust,
      fontWeight,
      fontStyle,
      textDecoration,
      cursor,
      refHandler,
    } = this.props;

    return (
      <g x={x} y={y} height={height} width={width} {...refHandler} style={{ cursor }}>
        <text
          x={x}
          y={y}
          dx={dx}
          dy={dy}
          rotate={rotate}
          fill={fill}
          fontSize={fontSize}
          fontFamily={fontFamily}
          textAnchor={textAnchor}
          textLength={textLength}
          lengthAdjust={lengthAdjust}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ fontWeight, fontStyle, textDecoration }}
        >
          {text}
        </text>
      </g>
    );
  }
}

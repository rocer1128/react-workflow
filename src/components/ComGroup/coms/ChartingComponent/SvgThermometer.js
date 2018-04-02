import React, { Component, PropTypes } from "react";

export default class SvgThermometer extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "ThermometerPanel", "BindPanel"];
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    current: PropTypes.number,
    refHandler: PropTypes.object,
  };
  static defaultProps = {
    max: 100,
    min: 0,
    current: 0,
    refHandler: {},
  };

  render() {
    const { x, y, width, height, max, min, current, refHandler } = this.props;
    const itemHeight = 60 / (max - min);
    const value = itemHeight * (current.toFixed(1) - min);

    return (
      <svg x={x} y={y} {...refHandler} width={width} height={height} viewBox={"0 0 50 100"} preserveAspectRatio="xMidYMid meet">
        <rect x={5} y={5} width={40} height={90} rx="3" ry="2" fill={"#FFFFFF"} stroke={"#000000"} strokeWidth={2} />
        <circle cx={25} cy={75} r={10} fill={"transparent"} stroke={"#000000"} strokeWidth={2} />
        <rect x={22.5} y={7.5} rx={3} width={5} height={65} fill={"transparent"} stroke={"#000000"} strokeWidth={2} />
        <rect x={23.5} y={60} width={2.9} height={10} fill={"#FFFFFF"} />
        <circle cx={25} cy={75} r={9} fill={"#CC0000"} />
        <rect x={23.5} y={68} width={3} height={value} rx={2} transform={`translate(0 -${value})`} fill={"#CC0000"} />
        <rect x={10} y={16} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={21} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={26} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={31} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={36} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={41} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={46} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={51} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={56} width={9} height={1} fill={"#000000"} />
        <rect x={10} y={62} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={16} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={21} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={26} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={31} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={36} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={41} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={46} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={51} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={56} width={9} height={1} fill={"#000000"} />
        <rect x={30} y={62} width={9} height={1} fill={"#000000"} />
        <text x={10} y={92.5} fontSize={8}>
          {`值：${current.toFixed(1)}`}
        </text>
        <text x={29} y={14} fontSize={8}>
          {max}
        </text>
      </svg>
    );
  }
}

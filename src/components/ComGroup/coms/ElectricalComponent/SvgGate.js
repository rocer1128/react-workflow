import React, { Component, PropTypes } from "react";

export default class SvgGate extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "StylePanel", "BindPanel"];
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeDasharray: PropTypes.string,
    strokeDashoffset: PropTypes.number,
    offon: PropTypes.bool,
    flash: PropTypes.bool,
    flashDur: PropTypes.number,
    rotate: PropTypes.number,
    rotateAnimate: PropTypes.bool,
    rotateAnimateDur: PropTypes.number,
    rotatestroke: PropTypes.string,
    rotatestrokeWidth: PropTypes.number,
    rotatestrokeDasharray: PropTypes.string,
    rotatestrokeDashoffset: PropTypes.number,
    refHandler: PropTypes.object,
  };
  static defaultProps = {
    width: 100,
    height: 100,
    fill: "#EE5C42",
    stroke: "#A4D3EE",
    animate: false,
    strokeWidth: 3,
    strokeDasharray: "8",
    offon: false,
    rotate: 0,
    rotateAnimate: false,
    rotateAnimateDur: 15,
    flash: false,
    flashDur: 500,
    rotatestroke: "#A4D3EE",
    rotatestrokeWidth: 3,
    rotatestrokeDasharray: "10,6",
    rotatestrokeDashoffset: 0,
    exteralStrokeWidth: 0,
    exteralFill: "transparent",
    refHandler: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, width, height, stroke, fill, rotate, offon, refHandler, ...rest } = this.props;
    const flashdurs = `${this.props.flashDur}ms`;
    const rotateanimatedurs = `${this.props.rotateAnimateDur}s`;
    let offonNum = 35;
    if (this.props.offon === true) {
      offonNum = 50;
    }
    let animate = null;
    if (this.props.rotateAnimate === true) {
      animate = (
        <rect
          x={2}
          y={20}
          rx={2}
          ry={1}
          width={96}
          height={60}
          stroke={this.props.rotatestroke}
          fill="transparent"
          strokeWidth={this.props.rotatestrokeWidth}
          strokeDasharray={this.props.rotatestrokeDasharray}
          strokeDashoffset={this.props.rotatestrokeDashoffset}
        >
          <animate attributeType="xml" attributeName="stroke-dashoffset" to="1000" begin="0" dur={rotateanimatedurs} fill="freeze" repeatCount="indefinite" />
        </rect>
      );
    }
    let flash = null;
    if (this.props.flash === true) {
      flash = <animate attributeType="css" attributeName="opacity" from="1" to="0.01" begin="0" dur={flashdurs} fill="freeze" repeatCount="indefinite" />;
    }
    return (
      <svg x={x} y={y} width={width} height={height} viewBox="0 0 100 100" {...refHandler} preserveAspectRatio="xMidYMid meet">
        <g transform={`rotate(${this.props.rotate} 50 50)`}>
          <rect x={0} y={0} width={100} height={100} fill="transparent" />
          <rect
            x={8}
            y={25}
            rx={2}
            ry={1}
            width={84}
            height={50}
            stroke={fill}
            strokeWidth={this.props.exteralStrokeWidth}
            strokeDasharray={this.props.strokeDasharray}
            fill={this.props.exteralFill}
          />
          <line x1={8} y1={50} x2={30} y2={50} stroke={fill} strokeWidth={this.props.strokeWidth} />
          <line x1={69} y1={50} x2={92} y2={50} stroke={fill} strokeWidth={this.props.strokeWidth} />
          <circle cx={32} cy={50} r={4} stroke={fill} fill="#FFFFFF" strokeWidth={this.props.strokeWidth} />
          <circle cx={67} cy={50} r={4} stroke={fill} fill="#FFFFFF" strokeWidth={this.props.strokeWidth} />
          <line x1={36} y1={50} x2={65} y2={offonNum} stroke={fill} strokeWidth={this.props.strokeWidth} />
          {animate}
        </g>
        {flash}
      </svg>
    );
  }
}

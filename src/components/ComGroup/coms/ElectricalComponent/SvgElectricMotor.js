import React, { Component, PropTypes } from "react";
import Electricmotor from "./Electricmotor.svg";

export default class SvgElectricMotor extends Component {
  static contextTypes = {
    setData: PropTypes.func,
  };

  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "BindPanel"];

  static defaultProps = {
    rotateAnimate: false,
    rotateAnimateDur: 15,
    rotatestroke: "#A4D3EE",
    rotatestrokeWidth: 3,
    rotatestrokeDasharray: "10,6",
    rotatestrokeDashoffset: 0,
    clockwiseRotation: 0,
    refHandler: {},
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    rotateAnimate: PropTypes.bool.isRequired,
    rotateAnimateDur: PropTypes.number.isRequired,
    rotatestroke: PropTypes.string.isRequired,
    rotatestrokeWidth: PropTypes.number.isRequired,
    rotatestrokeDasharray: PropTypes.string.isRequired,
    rotatestrokeDashoffset: PropTypes.number.isRequired,
    clockwiseRotation: PropTypes.number.isRequired,
    confrimInputDN: PropTypes.number.isRequired,
    confrimDirectionDN: PropTypes.number.isRequired,
    refHandler: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "50",
      ElectricMotorIsRotate: false,
    };
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  changRotnumber = () => {
    const num = this.state.inputValue;
    if (num > -1 && num < 65536) {
      this.context.setData(this.props.confrimInputDN, num);
      this.setState({
        ElectricMotorIsRotate: true,
      });
      setTimeout(() => {
        this.setState({
          ElectricMotorIsRotate: false,
        });
      }, num * 30);
    } else {
      alert("请输入0-65535的数值！");
    }
  };

  changeRotDirection = () => {
    const num = this.props.clockwiseRotation ? 0 : 1;
    this.context.setData(this.props.confrimDirectionDN, num);
  };

  render() {
    const { x, y, width, height, cursor, rotateAnimate, rotateAnimateDur, rotatestroke, rotatestrokeWidth, rotatestrokeDasharray, rotatestrokeDashoffset, clockwiseRotation, refHandler } = this.props;
    const rotateanimatedurs = `${rotateAnimateDur}s`;
    return (
      <svg x={x} y={y} height={height} width={width} viewBox={"0 0 300 150"} {...refHandler} style={{ cursor }}>
        <g>
          {rotateAnimate && (
            <g>
              <rect
                x="100"
                y="0"
                height="100"
                width="100"
                fill="transparent"
                stroke={rotatestroke}
                strokeWidth={rotatestrokeWidth}
                strokeDasharray={rotatestrokeDasharray}
                strokeDashoffset={rotatestrokeDashoffset}
                rx="10000"
                ry="10000"
              >
                <animate attributeType="xml" attributeName="stroke-dashoffset" to="1000" begin="0" dur={rotateanimatedurs} fill="freeze" repeatCount="indefinite" />
              </rect>
            </g>
          )}
          {this.state.ElectricMotorIsRotate && (
            <animateTransform attributeName="transform" type="rotate" begin="0s" dur="1s" from="0 150 50" to={clockwiseRotation ? "-360 150 50" : "360 150 50"} repeatCount="indefinite" />
          )}
          <image x="100" y="0" width="100" height="100" xlinkHref={Electricmotor} />
        </g>
        <foreignObject x="0" y="110" width="90" height="40">
          <input
            type="text"
            value={this.state.inputValue}
            placeholder="步数"
            style={{ width: "90px", height: "40px", fontSize: "20px", borderWidth: "3px" }}
            onChange={e => this.changeInputValue(e.target.value)}
          />
        </foreignObject>
        <g style={{ cursor: "default" }} onClick={this.changRotnumber}>
          <rect x="100" y="110" width="60" height="40" ry="5" rx="5" fill="#286090" stroke="#204d74" strokeWidth="1px" />
          <text x="130" y="130" dy=".3em" textAnchor="middle" fill="#fff" fontWeight="blod" fontSize="25px">
            确认
          </text>
        </g>
        <g style={{ cursor: "default" }} onClick={this.changeRotDirection}>
          <rect x="170" y="110" width="60" height="40" ry="5" rx="5" fill="#286090" stroke="#204d74" strokeWidth="1px" />
          <text x="200" y="130" dy=".3em" textAnchor="middle" fill="#fff" fontWeight="blod" fontSize="25px">
            {clockwiseRotation ? "正转" : "反转"}
          </text>
        </g>
      </svg>
    );
  }
}

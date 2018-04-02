import React, { Component, PropTypes } from "react";

export default class SvgImg extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "BindPanel"];

  static contextTypes = {
    getSelectedIndex: PropTypes.func,
    ref: PropTypes.func,
    getRef: PropTypes.func,
  };

  static defaultProps = {
    flashDur: 500,
    stroke: "",
    strokeWidth: 0,
    strokeDasharray: "",
    strokeDashoffset: 0,
    rotateAnimateDur: 15,
    rotatestroke: "#A4D3EE",
    rotatestrokeWidth: 3,
    rotatestrokeDasharray: "10,6",
    rotatestrokeDashoffset: 0,
    flash: false,
    rotateAnimate: false,
    imgRotateVelocity: 0,
    message: false,
    clockwiseRotation: 0,
    refHandler: {},
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    strokeDasharray: PropTypes.string.isRequired,
    strokeDashoffset: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    flash: PropTypes.bool.isRequired,
    flashDur: PropTypes.number.isRequired,
    rotateAnimate: PropTypes.bool.isRequired,
    rotateAnimateDur: PropTypes.number.isRequired,
    rotatestroke: PropTypes.string.isRequired,
    rotatestrokeWidth: PropTypes.number.isRequired,
    rotatestrokeDasharray: PropTypes.string.isRequired,
    rotatestrokeDashoffset: PropTypes.number.isRequired,
    imgRotateVelocity: PropTypes.number.isRequired,
    message: PropTypes.bool.isRequired,
    clockwiseRotation: PropTypes.number.isRequired,
    refHandler: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ImageRotateDur: "0s",
      ImageIsRotate: false,
    };
  }

  componentWillMount() {
    if (this.props.imgRotateVelocity > 0) {
      const dur = parseFloat(0.2 * (101 - this.props.imgRotateVelocity));
      this.setState({
        ImageRotateDur: `${dur}s`,
        ImageIsRotate: true,
      });
    } else if (this.props.imgRotateVelocity === 0) {
      this.setState({
        ImageIsRotate: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgRotateVelocity > 0) {
      const dur = parseFloat(0.2 * (101 - nextProps.imgRotateVelocity));
      this.setState({
        ImageRotateDur: `${dur}s`,
        ImageIsRotate: true,
      });
    } else if (nextProps.imgRotateVelocity === 0) {
      this.setState({
        ImageIsRotate: false,
      });
    }
  }

  getData = () => {
    if (this.context.getSelectedIndex() && this.context.getRef(this.context.getSelectedIndex())) {
      const dataSource = this.context.getRef(this.context.getSelectedIndex()).comData;
      return dataSource;
    }
  };

  render() {
    const {
      x,
      y,
      width,
      height,
      stroke,
      strokeWidth,
      strokeDasharray,
      strokeDashoffset,
      image,
      cursor,
      flash,
      flashDur,
      rotateAnimate,
      rotateAnimateDur,
      rotatestroke,
      rotatestrokeWidth,
      rotatestrokeDasharray,
      rotatestrokeDashoffset,
      message,
      clockwiseRotation,
      refHandler,
    } = this.props;

    const rectX = parseInt(x + strokeWidth + 1, 10);
    const rectY = parseInt(y + strokeWidth + 1, 10);
    const rectWidth = Math.max(parseInt(width - strokeWidth * 2 - 2, 10), 0);
    const rectHeight = Math.max(parseInt(height - strokeWidth * 2 - 2, 10), 0);

    const centerX = parseInt(x, 10) + parseInt(width, 10) / 2;
    const centerY = parseInt(y, 10) + parseInt(height, 10) / 2;
    const fromPosition = `0 ${centerX} ${centerY}`;
    const toPosition = clockwiseRotation ? `-360 ${centerX} ${centerY}` : `360 ${centerX} ${centerY}`;

    const flashdurs = `${flashDur}ms`;
    const rotateanimatedurs = `${rotateAnimateDur}s`;

    let data = {};
    if (!this.props.isDesigner) {
      data = this.getData() ? this.getData() : {};
    }

    return (
      <g x={x} y={y} height={height} width={width} {...refHandler} style={{ cursor }}>
        <g>
          {rotateAnimate && (
            <g>
              <rect
                x={x}
                y={y}
                height={height}
                width={width}
                fill="transparent"
                stroke={rotatestroke}
                strokeWidth={rotatestrokeWidth}
                strokeDasharray={rotatestrokeDasharray}
                strokeDashoffset={rotatestrokeDashoffset}
                rx="10"
                ry="10"
              >
                <animate attributeType="xml" attributeName="stroke-dashoffset" to="1000" begin="0" dur={rotateanimatedurs} fill="freeze" repeatCount="indefinite" />
              </rect>
            </g>
          )}
          {this.state.ImageIsRotate && (
            <animateTransform attributeName="transform" type="rotate" begin="0s" dur={this.state.ImageRotateDur} from={fromPosition} to={toPosition} repeatCount="indefinite" />
          )}
          {flash && <animate attributeType="css" attributeName="opacity" from="1" to="0.01" begin="0" dur={flashdurs} fill="freeze" repeatCount="indefinite" />}
          <image x={rectX} y={rectY} width={rectWidth} height={rectHeight} xlinkHref={image} />
          <rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
          {message &&
            Object.keys(data).map(
              (element, index) =>
                element && (
                  <text key={index} x={parseInt(x + 40, 10)} y={parseInt(y + 70 + index * 30, 10)} fill="#333" fontSize="15px" fontFamily="AmericanTypewriter, Georgia, serif">
                    <tspan x={parseInt(x + 40, 10)}>{element}:</tspan>
                    <tspan dx="10">{data[element]}</tspan>
                  </text>
                ),
            )}
        </g>
      </g>
    );
  }
}

import React, { Component, PropTypes } from "react";

export default class SvgCircle extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "StylePanel", "TextPanel", "EventPanel", "BindPanel"];

  static propTypes = {
    id: PropTypes.string.isRequired,
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
    strokeDasharray: PropTypes.string.isRequired,
    strokeDashoffset: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    filter: PropTypes.bool.isRequired,
    flash: PropTypes.bool.isRequired,
    flashDur: PropTypes.number.isRequired,
    rotateAnimate: PropTypes.bool.isRequired,
    rotateAnimateDur: PropTypes.number.isRequired,
    rotatestroke: PropTypes.string.isRequired,
    rotatestrokeWidth: PropTypes.number.isRequired,
    rotatestrokeDasharray: PropTypes.string.isRequired,
    rotatestrokeDashoffset: PropTypes.number.isRequired,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    fill: "#cc0000",
    strokeWidth: 0,
    flashDur: 500,
    rotateAnimateDur: 15,
    rotatestroke: "#A4D3EE",
    rotatestrokeWidth: 3,
    rotatestrokeDasharray: "10,6",
    rotatestrokeDashoffset: 0,
    refHandler: {},
  };

  render() {
    const {
      id,
      x,
      y,
      width,
      height,
      fill,
      text,
      textColor,
      fontSize,
      fontFamily,
      stroke,
      strokeWidth,
      strokeDasharray,
      strokeDashoffset,
      image,
      cursor,
      filter,
      flash,
      flashDur,
      rotateAnimate,
      rotateAnimateDur,
      rotatestroke,
      rotatestrokeWidth,
      rotatestrokeDasharray,
      rotatestrokeDashoffset,
      refHandler,
    } = this.props;

    const cx = parseInt(x, 10) + parseInt(width / 2, 10);
    const cy = parseInt(y, 10) + parseInt(height / 2, 10);
    const rx = Math.max(parseInt(width / 2, 10), 0);
    const ry = Math.max(parseInt(height / 2, 10), 0);

    const roRX = parseInt(width / 2 + rotatestrokeWidth, 10);
    const roRY = parseInt(height / 2 + rotatestrokeWidth, 10);

    const flashdurs = `${flashDur}ms`;
    const rotateanimatedurs = `${rotateAnimateDur}s`;

    const filterId = `CircleFilter${id}`;

    return (
      <g x={x} y={y} height={height} width={width} {...refHandler} filter={filter ? `url(#${filterId})` : null} style={{ cursor }}>
        <g>
          {filter && (
            <defs>
              <filter id={filterId} filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
                <feSpecularLighting in="blur" surfaceScale="3" specularConstant=".75" specularExponent="20" lightingColor="#bbbbbb" result="specOut">
                  <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
                <feMerge>
                  <feMergeNode in="offsetBlur" />
                  <feMergeNode in="litPaint" />
                </feMerge>
              </filter>
            </defs>
          )}
          {image && (
            <defs>
              <pattern id="backImg" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                <image width="1" height="1" xlinkHref={image} />
              </pattern>
            </defs>
          )}
          {rotateAnimate && (
            <g>
              <ellipse
                cx={cx}
                cy={cy}
                rx={roRX}
                ry={roRY}
                fill="transparent"
                stroke={rotatestroke}
                strokeWidth={rotatestrokeWidth}
                strokeDasharray={rotatestrokeDasharray}
                strokeDashoffset={rotatestrokeDashoffset}
              >
                <animate attributeType="xml" attributeName="stroke-dashoffset" to="1000" begin="0" dur={rotateanimatedurs} fill="freeze" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}
          {flash && <animate attributeType="css" attributeName="opacity" from="1" to="0.01" begin="0" dur={flashdurs} fill="freeze" repeatCount="indefinite" />}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={image ? "url(#backImg)" : fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
          <text x={cx} y={cy} dy=".3em" fill={textColor} fontSize={fontSize} fontFamily={fontFamily} textAnchor="middle">
            {text}
          </text>
        </g>
      </g>
    );
  }
}

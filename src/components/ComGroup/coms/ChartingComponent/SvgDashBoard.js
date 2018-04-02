import React, { Component, PropTypes } from "react";

export default class SvgThermometer extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "StylePanel", "BindPanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    targetValue: PropTypes.number.isRequired,
    refHandler: PropTypes.object.isRequired,
  };

  render = () => {
    const { x, y, height, width, minValue, maxValue, targetValue, refHandler } = this.props;
    let targetX = 135;
    let targetY = 225;
    let beiginOff = 0;
    let middleOff = 30;
    let endOff = 60;
    let step = 10;

    if (minValue <= targetValue && targetValue <= maxValue) {
      beiginOff = minValue;
      endOff = maxValue;
      step = Math.floor((maxValue - minValue) / 6);
      middleOff = (maxValue - minValue) / 2;
      const radian = (targetValue - minValue) / (maxValue - minValue) * Math.PI;
      targetX = 230 - 95 * Math.cos(radian);
      targetY = 225 - 95 * Math.sin(radian);
    }

    return (
      <svg x={x} y={y} width={width} height={height} viewBox="0 0 300 300" {...refHandler} preserveAspectRatio="xMidYMid meet">
        <path d="M130 225  A 100 100 0 0 1 330 225" stroke="blue" fill="white" strokeWidth="2" fillOpacity="0.5/" />
        <path d="M200 225  A 15 15 0 0 1 260 225" stroke="red" fill="white" strokeWidth="10" fillOpacity="0.5/" />
        <line x1="130" y1="225" x2="330" y2="225" strokeWidth={2} stroke="blue" />
        <circle cx="230" cy="225" r="2" stroke="black" fill="black" />
        <line x1="130" y1="225" x2="150" y2="225" strokeWidth={2} stroke="black" />
        <line x1="230" y1="125" x2="230" y2="145" strokeWidth={2} stroke="black" />
        <line x1="330" y1="225" x2="310" y2="225" strokeWidth={2} stroke="black" />
        <line x1="143.39746" y1="175" x2="160.717968" y2="185" strokeWidth={2} stroke="black" />
        <line x1="180" y1="138.39746" x2="190" y2="155.717968" strokeWidth={2} stroke="black" />
        <line x1="280" y1="138.39746" x2="270" y2="155.717968" strokeWidth={2} stroke="black" />
        <line x1="316.60254" y1="175" x2="299.282032" y2="185" strokeWidth={2} stroke="black" />
        <line x1="130.54781" y1="214.54715" x2="142.4820728" y2="215.801492" strokeWidth={2} stroke="black" />
        <line x1="132.18524" y1="204.20883" x2="143.9230112" y2="206.7037704" strokeWidth={2} stroke="black" />
        <line x1="134.89435" y1="194.0983" x2="146.307028" y2="197.806504" strokeWidth={2} stroke="black" />
        <line x1="138.64545" y1="184.32634" x2="149.607996" y2="189.2071792" strokeWidth={2} stroke="black" />
        <line x1="149.0983" y1="166.22147" x2="158.806504" y2="173.2748936" strokeWidth={2} stroke="black" />
        <line x1="155.68552" y1="158.08694" x2="164.6032576" y2="166.1165072" strokeWidth={2} stroke="black" />
        <line x1="163.08694" y1="150.68552" x2="171.1165072" y2="159.6032576" strokeWidth={2} stroke="black" />
        <line x1="171.22147" y1="144.0983" x2="178.2748936" y2="153.806504" strokeWidth={2} stroke="black" />
        <line x1="189.32634" y1="133.64545" x2="194.2071792" y2="144.607996" strokeWidth={2} stroke="black" />
        <line x1="199.0983" y1="129.89435" x2="202.806504" y2="141.307028" strokeWidth={2} stroke="black" />
        <line x1="209.20883" y1="127.18524" x2="211.7037704" y2="138.9230112" strokeWidth={2} stroke="black" />
        <line x1="219.54715" y1="125.54781" x2="220.801492" y2="137.4820728" strokeWidth={2} stroke="black" />
        <line x1="240.45285" y1="125.54781" x2="239.198508" y2="137.4820728" strokeWidth={2} stroke="black" />
        <line x1="250.79117" y1="127.18524" x2="248.2962296" y2="138.9230112" strokeWidth={2} stroke="black" />
        <line x1="260.9017" y1="129.89435" x2="257.193496" y2="141.307028" strokeWidth={2} stroke="black" />
        <line x1="270.67366" y1="133.64545" x2="265.7928208" y2="144.607996" strokeWidth={2} stroke="black" />
        <line x1="288.77853" y1="144.0983" x2="281.7251064" y2="153.806504" strokeWidth={2} stroke="black" />
        <line x1="296.91306" y1="150.68552" x2="288.8834928" y2="159.6032576" strokeWidth={2} stroke="black" />
        <line x1="329.45219" y1="214.54715" x2="317.5179272" y2="215.801492" strokeWidth={2} stroke="black" />
        <line x1="327.81476" y1="204.20883" x2="316.0769888" y2="206.7037704" strokeWidth={2} stroke="black" />
        <line x1="325.10564" y1="194.0983" x2="313.692972" y2="197.806504" strokeWidth={2} stroke="black" />
        <line x1="321.35455" y1="184.32634" x2="310.392004" y2="189.2071792" strokeWidth={2} stroke="black" />
        <line x1="310.9017" y1="166.22147" x2="301.193496" y2="173.2748936" strokeWidth={2} stroke="black" />
        <line x1="304.31448" y1="158.08694" x2="295.3967424" y2="166.1165072" strokeWidth={2} stroke="black" />
        <text x="155" y="225" transform="rotate(0,10,20)">
          {beiginOff}
        </text>
        <text x="165.048095" y="192.5" transform="rotate(0,10,20)">
          {beiginOff + step}
        </text>
        <text x="190.5" y="170.048095" transform="rotate(0,10,20)">
          {beiginOff + 2 * step}
        </text>
        <text x="222" y="160" transform="rotate(0,10,20)">
          {middleOff}
        </text>
        <text x="256.5" y="170.048095" transform="rotate(0,10,20)">
          {beiginOff + 4 * step}
        </text>
        <text x="278.951905" y="192.5" transform="rotate(0,10,20)">
          {beiginOff + 5 * step}
        </text>
        <text x="295" y="225" transform="rotate(0,10,20)">
          {endOff}
        </text>
        <rect x="215" y="165" width="30" height="20" rx="5" stroke="black" fill="none" />
        <text x="230" y="180" fill="black" textAnchor="middle">
          {targetValue}
        </text>
        <line x1="230" y1="225" x2={targetX} y2={targetY} strokeWidth={2} stroke="red" />
      </svg>
    );
  };
}

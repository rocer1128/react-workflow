import React, { PropTypes, Component } from "react";
import SvgBtn from "./SvgBtn";

export default class SvgSwitch extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "BindPanel"];
  static defaultProps = {
    defaultFill: "#ddd",
    refHandler: {},
  };
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    menus: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    defaultFill: PropTypes.string.isRequired,
    refHandler: PropTypes.object,
  };

  render() {
    const { menus, show, x, y, width, height, refHandler, defaultFill } = this.props;
    const startX = parseInt(x, 10);
    const startY = parseInt(y, 10);
    const step = parseInt(width, 10) * 0.9;
    const btnHeight = height * 0.7;
    const space = 20;
    let color = defaultFill;
    return (
      <g {...refHandler}>
        {menus.map((menu, i) => {
          if (show) {
            color = menu.styles.fill;
          }
          return <SvgBtn key={i} x={startX + (step + space) * i} width={step} height={btnHeight} y={startY} {...menu.styles} fill={color} events={menu.events} />;
        })}
      </g>
    );
  }
}

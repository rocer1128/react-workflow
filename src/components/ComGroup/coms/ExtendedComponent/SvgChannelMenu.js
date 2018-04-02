import React, { PropTypes, Component } from "react";
import SvgBtn from "./SvgBtn";
import __ from "lodash";

export default class SvgChannelMenu extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static defaultProps = {
    refHandler: {},
  };

  static contextTypes = {
    dataSource: PropTypes.object,
    getOptDataNodeId: PropTypes.func,
    sendBindMsg: PropTypes.func,
    sendUnbindMsg: React.PropTypes.func,
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    menus: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    refHandler: PropTypes.object,
  };

  optChannel = (channelId, isBind) => {
    // 与示波器的通道进行绑定和解绑
    const dataNodeId = this.context.getOptDataNodeId(); // 获取采样点绑定的数据点Id
    if (dataNodeId) {
      // this.context.setChannelId(channelId); // 设置示波器
      if (isBind) {
        this.context.sendBindMsg(dataNodeId, channelId);
      } else {
        this.context.sendUnbindMsg(dataNodeId, channelId);
      }
    }
  };

  render() {
    const { menus, show, x, y, width, height, refHandler, defaultFill } = this.props;
    const startX = parseInt(x, 10);
    const startY = parseInt(y, 10);
    const step = parseInt(width, 10) * 0.9;
    const btnHeight = height * 0.7;
    const space = 8;

    return (
      <g {...refHandler}>
        {menus.map((menu, i) => {
          const { fill, channel, isBind } = menu.styles;

          let color = defaultFill;

          let events = {};

          if (show) {
            const dataNodeId = this.context.getOptDataNodeId();
            const dataNodeKey = __.pick(this.context.dataSource, [dataNodeId]);
            const channelVal = __.pickBy(this.context.dataSource, value => value === channel);

            // 如果选择点没有绑定channel，则渲染按钮
            if (__.isEmpty(dataNodeKey)) {
              // 如果BTN的channel，没有绑定过
              if (__.isEmpty(channelVal)) {
                // 绑定按钮生效
                if (isBind) {
                  color = fill;
                  events = {
                    onClick: this.optChannel.bind(this, channel, true),
                  };
                }
              } else if (!isBind && channelVal[dataNodeId]) {
                  color = fill;
                  events = {
                    onClick: this.optChannel.bind(this, channel, false),
                  };
                }
            } else {
              const channelId = dataNodeKey[dataNodeId];
              if (channel === channelId && !isBind) {
                color = fill;
                events = {
                  onClick: this.optChannel.bind(this, channel, false),
                };
              }
            }
          }

          return <SvgBtn key={i} x={startX + (step + space) * i} width={step} height={btnHeight} y={startY} {...menu.styles} fill={color} events={events} />;
        })}
      </g>
    );
  }
}

import React, { Component, PropTypes } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default class SvgChart extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "ChartPanel"];
  static icon = "lineChart";

  constructor(props) {
    super(props);
    this.state = {
      lines: null,
      data: [],
      color: new Map(),
    };
  }
  componentDidMount() {
    const { dataInfo, id } = this.props;
    if (dataInfo.length > 0) {
      // 曲线名称
      const lineDataKey = dataInfo.map((element, index) => element.curveName);

      // 生成曲线的数据
      const data = [];
      for (let i = 0; i <= 5; i++) {
        const dkey = {};
        for (let j = 0; j < lineDataKey.length; j++) {
          console.log("datadddddddddddddddddddd");
          const key = lineDataKey[j];
          Object.assign(dkey, {
            [key]: 100 * ((j + i) ^ id) + 10,
          });
        }
        Object.assign(dkey, {
          time: i + 1,
        });
        data.push(dkey);
      }

      // 生成颜色
      let unionKey = "";
      dataInfo.map((points, pindex) => {
        unionKey = String(id) + String(points.dataPointId);
        const R = (id * 300 + pindex * 40) % 255;
        const G = (id * 140 + pindex * 100) % 255;
        const B = (id * 10 + pindex * 150) % 255;

        console.log(R, G, B);
        this.setState({
          color: this.state.color.set(unionKey, `${"RGB" + "("}${R},${G},${B})`),
          data,
        });
      });
    }
  }

  render() {
    console.log(this.state.data);
    const { id, attrs, x, y, width, height, xLabel, yLabel, dataInfo, garphName, isGrid, isTooltip, ...rest } = this.props;
    let unionkey = "";
    const lines =
      dataInfo.length > 0
        ? dataInfo.map((element, index) => {
            unionkey = String(id) + String(element.dataPointId);
            return <Line key={index} type={element.type} dataKey={element.curveName} stroke={this.state.color.get(unionkey)} />;
          })
        : [];

    return (
      <g {...attrs} {...rest}>
        <foreignObject x={x} y={y} width={width} height={height}>
          <div style={{ width: width + 20, textAlign: "center", fontSize: 12, position: "relative" }}>{garphName}</div>
          <LineChart style={{ fontSize: 12 }} width={width} height={height} data={this.state.data} margin={{ top: 25, right: 35, left: 0, bottom: 5 }}>
            }
            <XAxis label={xLabel} dataKey="time" />
            <YAxis label={yLabel} />
            <Legend align="right" />
            {isGrid && <CartesianGrid strokeDasharray="3 3" />}
            {lines}
          </LineChart>
        </foreignObject>
      </g>
    );
  }
}
// isAnimationActive={false}

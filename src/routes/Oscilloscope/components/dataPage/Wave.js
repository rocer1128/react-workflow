import React, { Component, PropTypes } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, AreaChart, Area } from "recharts";
import error from "./error.png";

export default class Oscilloscope extends Component {

  static propTypes = {
    dataSource: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  };

  render() {
    const width = parseInt((document.body.offsetWidth) - 60, 10);
    const height = parseInt(((document.body.offsetHeight) - 250) / 2, 10);

    const { dataSource } = this.props;
    const dataArray = dataSource.indexOf(",") ? dataSource.split(",") : [];
    const data = dataArray.filter((ele, index) => index < this.props.count).map((ele, index) => ({
      time: index * 10,
      voltage: parseFloat(ele, 10),
    })) || [];

    const dataError = (<div style={{ height, textAlign: "center", fontSize: 20, lineHeight: `${height}px` }}>
                         <img width={20} height={20} src={error} /> 暂无数据
                       </div>);
    const oscilloscope = (<div>
                            <LineChart width={width} height={height} data={data} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
                              <CartesianGrid vertical={false} />
                              <XAxis dataKey="time" label="ns" />
                              <YAxis domain={["auto", "auto"]} label="V" />
                              <Tooltip />
                              <Line dataKey="voltage" stroke="#ff7300" dot={false} />
                              <Brush dataKey="time">
                                <AreaChart>
                                  <CartesianGrid />
                                  <YAxis hide domain={["auto", "auto"]} />
                                  <Area dataKey="voltage" stroke="#ff7300" fill="#ff7300" dot={false} />
                                </AreaChart>
                              </Brush>
                            </LineChart>
                          </div>);
    return (
      <div>
        {data.length < 2 ? dataError : oscilloscope}
      </div>
      );
  }
}

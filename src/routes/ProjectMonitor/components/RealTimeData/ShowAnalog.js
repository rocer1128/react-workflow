import React, { Component } from "react";
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line } from "recharts";


export default class ShowAnalog extends Component {
  constructor(props) {
    super(props);
    this.formatDatas = this.formatDatas.bind(this);
  }

  formatDatas(data) {
    return (data.split("-")[1] + "/" + data.split("-")[2].split(" ")[0]);
  }
  render() {
    const pointData = this.props.historyData;
    const allData = []; // 给recharts组件的数据格式
    if (pointData.length > 0) {
      pointData.map((unitdata) => {
        allData.push({
          value: parseInt(unitdata.value, 10),
          time: unitdata.time,
        });
        return true;
      });
    }
    return (
      <div>
        <LineChart width={830} height={400} data={allData} style={{ fontSize: 6 }} margin={{ top: 30, right: 30, left: 50, bottom: 5 }}>
          <XAxis dataKey="time" label="日期" fontSize={6} tickFormatter={this.formatDatas} />
          <YAxis label="值" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </div>
      );
  }
}

import React, { Component } from "react";
import Radium from "radium";
import _ from "lodash";
import Icon from "../Icon";
import Panel from "./Panel";
import style from "./styles";
import PropertyGroup from "./PropertyGroup";
import Button from "./Button";
import SwitchState from "./SwitchState";
import Columns from "./Columns";
import Column from "./Column";
import ColumnTextarea from "./ColumnTextarea";

export default class ChartPanel extends Panel {
  constructor(props) {
    super(props);
    this.addLine = this.addLine.bind(this);
  }

  addLine() {
    console.log(this.props);
    let { styles } = this.props.object;
    let newData = _.assign({}, {
      "dataPointId": styles.dataInfo.length + 1,
      "type": "monotone",
      "curveName": "",
    })
    styles.dataInfo.push(newData);

  }
  render() {
    console.log(this.props);
    const { styles } = this.props.object;
    const line = styles.dataInfo.map((element, index) => {
      return (
        <ColumnTextarea label="名称" value={element.curveName} onChange={this.props.onChange.bind(this, "styles" + "." + "dataInfo" + "." + index + "." + "curveName", "string")} />
        );
    });
    return (
      <PropertyGroup object={styles}>
        {_.has(styles, "garphName") && <Columns label="图表名称">
                                         <ColumnTextarea showIf={_.has(styles, "garphName")} label="" value={styles.garphName} onChange={this.props.onChange.bind(this, "styles.garphName", "string")} />
                                       </Columns>}
        <Columns label="坐标">
          <Column showIf={_.has(styles, "xLabel")} label="横坐标" value={styles.xLabel} onChange={this.props.onChange.bind(this, "styles.xLabel", "string")} />
          <Column showIf={_.has(styles, "yLabel")} label="纵坐标" value={styles.yLabel} onChange={this.props.onChange.bind(this, "styles.yLabel", "string")} />
        </Columns>
        <Columns label="新建">
          <Column>
            <Button onClick={this.addLine}>
              <Icon icon="send-to-back" />
              <span>添加</span>
            </Button>
          </Column>
        </Columns>
        <Columns label="线">
          {line}
        </Columns>
      </PropertyGroup>
      );
  }
}
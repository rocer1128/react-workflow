import React, { Component } from "react";
import Radium from "radium";
import _ from "lodash";

import Icon from "../Icon";
import Panel from "./Panel";

import style from "./styles";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import Column from "./Column";
import SelectPanel from "./SelectPanel";
import BindList from "./BindList";
import { BIND } from "../../../Common/OperationConstant";

export default class BindPanel extends Panel {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  event = () => {
    this.props.onChange(this.key.value, "bind", this.value ? this.value.value : "");
  };
  delete = (key) => {
    const event = JSON.parse(JSON.stringify(this.props.object.binds.condition));
    event.splice(key, 1);
    const newevent = {
      condition: event,
    };
    this.props.onChange("binds", "object", newevent);
  };
  show = () => {
    if (this.key.value === "readDataNode") {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  };
  render() {
    const { binds } = this.props.object;
    return (
      <PropertyGroup>
        <Columns label="绑定配置">
          <SelectPanel name={"绑定配置"}>
            <Columns label="选择绑定事件">
              <select style={style.select} ref={ref => (this.key = ref)} onChange={this.show}>
                {BIND.map((element, index) => (
                  <option key={index} value={element.key}>
                    {element.value}
                  </option>
                ))}
              </select>
            </Columns>
            {this.state.show && (
              <Columns label="输入数据点">
                <textarea rows="1" style={[style.textareaInput, { width: "70%" }]} ref={ref => (this.value = ref)} />
              </Columns>
            )}
            <button style={{ marginLeft: "5px" }} onClick={this.event}>
              确认
            </button>
            <BindList value={binds.condition} onDelete={this.delete} />
          </SelectPanel>
        </Columns>
      </PropertyGroup>
    );
  }
}

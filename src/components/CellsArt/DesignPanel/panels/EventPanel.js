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
import EventList from "./EventList";
import { EVENT } from "../../../Common/OperationConstant";

export default class EventPanel extends Panel {
  event = () => {
    this.props.onChange(this.key.value, "event", this.value.value);
  };
  delete = (key) => {
    const newevent = JSON.parse(JSON.stringify(this.props.object.events));
    delete newevent[key];
    this.props.onChange("events", "object", newevent);
  };
  render() {
    const { events } = this.props.object;
    return (
      <PropertyGroup>
        <Columns label="事件配置">
          <SelectPanel name={"事件配置"}>
            <Columns label="选择事件">
              <select style={style.select} ref={ref => (this.key = ref)}>
                {EVENT.map((element, index) => (
                  <option key={index} value={element.key}>
                    {element.value}
                  </option>
                ))}
              </select>
            </Columns>
            <Columns label="输入数据点">
              <textarea rows="1" style={[style.textareaInput, { width: "70%" }]} ref={ref => (this.value = ref)} />
              <button style={{ marginLeft: "5px" }} onClick={this.event}>
                确认
              </button>
            </Columns>
            <EventList value={events} onDelete={this.delete} />
          </SelectPanel>
        </Columns>
      </PropertyGroup>
    );
  }
}

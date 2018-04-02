import React from "react";
import Icon from "../Icon";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Button from "./Button";
import Columns from "./Columns";
import Column from "./Column";

export default class IDPanel extends Panel {
  render() {
    return (
      <PropertyGroup>
        <Columns label="选中对象">
          <Column>
            <label>{this.props.object.id}</label>
          </Column>
        </Columns>
      </PropertyGroup>
    );
  }
}

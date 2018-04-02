import React from "react";
import Icon from "../Icon";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Button from "./Button";
import Columns from "./Columns";
import Column from "./Column";

export default class ArrangePanel extends Panel {
  render() {
    return (
      <PropertyGroup>
        <Columns label="层级">
          <Column>
            <Button onClick={this.props.onArrange.bind(this, "back")}>
              <Icon icon="send-to-back" />
              <span>向后隐藏</span>
            </Button>
            <Button onClick={this.props.onArrange.bind(this, "front")}>
              <Icon icon="bring-to-front" />
              <span>向前覆盖</span>
            </Button>
          </Column>
        </Columns>
      </PropertyGroup>
      );
  }
}

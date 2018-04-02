import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import Column from "./Column";
import ColorInput from "./ColorInput";

export default class BehaviorPanel extends Panel {
  render() {
    const { behavior } = this.props.object;
    const checkflash = behavior.flash ? "checked" : "";
    const checkrotate = behavior.rotateAnimate ? "checked" : "";

    return (
      <PropertyGroup>
        <Columns label="行为">
          <Column showIf={_.has(behavior, "flash")}>
            <input style={{ width: 40 }} checked={checkflash} type="checkbox" onClick={() => this.props.onChange("behavior.flash", "bool", !behavior.flash)} />
            <span>闪烁</span>
          </Column>
          <Column showIf={_.has(behavior, "rotateAnimate")}>
            <input style={{ width: 40 }} checked={checkrotate} type="checkbox" onClick={() => this.props.onChange("behavior.rotateAnimate", "bool", !behavior.rotateAnimate)} />
            <span>选中</span>
          </Column>
        </Columns>
        <Columns showIf={checkflash} label="闪烁">
          <Column label="频率(ms)" value={behavior.flashDur} onChange={this.props.onChange.bind(this, "behavior.flashDur", "")} />
        </Columns>
        <Columns showIf={checkrotate} label="选中">
          <Column>
            <ColorInput value={behavior.rotatestroke} onChange={this.props.onChange.bind(this, "behavior.rotatestroke", "")} />
          </Column>
          <Column label="宽度" value={behavior.rotatestrokeWidth} onChange={this.props.onChange.bind(this, "behavior.rotatestrokeWidth", "")} />
          <Column label="频率(s)" value={behavior.rotateAnimateDur} onChange={this.props.onChange.bind(this, "behavior.rotateAnimateDur", "")} />
          <Column label="风格" value={behavior.rotatestrokeDasharray} onChange={this.props.onChange.bind(this, "behavior.rotatestrokeDasharray", "")} />
          <Column label="偏移" value={behavior.rotatestrokeDashoffset} onChange={this.props.onChange.bind(this, "behavior.rotatestrokeDashoffset", "")} />
        </Columns>
      </PropertyGroup>
      );
  }
}

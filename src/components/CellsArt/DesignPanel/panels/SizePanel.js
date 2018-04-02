import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import Column from "./Column";
import ColorInput from "./ColorInput";

export default class SizePanel extends Panel {
  render() {
    const { styles } = this.props.object;
    return (
      <PropertyGroup object={styles}>
        <Columns label="基本属性">
          <Column showIf={_.has(styles, "fill")}>
            <ColorInput value={styles.fill} onChange={this.props.onChange.bind(this, "styles.fill", "")} />
          </Column>
          <Column label="X" value={styles.x} onChange={this.props.onChange.bind(this, "styles.x", "number")} />
          <Column label="Y" value={styles.y} onChange={this.props.onChange.bind(this, "styles.y", "number")} />
          <Column label="宽" value={styles.width} onChange={this.props.onChange.bind(this, "styles.width", "number")} />
          <Column label="高" value={styles.height} onChange={this.props.onChange.bind(this, "styles.height", "number")} />
        </Columns>
      </PropertyGroup>
      );
  }
}

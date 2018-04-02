import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import Column from "./Column";

export default class SizePanel extends Panel {
  render() {
    const { styles } = this.props.object;
    return (
      <PropertyGroup object={styles}>
        <Columns showIf={_.has(styles, "max")} label="温度">
          <Column label="最高(℃)" value={styles.max} onChange={this.props.onChange.bind(this, "styles.max", "number")} />
          <Column label="当前(℃)" value={styles.current} onChange={this.props.onChange.bind(this, "styles.current", "number")} />
        </Columns>
      </PropertyGroup>
      );
  }
}

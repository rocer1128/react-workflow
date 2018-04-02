import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import Column from "./Column";
import ColorInput from "./ColorInput";
import style from "./styles";

export default class StylePanel extends Panel {

  render() {
    const { styles } = this.props.object;

    return (
      <PropertyGroup showIf={_.has(styles, "stroke")}>
        <Columns label="边框">
          <Column>
            <ColorInput value={styles.stroke} onChange={this.props.onChange.bind(this, "styles.stroke", "")} />
          </Column>
          <Column label="宽度" value={styles.strokeWidth} onChange={this.props.onChange.bind(this, "styles.strokeWidth", "")} />
          <Column label="偏移量" value={styles.strokeDashoffset} onChange={this.props.onChange.bind(this, "styles.strokeDashoffset", "")} />
          <Column label="风格">
            <input style={[style.input, style.integerInput]} value={styles.strokeDasharray} onChange={this.props.onChange.bind(this, "styles.strokeDasharray", "")} />
          </Column>
        </Columns>
      </PropertyGroup>
      );
  }
}

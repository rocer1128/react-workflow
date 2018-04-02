import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import style from "./styles";
import PropertyGroup from "./PropertyGroup";
import SwitchState from "./SwitchState";
import Columns from "./Columns";
import Column from "./Column";

export default class TextPanel extends Panel {
  fontFamilies =[
    ["Helvetica", "Helvetica, Arial, sans-serif"],
    ["Helvetica Neue", "\"Helvetica Neue\", Arial, sans-serif"],
    ["Georgia", "Georgia, serif"],
    ["American Typewriter", "AmericanTypewriter, Georgia, serif"],
    ["Monaco", "Monaco, consolas, monospace"],
  ];

  render() {
    const { styles } = this.props.object;
    return (
      <PropertyGroup showIf={_.has(styles, "text")}>
        <Columns label="文字属性">
          <Column label="字号" value={styles.fontSize} onChange={this.props.onChange.bind(this, "styles.fontSize", "")} />
          <Column style={style.column}>
            <select style={style.select} value={styles.fontFamily} onChange={e => this.props.onChange("styles.fontFamily", "", e.target.value)}>
              {this.fontFamilies.map(([name, value]) => <option key={name} value={value}>
                                                          {name}
                                                        </option>)}
            </select>
            <div style={style.inputHelper}>
              字体
            </div>
          </Column>
        </Columns>
        <Columns showIf={_.has(styles, "fontWeight") && _.has(styles, "fontStyle") && _.has(styles, "textDecoration")}>
          <Column>
            <SwitchState icon="format-bold" defaultValue={"normal"} nextState={"bold"} value={styles.fontWeight} onChange={this.props.onChange.bind(this, "styles.fontWeight", "")} />
            <SwitchState icon="format-italic" defaultValue={"normal"} nextState={"italic"} value={styles.fontStyle} onChange={this.props.onChange.bind(this, "styles.fontStyle", "")} />
            <SwitchState icon="format-underline" defaultValue={"none"} nextState={"underline"} value={styles.textDecoration} onChange={this.props.onChange.bind(this, "styles.textDecoration", "")} />
          </Column>
        </Columns>
        <Columns label="文本内容">
          <input style={[style.input, style.integerInput, style.textInput]} value={styles.text} onChange={e => this.props.onChange("styles.text", "", e.target.value)} />
        </Columns>
      </PropertyGroup>
      );
  }
}

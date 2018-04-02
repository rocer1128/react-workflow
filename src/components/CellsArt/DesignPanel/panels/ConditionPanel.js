import React from "react";
import _ from "lodash";
import Panel from "./Panel";
import style from "./styles";
import PropertyGroup from "./PropertyGroup";
import Columns from "./Columns";
import SelectPanel from "./SelectPanel";
import ConditionList from "./ConditionList";
import Column from "./Column";

export default class ConditionPanel extends Panel {

  handleAdd = () => {
    const newcondition = [...this.props.object.conditions, {
      name: this.name.value,
    }];
    this.props.onChange("conditions", "", newcondition);
  }

  handleDelete = (index) => {
    const { styles, conditions } = this.props.object;
    if (styles.condition === conditions[index].name) {
      styles.condition = "default";
      this.props.onChange("styles", "", styles);
    }
    const new1 = conditions.slice(0, index);
    const new2 = conditions.slice(index + 1);
    const newconditions = [...new1, ...new2];
    this.props.onChange("conditions", "object", newconditions);
  }

  render() {
    const { conditions, styles } = this.props.object;
    return (
      <PropertyGroup showIf={_.has(styles, "condition")}>
        <Columns label="状态">
          <Column label="选择">
            <select style={style.select} value={styles.condition} onChange={e => this.props.onChange("styles.condition", "", e.target.value)}>
              {conditions ? conditions.map((element, index) => <option key={index} value={element.name}>
                                                                 {element.name}
                                                               </option>) : null}
            </select>
          </Column>
          <Column style={{ marginLeft: "5px" }}>
            <SelectPanel name={"配置"}>
              <Columns label="输入名称">
                <input style={[style.input, { width: "100px", marginLeft: "10px" }]} ref={ref => (this.name = ref)} />
                <button onClick={this.handleAdd} style={{ marginLeft: "80px" }}>
                  添加
                </button>
              </Columns>
              <ConditionList items={conditions} onDelete={this.handleDelete} onAdd={this.handleAdd} />
            </SelectPanel>
          </Column>
        </Columns>
      </PropertyGroup>
      );
  }
}

import React, { Component, PropTypes } from "react";
import * as Types from "./types";

/**
 * DynamicForm：动态加载字段类
 */
export default class DynamicForm extends Component {
  static propTypes = {
    dataTemp: PropTypes.array.isRequired, // 要动态加载的字段
  }

  constructor(props) {
    super(props);
    this.objectRefs = []; // 动态加载的字段的对象引用（ref）都保存在objectRefs数组中
    this.renderObject = this.renderObject.bind(this);
    this.getRefValue = this.getRefValue.bind(this);
  }

  /**
   * 外层获取动态加载的字段的值，返回Json结构
   * @return {Object}
   */
  getRefValue() {
    const json = {};
    for (let i = 0; i < this.props.dataTemp.length; i++) {
      // 把每一个字段的键值对，拼接成一个大的Json
      Object.assign(json, this.objectRefs[i].getValue());
    }
    return json;
  }

  /**
   * 解析每一个要动态加载的字段
   * @param  {Object} object [字段的描述信息]
   * @param  {number} index [索引]
   * @return {Object} [返回html对象]
   */
  renderObject(object, index) {
    const type = object.type; // 字段的类型，比如输入框，选择框等
    const Type = Types[type]; // 根据type找到Types中相应的类型对象
    return (
      <Type data={object} ref={ref => (this.objectRefs[index] = ref)} key={index} />
      );
  }

  render() {
    return (
      <div>
        {this.props.dataTemp.map(this.renderObject)}
      </div>
      );
  }
}

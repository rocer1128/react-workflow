import React, { Component, PropTypes } from "react";
import { Row, Col, Checkbox, FormGroup } from "react-bootstrap";

export default class PropertyCheckbox extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired, // 要动态加载的字段的信息
  }

  /**
    * 挂载完组件时，把传入的字段值显示在页面上，新建时为空，编辑时为从数据库读取的值
    */
  componentDidMount() {
    this.checkbox.checked = this.props.data.value;
  }

  /**
    * 接收新props时，对应场景为点击不同"数据源"的标签时，字段的值是不一样的
    */
  componentWillReceiveProps(nextProps) {
    this.checkbox.checked = nextProps.data.value;
  }

  /**
    * 外层调用此函数获取字段的键值对
    */
  getValue() {
    const json = {
      [this.checkbox.name]: this.checkbox.checked,
    };
    return json;
  }

  render() {
    return (
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginLeft: 50, width: 130 }}>
          {this.props.data.name}：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 0, height: 20 }}>
              <Checkbox inputRef={ref => (this.checkbox = ref)} style={{ margin: 0 }} name={this.props.data.id} />
            </FormGroup>
          </form>
        </Col>
      </Row>
      );
  }
}

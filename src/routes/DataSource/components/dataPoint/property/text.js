import React, { Component, PropTypes } from "react";
import { Row, Col, FormControl, FormGroup } from "react-bootstrap";

export default class PropertyText extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired, // 要动态加载的字段的信息
  }

  /**
    * 挂载完组件时，把传入的字段值显示在页面上，新建时为空，编辑时为从数据库读取的值
    */
  componentDidMount() {
    this.input.value = this.props.data.value;
  }

  /**
    * 接收新props时，对应场景为点击不同"数据源"的标签时，字段的值是不一样的
    */
  componentWillReceiveProps(nextProps) {
    this.input.value = nextProps.data.value;
  }

  /**
    * 外层调用此函数获取字段的键值对
    */
  getValue() {
    if (this.props.data.valueType === "number") {
      return {
        [this.input.name]: parseInt(this.input.value, 10),
      };
    }
    return {
      [this.input.name]: this.input.value,
    };
  }

  render() {
    return (
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, marginLeft: 50, width: 130 }}>
        {this.props.data.name}：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl type="text" inputRef={ref => (this.input = ref)} name={this.props.data.id} />
          </FormGroup>
        </form>
        </Col>
      </Row>);
  }
}

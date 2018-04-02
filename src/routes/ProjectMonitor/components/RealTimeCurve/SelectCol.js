import React, { Component, PropTypes } from "react";
import Select from "react-select";
import { FormGroup, Col, Row } from "react-bootstrap";
import "react-select/dist/react-select.css";

/**
 * SelectCol：数据点选择类
 */
export default class SelectCol extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired, // 可选择数据点
    changeoptions: PropTypes.array.isRequired, // 选择的数据点
    title: PropTypes.string.isRequired, // 字段名称：数据点
  }

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { changeoptions } = nextProps;
    if (changeoptions.length > 0) {
      this.setState({
        value: changeoptions,
      });
    }
  }

  handleSelectChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          {this.props.title}：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 2 }}>
              <Select
                noResultsText={"请先定义数据点"}
                onChange={this.handleSelectChange}
                placeholder="请选择数据点"
                multi
                value={this.state.value}
                options={this.props.options}
              />
            </FormGroup>
          </form>
        </Col>
      </Row>
      );
  }
}

import React, { Component, PropTypes } from "react";
import Select from "react-select";
import { FormGroup, Col, Row } from "react-bootstrap";
import "react-select/dist/react-select.css";

export default class SelectCol extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired, // 可选择的数据点列表
    changeoptions: PropTypes.array.isRequired, // 已选择的数据点列表
    title: PropTypes.string.isRequired, // 选择框的标题
  }
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /**
   * 把外部传入的已选择数据点的列表展示到页面上
   */
  componentWillReceiveProps(nextProps) {
    const { changeoptions } = nextProps;
    if (changeoptions.length > 0) {
      this.setState({
        value: changeoptions,
      });
    }
  }

  /**
   * 更改选择的数据点列表
   */
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

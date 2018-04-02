import React, { Component, PropTypes } from "react";
import Select from "react-select";
import { browserHistory } from "react-router";
import { FormGroup, Form, Row, Button, Col } from "react-bootstrap";
import "react-select/dist/react-select.css";

export default class CalenderOperation extends Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    selectValues: PropTypes.array.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false,
    };
  }

  showModal = () => {
    this.setState({
      isShowAdd: true,
    });
  }
  closeModal = () => {
    this.setState({
      isShowAdd: false,
    });
  }

  toProject = () => {
    browserHistory.push("/project");
  }

  render() {
    return (
      <Row>
        <Col sm={5} md={5}>
        <Form inline>
          <FormGroup style={{ paddingLeft: 10, paddingRight: 10, minWidth: "200px" }}>
            <Select
              noResultsText={"无任务"}
              placeholder="分类查看"
              multi
              onChange={this.props.handleSelectChange.bind(this, this.props.events)}
              options={this.props.options}
              value={this.props.selectValues}
            />
          </FormGroup>
        </Form>
        </Col>
        <Col sm={7} md={7} style={{ textAlign: "right" }}>
        <Form inline>
          <Button bsStyle="primary" onClick={this.toProject}>
            工程部署
          </Button>
        </Form>
        </Col>
      </Row>
      );
  }
}

import React, { Component, PropTypes } from "react";
import { Row, Button, Col, Nav, NavItem } from "react-bootstrap";

export default class SPCToolbar extends Component {
  static propTypes = {
    handleSave: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    // this.props.handleSelect(1);
    this.state = {
      key: 1,
    };
  }

  handleSelect = (pages, key) => {
    this.props.handleSelect(pages, key);
    this.setState({
      key,
    });
  };

  render() {
    let controlJson = {};
    let pageId = 0;
    if (this.props.currentPage) {
      pageId = this.props.currentPage.id;
      controlJson = this.props.currentPage.process_control;
    }
    let tabItems = {};
    if (this.props.pages) {
      tabItems = this.props.pages.map((item, index) =>
        <NavItem key={index} eventKey={parseInt(parseInt(index, 10) + 1, 10)}>
          {item.name}
        </NavItem>,
      );
    }
    return (
      <Row>
        <Col xs={12} sm={8} style={{ textAlign: "left", margin: "2px 0" }}>
          {this.props.pages &&
            <Nav bsStyle="pills" activeKey={this.state.key} onSelect={this.handleSelect.bind(this, this.props.pages)} id="controlled-tab-example">
              {tabItems}
            </Nav>}
        </Col>
        <Col xs={12} sm={4} style={{ textAlign: "right", margin: "5px 0" }}>
          <Button bsStyle="primary" style={{ marginLeft: 3 }} onClick={this.props.send} disabled={this.props.abled}>
            启动
          </Button>
          <Button bsStyle="primary" style={{ marginLeft: 3 }}>
            停止
          </Button>
          <Button bsStyle="primary" style={{ marginLeft: 3 }} onClick={this.props.handleSave.bind(this, pageId, controlJson)}>
            保存
          </Button>
        </Col>
      </Row>
    );
  }
}

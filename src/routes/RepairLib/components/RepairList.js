import React, { Component, PropTypes } from "react";
import { Table, Panel, Grid, Row, Col, ListGroup, ListGroupItem, Button, Navbar, Nav, NavItem } from "react-bootstrap";
import Radium from "radium";
import moment from "moment";
import "./style.css";
export default class RepairList extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const rows = this.props.list.map((repair, index) => (
      <ListGroupItem key={index} onClick={this.props.checkDetail.bind(this, repair)}>
        {repair.recordContent}
      </ListGroupItem>
    )
    );
    return (
      <Grid>
        <Row>
          {/*<Navbar fixedTop collapseOnSelect><Navbar.Header><Navbar.Brand><a href="#">报修库</a></Navbar.Brand><Navbar.Toggle /></Navbar.Header><Navbar.Collapse><Nav pullRight><NavItem onClick={this.props.searchClick.bind(this)}>搜索</NavItem></Nav> </Navbar.Collapse></Navbar>*/}
          <div className="panell panell-primary">
            <text className="panell-heading">
              报修库
            </text>
            {!this.props.searchResult && <button className="floatrr btnn btn-primary " onClick={this.props.searchClick.bind(this)}>
                                           搜索
                                         </button>}
            {this.props.searchResult && <button className="floatrr btnn btn-primary " onClick={this.props.returnList.bind(this)}>
                                          返回列表
                                        </button>}
          </div>
        </Row>
        <Row>
          <ListGroup>
            {rows}
          </ListGroup>
        </Row>
        <Row>
          {/*<ButtonGroup vertical block> <Button bsStyle="primary" onClick={this.props.searchClick.bind(this)}>返回</Button></ButtonGroup>*/}
        </Row>
      </Grid>);

  }
}
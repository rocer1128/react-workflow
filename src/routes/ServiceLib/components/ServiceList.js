import React, { Component, PropTypes } from "react";
import { Table, Panel, Grid, Row, ListGroup, ListGroupItem, Button, Navbar, Nav, NavItem } from "react-bootstrap";
import Radium from "radium";
import moment from "moment";
export default class ServiceList extends Component {
  // static propTypes = {
  //   list: PropTypes.array.isRequire,
  // };
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data);
    const rows = this.props.data.map((item, index) => (
      <ListGroupItem key={index} onClick={this.props.checkDetail.bind(this, item)}>
        {item.remarks}
      </ListGroupItem>
    )
    );
    return (
      <Grid>
        <Row>
          {/*<Panel header={"维修库列表"} bsStyle="primary" />*/}
          <div className="panell panell-primary">
            <text className="panell-heading">
              维修库列表
            </text>
            <button className="floatrr btnn btn-primary " onClick={this.props.returnSearch.bind(this)}>
              返回查询界面
            </button>
          </div>
        </Row>
        <Row>
          <ListGroup>
            {rows}
          </ListGroup>
          {/*<Table bordered striped responsive><tbody>{rows}</tbody></Table>*/}
        </Row>
      </Grid>);

  }
}
import React, { Component, PropTypes } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default class ProjectMonitorNavigation extends Component {
  static propTypes = {
    onClickCurve: PropTypes.func.isRequired,
    onClickAlert: PropTypes.func.isRequired,
    onClickPage: PropTypes.func.isRequired,
    onClickDataSource: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      clickindex: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    switch (parseInt(e.target.value, 10)) {
      case 1:
        this.props.onClickPage();
        break;
      case 2:
        this.props.onClickDataSource();
        break;
      case 3:
        this.props.onClickAlert();
        break;
      case 4:
        this.props.onClickCurve();
        break;
      default:
        return;
    }
    this.setState({
      clickindex: parseInt(e.target.value, 10),
    });
  }

  render() {
    return (
      <ListGroup fill style={{ margin: 0 }}>
        <ListGroupItem active={this.state.clickindex === 1} value="1" onClick={this.handleClick} style={{ margin: 2, width: 196 }}>
          实时画面
        </ListGroupItem>
        <ListGroupItem active={this.state.clickindex === 2} value="2" onClick={this.handleClick} style={{ margin: 2, width: 196 }}>
          实时数据
        </ListGroupItem>
        <ListGroupItem active={this.state.clickindex === 3} value="3" onClick={this.handleClick} style={{ margin: 2, width: 196 }}>
          警告管理
        </ListGroupItem>
        <ListGroupItem active={this.state.clickindex === 4} value="4" onClick={this.handleClick} style={{ margin: 2, width: 196 }}>
          数据曲线
        </ListGroupItem>
      </ListGroup>
      );
  }
}

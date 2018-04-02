import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Button, Col, Row } from "react-bootstrap";
import moment from "moment";
import "./react-datetime.css";

export default class CheckDatetime extends Component {
  static propTypes = {
    PointId: PropTypes.number.isRequired, // 数据源id
    getHistory: PropTypes.func.isRequired, // 获取历史数据方法
  }

  constructor(props) {
    super(props);
    this.state = {
      startTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  handleChangeStartTime(event) {
    this.setState({
      startTime: event._d,
    });
  }

  handleChangeEndTime(event) {
    this.setState({
      endTime: event._d,
    });
  }

  checkData() {
    const json = {
      data_node_id: this.props.PointId,
      start_date: moment(this.state.startTime).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(this.state.endTime).format("YYYY-MM-DD HH:mm:ss"),
      number: null,
    };

    this.props.getHistory(json, this.props.PointId);
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: 30, marginTop: 10 }}>
          <Col xsOffset={1} xs={2} style={{ marginTop: 8, width: 80, padding: 0 }}>
            起始时间:
          </Col>
          <Col xs={3}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.startTime} onChange={this.handleChangeStartTime} />
          </Col>
          <Col xs={2} style={{ marginTop: 8, width: 80, padding: 0 }}>
            结束时间:
          </Col>
          <Col xs={3}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.endTime} onChange={this.handleChangeEndTime} />
          </Col>
          <Col xs={2}>
            <Button bsStyle="primary" onClick={this.checkData}>
              查询
            </Button>
          </Col>
        </Row>
      </div>
      );
  }
}

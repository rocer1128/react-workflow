import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Button, Col, Row, FormControl } from "react-bootstrap";
import moment from "moment";
import "../react-datetime.css";
import { LEVEL_TYPES, ALERT_TYPES1, ALERT_TYPES2 } from "../../../../components/Common/ComponentConstant";

/**
 * CheckMonitor：查询警告信息
 */
export default class CheckMonitor extends Component {
  static propTypes = {
    getAlert: PropTypes.func.isRequired, // 查询警告信息的函数
  }

  constructor(props) {
    super(props);
    this.checkData = this.checkData.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.state = {
      startTime: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
      endTime: moment().format("YYYY-MM-DD HH:mm:ss"), // 结束时间
    };
  }

  /**
   * 切换起始时间
   */
  handleChangeStartTime(event) {
    this.setState({
      startTime: event._d,
    });
  }

  /**
   * 切换结束时间
   */
  handleChangeEndTime(event) {
    this.setState({
      endTime: event._d,
    });
  }

  /**
   * 查询报警信息
   */
  checkData() {
    this.props.getAlert(moment(this.state.startTime).format("YYYY-MM-DD HH:mm:ss"), moment(this.state.endTime).format("YYYY-MM-DD HH:mm:ss"), parseInt(this.level.value, 10), parseInt(this.type.value, 10));
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: 20, marginTop: 10 }}>
          <Col xs={2} style={{ marginTop: 8, marginLeft: 30, width: 80, padding: 0 }}>
            起始时间:
          </Col>
          <Col xs={2}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.startTime} onChange={this.handleChangeStartTime} />
          </Col>
          <Col xs={2} style={{ marginTop: 8, width: 80, padding: 0 }}>
            结束时间:
          </Col>
          <Col xs={2}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.endTime} onChange={this.handleChangeEndTime} />
          </Col>
          <Col xs={1} style={{ marginTop: 8, width: 40, padding: 0 }}>
            级别:
          </Col>
          <Col xs={2}>
            <FormControl componentClass="select" inputRef={ref => (this.level = ref)}>
              <option value="0">
                全部
              </option>
              {Object.keys(LEVEL_TYPES).map((element, index) => (
                 <option value={element} key={index}>
                   {LEVEL_TYPES[parseInt(element, 10)]}
                 </option>
               ))}
            </FormControl>
          </Col>
          <Col xs={1} style={{ marginTop: 8, width: 40, padding: 0 }}>
            类型:
          </Col>
          <Col xs={2}>
            <FormControl componentClass="select" inputRef={ref => (this.type = ref)}>
              <option value="0">
                全部
              </option>
              {Object.keys(ALERT_TYPES1).map((element, index) => (
                 <option value={element} key={index}>
                   {ALERT_TYPES1[parseInt(element, 10)]}
                 </option>
               ))}
              {Object.keys(ALERT_TYPES2).map((element, index) => (
                 <option value={element} key={index}>
                   {ALERT_TYPES2[parseInt(element, 10)]}
                 </option>
               ))}
            </FormControl>
          </Col>
          <Col xs={1}>
            <Button bsStyle="primary" onClick={this.checkData}>
              查询
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

}

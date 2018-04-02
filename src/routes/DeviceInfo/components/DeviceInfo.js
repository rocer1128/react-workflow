import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Form, FormGroup, Col, FormControl, ControlLabel, Pager, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import moment from "moment";
import "./react-datetime.css";

export default class Workflow extends Component {

  static propTypes = {
    deviceinfo: PropTypes.object.isRequired,
    searchInfo: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
    };
  }

  componentWillMount() {
    if (this.props.location.query.user_id && this.props.location.query.code) {
      this.props.searchInfo(this.props.location.query.user_id, this.props.location.query.code);
    }
  }

  moduleRepair = () => {
    browserHistory.push(`/modulelist?user_id=${this.props.location.query.user_id}&code=${this.props.location.query.code}`);
  }

  machineRepair = () => {
    browserHistory.push(`/machinerepair?user_id=${this.props.location.query.user_id}&code=${this.props.location.query.code}`);
  }
  render() {
    let interIntem = {};
    this.interRef = [];

    if (this.props.deviceinfo.device) {
      interIntem = this.props.deviceinfo.device.map((item, index) => {
        if (item.is_readonly) {
          switch (item.field_type) {
            case "selection":
              return (<FormGroup key={index}>
                        <Col componentClass={ControlLabel} sm={3}>
                          {item.display_name}:
                        </Col>
                        <Col componentClass={ControlLabel} sm={8}>
                          {item.field_value ? item.field_params.selection_type[item.field_value] : ""}
                        </Col>
                      </FormGroup>);
            case "one2many":
              return (
                <Panel header={item.display_name} bsStyle="primary" key={index}>
                  <ListGroup fill key={index}>
                    {item.field_params.data.map((items, indexs) => (<ListGroupItem key={indexs}>
                                                                      {`${items[0].field_value}:${items[1].field_value}`}
                                                                    </ListGroupItem>))}
                  </ListGroup>
                </Panel>);
            default:
              return (<FormGroup key={index}>
                        <Col componentClass={ControlLabel} sm={3}>
                          {item.display_name}:
                        </Col>
                        <Col componentClass={ControlLabel} sm={8}>
                          {item.field_value ? item.field_value : ""}
                        </Col>
                      </FormGroup>);
          }
        }
        switch (item.field_type) {
          case "selection":
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={3}>
                        {item.display_name}:
                      </Col>
                      <Col sm={8}>
                        <FormControl componentClass="select" inputRef={ref => (this.interRef[index] = ref)}>
                          {Object.keys(item.field_params.selection_type).map((items, indexs) => (<option key={indexs} value={items}>
                                                                                                   {item.field_params.selection_type[items]}
                                                                                                 </option>))}
                        </FormControl>
                      </Col>
                    </FormGroup>);
          case "datetime":
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={3}>
                        {item.display_name}:
                      </Col>
                      <Col componentClass={ControlLabel} sm={8}>
                        <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" defaultValue={this.state.time} ref={ref => (this.interRef[index] = ref)} />
                      </Col>
                    </FormGroup>);
          default:
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={3}>
                        {item.display_name}:
                      </Col>
                      <Col sm={8}>
                        <FormControl type="text" placeholder={item.display_name} inputRef={ref => (this.interRef[index] = ref)} />
                      </Col>
                    </FormGroup>);
        }
      });
    }

    return (
      <div>
        <Panel header={"设备信息"} bsStyle="primary" />
        <Form horizontal>
          {this.props.deviceinfo.device && interIntem}
        </Form>
        <Pager>
          <Pager.Item previous onClick={this.machineRepair}>
            整机故障报修
          </Pager.Item>
          <Pager.Item next onClick={this.moduleRepair}>
            模块故障报修
          </Pager.Item>
        </Pager>
      </div>
      );
  }
}

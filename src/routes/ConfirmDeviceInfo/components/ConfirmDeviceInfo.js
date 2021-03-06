import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Form, FormGroup, Col, FormControl, ControlLabel, Pager, Panel, ListGroup, ListGroupItem, Checkbox } from "react-bootstrap";
import moment from "moment";
import { browserHistory } from "react-router";
import "./react-datetime.css";

export default class ConfirmDeviceInfo extends Component {
  static propTypes = {
    confirmdeviceInfo: PropTypes.object.isRequired,
    searchInfo: PropTypes.func.isRequired,
    submitInfo: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    submitFinish: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
    };
  }

  componentWillMount() {
    if (this.props.location.query.user_id && this.props.location.query.repair_apply_id) {
      this.props.searchInfo(this.props.location.query.user_id, this.props.location.query.repair_apply_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitFinish } = this.props;
    if (nextProps.confirmdeviceInfo.refresh === true) {
      submitFinish();
      browserHistory.push(`/stoppage?user_id=${this.props.location.query.user_id}&repair_apply_id=${this.props.location.query.repair_apply_id}&apply_type=${nextProps.confirmdeviceInfo.submit}`);
    }
  }

  goBack = () => {
    browserHistory.push(`/message?user_id=${this.props.location.query.user_id}&repair_apply_id=${this.props.location.query.repair_apply_id}`);
  };

  submit = () => {
    this.props.submitInfo(this.props.location.query.user_id, this.props.location.query.repair_apply_id, this.interRef[0].value);
  };
  render() {
    let interIntem = {};
    this.interRef = [];

    if (this.props.confirmdeviceInfo.catalog) {
      interIntem = this.props.confirmdeviceInfo.catalog.map((item, index) => {
        if (item.is_readonly) {
          switch (item.field_type) {
            case "selection":
              return (
                <FormGroup key={index}>
                  <Col componentClass={ControlLabel} sm={3}>
                    {item.display_name}:
                  </Col>
                  <Col componentClass={ControlLabel} sm={8}>
                    {item.field_value ? item.field_params.selection_type[item.field_value] : ""}
                  </Col>
                </FormGroup>
              );
            case "checkbox":
              return (
                <FormGroup key={index}>
                  <Checkbox checked={item.field_value} readOnly>
                    {item.display_name}
                  </Checkbox>
                </FormGroup>
              );
            case "one2many":
              return (
                <Panel header={item.display_name} bsStyle="primary" key={index}>
                  <ListGroup fill key={index}>
                    {item.field_params.data.map((items, indexs) => <ListGroupItem key={indexs}>{`${items[0].field_value}:${items[1].field_value}`}</ListGroupItem>)}
                  </ListGroup>
                </Panel>
              );
            default:
              return (
                <FormGroup key={index}>
                  <Col componentClass={ControlLabel} sm={3}>
                    {item.display_name}:
                  </Col>
                  <Col componentClass={ControlLabel} sm={8}>
                    {item.field_value ? item.field_value : ""}
                  </Col>
                </FormGroup>
              );
          }
        }
        switch (item.field_type) {
          case "selection":
            return (
              <FormGroup key={index}>
                <Col componentClass={ControlLabel} sm={3}>
                  {item.display_name}:
                </Col>
                <Col sm={8}>
                  <FormControl componentClass="select" inputRef={ref => (this.interRef[index] = ref)}>
                    {Object.keys(item.field_params.selection_type).map((items, indexs) => (
                      <option key={indexs} value={items}>
                        {item.field_params.selection_type[items]}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </FormGroup>
            );
          case "checkbox":
            return (
              <FormGroup key={index}>
                <Checkbox inputRef={ref => (this.interRef[index] = ref)}>{item.display_name}</Checkbox>
              </FormGroup>
            );
          case "datetime":
            return (
              <FormGroup key={index}>
                <Col componentClass={ControlLabel} sm={3}>
                  {item.display_name}:
                </Col>
                <Col componentClass={ControlLabel} sm={8}>
                  <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" defaultValue={this.state.time} ref={ref => (this.interRef[index] = ref)} />
                </Col>
              </FormGroup>
            );
          default:
            return (
              <FormGroup key={index}>
                <Col componentClass={ControlLabel} sm={3}>
                  {item.display_name}:
                </Col>
                <Col sm={8}>
                  <FormControl type="text" placeholder={item.display_name} inputRef={ref => (this.interRef[index] = ref)} />
                </Col>
              </FormGroup>
            );
        }
      });
    }

    return (
      <div>
        <Panel header={"确定故障模块"} bsStyle="primary" />
        <Form horizontal>{this.props.confirmdeviceInfo.catalog && interIntem}</Form>
        <Pager>
          <Pager.Item previous onClick={this.goBack}>
            返回
          </Pager.Item>
          <Pager.Item next onClick={this.submit}>
            确定模块
          </Pager.Item>
        </Pager>
      </div>
    );
  }
}

import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Panel, ListGroup, ListGroupItem, Checkbox } from "react-bootstrap";
import { browserHistory } from "react-router";
import moment from "moment";
import "./react-datetime.css";

export default class RepairDevice extends Component {

  static propTypes = {
    repairdevice: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    searchInfo: PropTypes.func.isRequired,
    submitInfo: PropTypes.func.isRequired,
    submitFinish: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
    };
  }

  componentWillMount() {
    if (this.props.auth.user) {
      this.props.searchInfo(this.props.auth.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitFinish } = this.props;
    if (nextProps.repairdevice.refresh === true) {
      submitFinish();
      browserHistory.push(`/repairallocate?user_id=${this.props.auth.user}`);
    }
  }

  submit = () => {
    const repairId = [];
    if (this.interRef.length > 0) {
      this.interRef.map((item) => {
        if (item.checked) {
          repairId.push(item.value);
        }
        return 1;
      });
    }
    const redata = {
      user_id: this.props.auth.user,
      repair_apply_ids: repairId,
    };
    this.props.submitInfo(redata);
  }
  render() {
    let interIntem = {};
    this.interRef = [];

    if (this.props.repairdevice.catalog) {
      interIntem = this.props.repairdevice.catalog.map((item, index) => {
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
            case "checkbox":
              return (<FormGroup key={index}>
                        <Col componentClass={ControlLabel} sm={12}>
                          <Checkbox value={item.field_params.repair_apply_id} checked={item.field_value} readOnly>
                            {item.display_name}
                          </Checkbox>
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
          case "checkbox":
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={12}>
                        <Checkbox value={item.field_params.field_id} inputRef={ref => (this.interRef[index] = ref)}>
                          {item.display_name}
                        </Checkbox>
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
        <Panel header={"维修任务分配"} bsStyle="primary" />
        <Form horizontal>
          {this.props.repairdevice.catalog && interIntem}
        </Form>
        <Button bsStyle="primary" bsSize="large" block onClick={this.submit}>
          选择维修人
        </Button>
      </div>
      );
  }
}

import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Panel, ListGroup, ListGroupItem, Checkbox, Radio } from "react-bootstrap";
import { browserHistory } from "react-router";
import moment from "moment";
import "./react-datetime.css";

export default class RepairForm extends Component {

  static propTypes = {
    repairform: PropTypes.object.isRequired,
    searchInfo: PropTypes.func.isRequired,
    submitInfo: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    submitFinish: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
      radiorecord: [], // 记录radio的值
    };
  }

  componentWillMount() {
    if (this.props.location.query.user_id && this.props.location.query.repair_form_id) {
      this.props.searchInfo(this.props.location.query.user_id, this.props.location.query.repair_form_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitFinish } = this.props;
    if (nextProps.repairform.refresh === true) {
      submitFinish();
      browserHistory.push("/repairlist");
    }
  }

  submit = () => {
    const catalogs = JSON.parse(JSON.stringify(this.props.repairform.catalog));
    if (catalogs) {
      catalogs.map((item, index) => {
        if (!item.is_readonly) {
          Object.assign(item, {
            field_value: this.interRef[index].value,
          });
        }
        return true;
      });
    }
    const redata = {
      user_id: parseInt(this.props.location.query.user_id, 10),
      repair_form_id: parseInt(this.props.location.query.repair_form_id, 10),
      data: catalogs,
    };
    this.props.submitInfo(redata);
  }
  render() {
    let interIntem = {};
    this.interRef = [];

    if (this.props.repairform.catalog) {
      interIntem = this.props.repairform.catalog.map((item, index) => {
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
            case "radio":
              return (<FormGroup key={index}>
                        <Col componentClass={ControlLabel} sm={3}>
                          {item.display_name}:
                        </Col>
                        <Col componentClass={ControlLabel} sm={8}>
                          {item.field_value ? item.field_params.radio_type[item.field_value] : ""}
                        </Col>
                      </FormGroup>);
            case "checkbox":
              return (<FormGroup key={index}>
                        <Col componentClass={ControlLabel} sm={12}>
                          <Checkbox value={item.field_params.field_id} checked={item.field_value} readOnly>
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
          case "radio":
            return (<FormGroup key={index}>
                      <div>
                        <Col componentClass={ControlLabel} sm={12}>
                          {item.display_name}:
                        </Col>
                      </div>
                      <Col componentClass={ControlLabel} sm={12}>
                        <FormControl componentClass="select" multiple inputRef={ref => (this.interRef[index] = ref)} style={{ width: "calc(100vw - 30px)" }}>
                          {Object.keys(item.field_params.radio_type).map((items, indexs) => (<option key={indexs} value={items}>
                                                                                               {item.field_params.radio_type[items]}
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
          case "boolean":
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={3}>
                        {item.display_name}:
                      </Col>
                      <Col sm={8}>
                        <FormControl componentClass="select" inputRef={ref => (this.interRef[index] = ref)}>
                          <option value={true}>
                            是
                          </option>
                          <option value={false}>
                            否
                          </option>
                        </FormControl>
                      </Col>
                    </FormGroup>);
          default:
            return (<FormGroup key={index}>
                      <Col componentClass={ControlLabel} sm={3}>
                        {item.display_name}:
                      </Col>
                      <Col sm={8}>
                        <FormControl type="text" placeholder={item.display_name} defaultValue={item.field_value ? item.field_value : ""} inputRef={ref => (this.interRef[index] = ref)} />
                      </Col>
                    </FormGroup>);
        }
      });
    }

    return (
      <div>
        <Panel header={"维修单"} bsStyle="primary" />
        <Form horizontal>
          {this.props.repairform.catalog && interIntem}
        </Form>
        <Button bsStyle="primary" bsSize="large" block onClick={this.submit}>
          提交
        </Button>
      </div>
      );
  }
}

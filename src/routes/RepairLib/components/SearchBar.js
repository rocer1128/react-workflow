import React, { Component, PropTypes } from "react";
import { Form, FormGroup, FormControl, Panel, Grid, Row, Col, ControlLabel, ButtonGroup, Button, Navbar, Nav, NavItem } from "react-bootstrap";
import DateTime from "react-datetime";
import moment from "moment";
import "./react-datetime.css";
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    console.log("opoppop", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    this.state = {
      startTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    }
    if (this.props.staffs && this.props.staffs.length) {
      this.state = {
        staffUserId: this.props.staffs[0].id
      }
    } else {
      this.state = {
        staffUserId: 0
      }
    }
  }

  selectHandle = (option) => {
    console.log(option.target.value);
    this.setState({
      station: option.target.value
    });
  }

  selectStaffHandle = (option) => {
    console.log(option.target.value);
    this.setState({
      staffUserId: option.target.value
    });
  }

  changeStartDate = (date) => {
    console.log(moment(date).format("YYYY-MM-DD HH:mm:ss"));
    this.setState({
      startTime: moment(date).format("YYYY-MM-DD HH:mm:ss")
    });
  }
  changeEndDate = (date) => {
    console.log(moment(date).format("YYYY-MM-DD HH:mm:ss"));
    this.setState({
      endTime: moment(date).format("YYYY-MM-DD HH:mm:ss")
    });
  }

  handleClick = () => {
    const conditions = {
      "user_id": this.props.uid,
      station: this.station.value,
      applyUserId: this.state.staffUserId,
      starttime: this.state.startTime,
      endtime: this.state.endTime,
      recordContent: this.fault.value
    }
    this.props.searchClick(conditions);
  }

  componentWillUnmount() {
    this.props.exitSearch();
  }

  render() {
    return (<div>
              {/*<Panel header={"查询条件"} bsStyle="primary" />*/}
              {/*<div className="panel panel-primary"><text className="panel-heading">查询条件</text></div>*/}
              <div className="panell panell-primary">
                <text className="panell-heading">
                  查询条件
                </text>
                <button className="floatrr btnn btn-primary " onClick={this.props.exitSearch.bind(this)}>
                  返回列表
                </button>
              </div>
              <div>
                <Form horizontal>
                  <FormGroup controlId="formBasicText">
                    <Col componentClass={ControlLabel} sm={2}> 车站
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" inputRef={ref => this.station = ref} placeholder="输入信息" />
                    </Col>
                  </FormGroup>
                  {/*<FormGroup controlId="formControlsSelect"><Col componentClass={ControlLabel} sm={2}> 车站</Col><Col sm={10}><FormControl componentClass="select" placeholder="输入信息" onChange={this.selectHandle.bind(this)}>{this.props.list && this.props.list.map((station, key) => {return (<option key={key} value={station.id}>{station.name}</option>)})}{!this.props.list.length && <option key={0} value={0}>无可选项</option>}</FormControl></Col></FormGroup>*/}
                  <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={2}> 报修人
                    </Col>
                    <Col sm={10}>
                    <FormControl componentClass="select" placeholder="输入信息" onChange={this.selectStaffHandle.bind(this)}>
                      {this.props.staffs && this.props.staffs.map((staff, key) => {
                         return (<option key={key} value={staff.id}>
                                   {staff.name}
                                 </option>)
                       })}
                      {!this.props.staffs && <option key={0} value={0}>
                                               无可选项
                                             </option>}
                    </FormControl>
                    </Col>
                  </FormGroup>
                  {/* <FormGroup controlId="formBasicText"> <Col componentClass={ControlLabel} sm={2}> 报修人</Col><Col sm={10}><FormControl type="text" inputRef={ref => this.staffUserId = ref} placeholder="输入信息" /></Col></FormGroup>*/}
                  <FormGroup controlId="formBasicText">
                    <Col componentClass={ControlLabel} sm={2}> 报修时间
                    </Col>
                    <Col sm={5}>
                    <DateTime locale="fr-ca" dateFormat="YYYY-MM-DD" inputProps={{ placeholder: "开始时间" }} onChange={this.changeStartDate.bind(this)} />
                    </Col>
                    <Col offset={2} sm={5}>
                    <DateTime locale="de" dateFormat="YYYY-MM-DD" inputProps={{ placeholder: "结束时间" }} onChange={this.changeEndDate.bind(this)} />
                    {/*<FormControl type="text" inputRef={ref => this.start = ref} placeholder="开始时间" /><FormControl type="text" inputRef={ref => this.end = ref} placeholder="结束时间" />*/}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                    <Col componentClass={ControlLabel} sm={2}> 故障描述
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" componentClass="textarea" inputRef={ref => this.fault = ref} placeholder="输入信息" />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
              <div>
                <ButtonGroup vertical block>
                  <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>
                    查询
                  </Button>
                </ButtonGroup>
              </div>
              {/*<div><ButtonGroup vertical block><Button bsStyle="primary" onClick={this.props.exitSearch.bind(this)}>返回 </Button></ButtonGroup></div>*/}
            </div>);
  }

}
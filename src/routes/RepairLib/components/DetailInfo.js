import React, { Component, PropTypes } from "react";
import { Table, Panel, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class DetailInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.exitCheck();
  }

  returnClick = () => {
    this.props.exitCheck();
  }

  render() {
    let detailInfo = [];
    if (this.props.detailInfo) {
      detailInfo = this.props.detailInfo;
    }
    console.log(detailInfo);
    return (
      <Grid>
        <Row>
          {/*<Button bsStyle="primary" onClick={this.returnClick}>返回</Button>*/}
          {/*<Panel header={"详细信息"} bsStyle="primary" />*/}
          {/*<div className="panel panel-primary"><text className="panel-heading">详细信息</text></div>*/}
          <div className="panell panell-primary">
            <text className="panell-heading">
              详细信息
            </text>
            <button className="floatrr btnn btn-primary" onClick={this.props.exitCheck.bind(this)}>
              返回列表
            </button>
          </div>
        </Row>
        <Row>
          <Form horizontal>
            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}> 国家
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.country} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 城市
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.city} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 线路
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.line} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 站点
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.station} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 设备类型
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.deviceType} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 设备编号
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.device_info.deviceCode} disabled/>
              </Col>
            </FormGroup>
            {/*<FormGroup controlId="formControlsTextarea"><Col componentClass={ControlLabel} sm={2}> 模块编码</Col><Col sm={10}><FormControl type="text" value="" disabled/></Col></FormGroup>*/}
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 现象描述
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={detailInfo.recordContent} disabled/>
              </Col>
            </FormGroup>
            {/* <FormGroup controlId="formControlsTextarea"> <Col componentClass={ControlLabel} sm={2}> 故障模块</Col><Col sm={10}><FormControl type="text" value="" disabled/></Col></FormGroup>*/}
            {/*<FormGroup controlId="formControlsTextarea"><Col componentClass={ControlLabel} sm={2}> 是否认领</Col><Col sm={10}><FormControl type="text" value="" disabled/></Col></FormGroup>*/}
            {/*<FormGroup controlId="formControlsTextarea"><Col componentClass={ControlLabel} sm={2}> 故障确认</Col><Col sm={10}><FormControl type="text" value="" disabled/></Col></FormGroup>*/}
            {/*<FormGroup controlId="formControlsTextarea"><Col componentClass={ControlLabel} sm={2}> 故障原因</Col><Col sm={10}><FormControl type="text" value="" disabled/></Col></FormGroup>*/}
          </Form>
        </Row>
        {/*<Row><ButtonGroup vertical block><Button bsStyle="primary" onClick={this.props.exitCheck.bind(this)}>返回</Button></ButtonGroup></Row>*/}
      </Grid>);

  }
}
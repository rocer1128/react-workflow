import React, { Component, PropTypes } from "react";
import { Table, Panel, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export default class DetailInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const info = this.props.detailInfo;
    return (
      <Grid>
        <Row>
          {/*<Button bsStyle="primary" onClick={this.returnClick}>返回</Button>*/}
          {/*<Panel header={"维修记录明细"} bsStyle="primary" />*/}
          <div className="panell panell-primary">
            <text className="panell-headinggl">
              维修记录明细
            </text>
            <button className="floatrr btnn btn-primary " onClick={this.props.exitCheck.bind(this)}>
              返回列表
            </button>
          </div>
        </Row>
        <Row>
          <Form horizontal>
            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}> 设备类型
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.id} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 位置
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.deviceId[1]} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formBasicText">
              <Col componentClass={ControlLabel} sm={2}> 故障模块
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.repairParts} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 故障描述
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 故障原因
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.faultReason[1]} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 报修人
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.userId[1]} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 故障类型
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 处理措施
              </Col>
              <Col sm={10}>
              <FormControl type="text" value={info.solutions} disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 是否更换条件
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 是否延迟
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 延迟原因
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 维修人
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 维修起始时间
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 维修结束时间
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}> 备注
              </Col>
              <Col sm={10}>
              <FormControl type="text" value="" disabled/>
              </Col>
            </FormGroup>
          </Form>
        </Row>
        {/*<Row><ButtonGroup vertical block><Button bsStyle="primary" onClick={this.props.exitCheck.bind(this)}>返回</Button></ButtonGroup></Row>*/}
      </Grid>);

  }
}
import React, { Component, PropTypes } from "react";
import { Button, FormGroup, FormControl, Form, Col, ControlLabel, Panel } from "react-bootstrap";
import { browserHistory } from "react-router";

export default class Repair extends Component {
  /**
   * 构造函数
   * 用于定义state
   */
  constructor(props) {
    super(props);
    this.state = {
      viewName: "model",
      buttonCondition: true, // 设置button状态
    };
  }

  componentDidMount() {
    const uid = this.props.auth.user;
    wx.ready(() => {
      document.querySelector("#scanQRCode").onclick = function () {
        wx.scanQRCode({
          needResult: 1,
          desc: "scanQRCode desc",
          success(res) {
            // console.log(JSON.stringify(res.resultStr));
            // console.log(uid);
            browserHistory.push(`/deviceinfo?user_id=${uid}&code=${res.resultStr}`);
          },
        });
      };
    });
    wx.error((res) => {
      alert(res.errMsg);
    });
  }

  repair = () => {
    const uid = this.props.auth.user;
    // console.log(uid, this.code.value);
    browserHistory.push(`/deviceinfo?user_id=${uid}&code=${this.code.value}`);
  };

  render() {
    return (
      <div>
        <Panel header={"设备故障报修"} bsStyle="primary" />
        <div style={{ textAlign: "center", verticalAlign: "middle", marginTop: 100 }}>
          <div>
            <Button bsStyle="primary" id="scanQRCode">
              二维码报修
            </Button>
          </div>
          <Form>
            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}>
                {" "} 输入编码
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="报修设备编码" inputRef={ref => (this.code = ref)} />
              </Col>
            </FormGroup>
          </Form>
          <div>
            <Button bsStyle="primary" onClick={this.repair}>
              设备编码报修
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

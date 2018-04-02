import React, { Component, PropTypes } from "react";
import { Table, Panel, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { browserHistory } from "react-router";

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  searchClick = () => {
    const num = this.num.value;
    this.props.searchByNum(num);
  }

  componentDidMount() {
    const getDeviceInfo = this.props.searchByNum;
    wx.ready(function () {
      document.querySelector("#scanQRCode1").onclick = function () {
        wx.scanQRCode({
          needResult: 1,
          desc: "scanQRCode desc",
          success: function (res) {
            console.log(JSON.stringify(res));
            getDeviceInfo("AFC-001");
          // this.searchClick.bind(this);
          }
        });
      };
    })
    wx.error(function (res) {
      alert(res.errMsg);
    })
  }

  render() {
    return (
      <div>
        <div className="panell panell-primary">
          <text className="panell-heading">
            查询设备维修记录
          </text>
        </div>
        <div style={{ textAlign: "center", verticalAlign: "middle", marginTop: 100 }}>
          <div>
            <Button bsStyle="primary" id="scanQRCode1">
              扫码查询维修记录
            </Button>
          </div>
          <Form>
            <FormGroup controlId="formControlsText">
              <Col componentClass={ControlLabel} sm={2}> 输入编码
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="编码" inputRef={ref => (this.num = ref)} />
              </Col>
            </FormGroup>
          </Form>
          <div>
            <Button bsStyle="primary" onClick={this.searchClick.bind(this)}>
              输码查询维修记录
            </Button>
          </div>
        </div>
      </div>)
  }
}
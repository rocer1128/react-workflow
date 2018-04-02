import React, { Component, PropTypes } from "react";
import "./Home.scss";
import { Button, Form, FormGroup, Col, FormControl, Glyphicon, ControlLabel, Jumbotron } from "react-bootstrap";
import { browserHistory } from "react-router";
import logoImage from "../assets/logo.png";
import DesignerPage from "../../Workbench/components/DesignerPage";
import * as types from "components/ComGroup/coms/types";
import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";
import { ERROR_TYPES } from "components/Common/ErrorConstant";

export default class Home extends Component {
  static contextTypes = {
    location: PropTypes.object,
    registerNotifiaction: PropTypes.func,
    unregisterNotifiaction: PropTypes.func,
    wechatLogin: PropTypes.func,
    QLogin: PropTypes.func,
  }

  componentWillMount() {
    if (this.props.location && Object.keys(this.props.location.query).length) {
      this.props.QLogin(this.props.location.query);
    }
  }
  login(event) {
    event.preventDefault();
    this.props.login(this.username.value, this.password.value);
  }

  /*wechatLogin(event) {
    event.preventDefault();
    this.props.QLogin(this.props.location.query);
  // window.location.href = "http://116.90.82.49/wechat/post_login?back_uri=http://116.90.82.49/wechat/post_login";
  }*/

  componentWillReceiveProps(nextProps) {
    console.log("nextProps:::", nextProps);
    if (nextProps.auth.operationState === true && nextProps.auth.user) {
      this.props.loginFinish();
      if (nextProps.auth.wechat) {
        browserHistory.push(nextProps.auth.back_uri);
      } else {
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS|Android 
          browserHistory.push("/gis");
        } else { // pc
          browserHistory.push("/gis");
        }
      }
      this.context.unregisterNotifiaction();
    } else if (nextProps.auth.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.auth.error.code], "");
      this.props.loginFinish();
    }

  }

  render() {
    const { user, loginError } = this.props.auth
    return (
      <div className="container-fluid">
        <div className="masthead">
          <div className="logo">
            <p>
              <img src={logoImage} />
            </p>
          </div>
          <h1>Smart Cell</h1>
        </div>
        {!user &&
         <Form horizontal>
           <FormGroup controlId="fromUsername">
             <Col componentClass={ControlLabel} sm={4}>
               用户名
             </Col>
             <Col sm={4}>
               <FormControl type="text" inputRef={ref => this.username = ref} placeholder="用户名" />
             </Col>
           </FormGroup>
           <FormGroup controlId="formPassword">
             <Col componentClass={ControlLabel} sm={4}>
               密码
             </Col>
             <Col sm={4}>
               <FormControl type="password" inputRef={ref => this.password = ref} placeholder="密码" />
             </Col>
           </FormGroup>
           <FormGroup>
             <Col smOffset={4} sm={4}>
               <Button type="submit" bsStyle="success" onClick={this.login.bind(this)}>
                 <Glyphicon glyph="star" />登录
               </Button>
               {/*<Button type="submit" bsStyle="success" onClick={this.wechatLogin.bind(this)}><Glyphicon glyph="star" />微信登录</Button>*/}
             </Col>
           </FormGroup>
         </Form>}
        {user &&
         <Jumbotron>
           <p>
             您已经登录过了，用户名：
             {user.name}
           </p>
           <p>
             <Button bsStyle="danger" onClick={this.props.logout.bind(this)}>
               退出
             </Button>
           </p>
         </Jumbotron>}
      </div>
    )
  }
}



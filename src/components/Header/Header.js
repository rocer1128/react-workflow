import React, { Component, PropTypes } from "react";
import { IndexLink, Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { browserHistory } from "react-router";
import "./Header.scss";

export default class Header extends Component {

  static contextTypes = {
    unregisterNotifiaction: PropTypes.func,
  }
  constructor(props) {
    super(props)
  }

  handleLogout() {
    this.context.unregisterNotifiaction();
    this.props.logout();
    this.props.clearCurrentObject();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.user && !nextProps.auth.user) {
      browserHistory.push("/");
    }
  }

  render() {
    if (this.props.location.pathname === "/projectMonitor" || this.props.location.pathname === "/realTimePage" || this.props.location.pathname === "/storedprogramcontrol") {
      return (<div className="container-fluid">
                <Navbar fixedTop fluid>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <IndexLink activeStyle={{ color: "#33e0ff" }}>
                        <div className="brand" />
                        <span>smartcell</span>
                      </IndexLink>
                    </Navbar.Brand>
                  </Navbar.Header>
                </Navbar>
              </div>);
    }
    const { user } = this.props.auth;
    return (
      <div className="container-fluid">
        <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: "#33e0ff" }}>
                <div className="brand" />
                <span>smartcell</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {user &&
           <Navbar.Collapse>
             <Nav navbar>
               {this.props.workbench && this.props.workbench.currentObject != null &&
                <LinkContainer to={{ pathname: "/workbench" }}>
                  <NavItem eventKey={1}>
                    {this.props.workbench.currentObject.name}
                  </NavItem>
                </LinkContainer>}
               {this.props.workbench && this.props.workbench.type === "project" && this.props.workbench.currentObject != null &&
                <NavDropdown eventKey={2} title="调试" id="debug">
                  <LinkContainer to={{ pathname: "/test", query: { type: "localTest" } }}>
                    <MenuItem eventKey={2.1}>
                      本地调试
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to={{ pathname: "/test", query: { type: "onLineTest" } }}>
                    <MenuItem eventKey={2.2}>
                      在线调试
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to="/equipmentTest">
                    <MenuItem eventKey={2.3}>
                      就近调试
                    </MenuItem>
                  </LinkContainer>
                </NavDropdown>}
               {this.props.workbench && this.props.workbench.type === "project" && this.props.workbench.currentObject != null &&
                <NavDropdown eventKey={3} title="数据" id="data">
                  <LinkContainer to={{ pathname: "/datasource", query: { id: this.props.workbench.currentObject.id } }}>
                    <MenuItem eventKey={3.1}>
                      数据源
                    </MenuItem>
                  </LinkContainer>
                  <MenuItem divider />
                  <LinkContainer to={{ pathname: "/datalink", query: { id: this.props.workbench.currentObject.id } }}>
                    <MenuItem eventKey={3.2}>
                      数据联动
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to={{ pathname: "/workbench", query: { from: "toolbar", view: "data", type: "scriptedit" } }}>
                    <MenuItem eventKey={3.3}>
                      设置脚本
                    </MenuItem>
                  </LinkContainer>
                  <LinkContainer to={{ pathname: "/workbench", query: { from: "toolbar", view: "data", type: "eventedit" } }}>
                    <MenuItem eventKey={3.4}>
                      编辑事件
                    </MenuItem>
                  </LinkContainer>
                </NavDropdown>}
               <NavDropdown eventKey={4} title="工具" id="tools">
                 <LinkContainer to="/resource">
                   <MenuItem eventKey={4.1}>
                     资源
                   </MenuItem>
                 </LinkContainer>
                 <LinkContainer to="/widget">
                   <MenuItem eventKey={4.2}>
                     组件
                   </MenuItem>
                 </LinkContainer>
               </NavDropdown>
               <LinkContainer to={{ pathname: "/gis" }}>
                 <NavItem eventKey={8}>
                   GIS地图
                 </NavItem>
               </LinkContainer>
               <LinkContainer to={{ pathname: "/calender" }}>
                 <NavItem eventKey={9}>
                   日历
                 </NavItem>
               </LinkContainer>
               <LinkContainer to={{ pathname: "/repair" }}>
                 <NavItem eventKey={13}>
                   设备报修
                 </NavItem>
               </LinkContainer>
               <NavDropdown eventKey={13} title="设备维修" id="tools">
                 <LinkContainer to="/repairdevice">
                   <MenuItem eventKey={13.1}>
                     任务分配
                   </MenuItem>
                 </LinkContainer>
                 <LinkContainer to="/repairlist">
                   <MenuItem eventKey={13.2}>
                     维修列表
                   </MenuItem>
                 </LinkContainer>
               </NavDropdown>
               <LinkContainer to={{ pathname: "/repairlib" }}>
                 <NavItem eventKey={13}>
                   报修库
                 </NavItem>
               </LinkContainer>
               <LinkContainer to={{ pathname: "/servicelib" }}>
                 <NavItem eventKey={13}>
                   维修库
                 </NavItem>
               </LinkContainer>
               {/*this.props.workbench && this.props.workbench.currentObject != null &&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <LinkContainer to={{ pathname: "/oscilloscope" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <NavItem eventKey={5}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      示波器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </NavItem>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </LinkContainer>*/}
             </Nav>
             <Nav navbar pullRight>
               <LinkContainer to="/project">
                 <NavItem eventKey={11}>
                   {user.name} 的工程
                 </NavItem>
               </LinkContainer>
               <NavItem eventKey={12} onClick={this.handleLogout.bind(this)}>
                 退出
               </NavItem>
             </Nav>
           </Navbar.Collapse>}
        </Navbar>
      </div>
    )
  }
}
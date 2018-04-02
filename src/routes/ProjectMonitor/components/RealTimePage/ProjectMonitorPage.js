import React, { Component, PropTypes } from "react";
import { Tabs, Tab, Modal, Button, Row, Col } from "react-bootstrap";
import { LEVEL_TYPES, ALERT_TYPES1, ALERT_TYPES2 } from "components/Common/ComponentConstant";
import moment from "moment";
import _ from "lodash";
import Runtimer from "components/CellsArt/Runtimer";
import NotificationSystem from "react-notification-system";
import NotificationButton from "./NotificationButton";

export default class ProjectMonitorPage extends Component {
  static propTypes = {
    dataSource: PropTypes.object, // 数据源点信息
    setData: PropTypes.func.isRequired,
    alertSource: PropTypes.object,
    setAlert: PropTypes.func.isRequired,
    alerts: PropTypes.object,
    pages: PropTypes.array,
    pKey: PropTypes.number.isRequired,
    setDevice: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dataSource: null, // 不是isrequire的变量设置默认值
    pages: null,
    alertSource: null,
    alerts: null,
  };

  static childContextTypes = {
    handleSelect: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentAlert: null,
      alerts: null,
      isShowAlerts: false,
      key: this.props.pKey,
    };
  }
  getChildContext() {
    return {
      handleSelect: (key) => this.handleSelect(key),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { alerts } = nextProps;
    if (alerts && !_.isEqual(alerts, this.state.alerts)) {
      this.setState({
        alerts,
      });
      this.registerNotifiaction(alerts);
    }
  }

  registerNotifiaction(alerts) {
    const uid = `uid${alerts.alert_type}${alerts.data_node_id}${alerts.level}`;
    let level = null;
    switch (alerts.level) {
      case 1:
        level = "error";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "success";
        break;
      case 4:
        level = "info";
        break;
      default:
        return;
    }
    this.notificationMonitor.addNotification({
      title: `${alerts.data_node_name}${LEVEL_TYPES[alerts.level]}`,
      level,
      position: "bc",
      autoDismiss: 0,
      dismissible: false,
      uid,
      children: (
      <div style={{ marginRight: 20, float: "right" }}>
        <NotificationButton alerts={alerts} level={level === "error" ? "danger" : level} notificationMonitor={this.notificationMonitor} uid={uid} showAlerts={this.showAlerts} />
      </div>
      ),
    });
  }

  showAlerts = (alerts) => {
    this.setState({
      isShowAlerts: true,
      currentAlert: alerts,
    });
  }

  closeAlerts = () => {
    this.setState({
      isShowAlerts: false,
    });
  }

  unregisterNotifiaction() {
    this.notificationMonitor.clearNotifications();
  }

  showNotifiactioninfo = (alerts) => {
    const ALERT_TYPES = {};
    Object.assign(ALERT_TYPES, ALERT_TYPES1, ALERT_TYPES2);

    if (alerts) {
      return (<div style={{ marginTop: "5px" }}>
                <Row>
                  <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据点名称：
                  </Col>
                  <Col xs={7} style={{ marginTop: 8 }}>
                  {alerts.data_node_name}
                  </Col>
                </Row>
                <Row>
                  <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 报警级别：
                  </Col>
                  <Col xs={7} style={{ marginTop: 8 }}>
                  {LEVEL_TYPES[alerts.level]}
                  </Col>
                </Row>
                <Row>
                  <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 报警信息：
                  </Col>
                  <Col xs={7} style={{ marginTop: 8 }}>
                  {alerts.alert_info}
                  </Col>
                </Row>
                <Row>
                  <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 报警类型：
                  </Col>
                  <Col xs={7} style={{ marginTop: 8 }}>
                  {ALERT_TYPES[alerts.alert_type]}
                  </Col>
                </Row>
                <Row>
                  <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 报警时间：
                  </Col>
                  <Col xs={7} style={{ marginTop: 8 }}>
                  {moment(alerts.alert_time).format("YYYY-MM-DD HH:mm:ss")}
                  </Col>
                </Row>
              </div>);
    }
  }

  handleSelect = (key) => {
    this.setState({
      key,
    });
  }

  render() {
    const Notifiactioninfo = this.showNotifiactioninfo(this.state.currentAlert);
    let tabItems = {};
    let dataSource = {};
    const style = {
      Containers: {
        DefaultStyle: {
          width: 600,
          zIndex: 999,
        },
      },
      Title: {
        DefaultStyle: {
          float: "left",
        },
      },
      NotificationItem: {
        DefaultStyle: {
          overflow: "hidden",
        },
      },
    };
    if (this.props.pages) {
      tabItems = this.props.pages.map((item, index) => {
        return (
          <Tab key={index} eventKey={parseInt(item.id, 10)} title={item.name}>
            <div className={this.props.auth.user.permission ? "popWindow" : ""} />
            <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Runtimer
                width={item.data.styles.width}
                height={item.data.styles.height}
                viewBox={item.data.styles.viewBox}
                pageId={item.id}
                objects={item.data.objects}
                dataSource={this.props.dataSource}
                setData={this.props.setData}
                submitForm={this.props.submitForm}
                setDevice={this.props.setDevice}
                alertSource={this.props.alertSource}
                setAlert={this.props.setAlert}
              />
            </div>
          </Tab>
        )
      });
    }
    return (
      <div>
        {this.props.pages && this.props.dataSource && <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                                                        {tabItems}
                                                      </Tabs>}
        <Modal show={this.state.isShowAlerts} onHide={this.closeAlerts}>
          <Modal.Header closeButton>
            <Modal.Title>
              详细信息
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Notifiactioninfo}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.closeAlerts}>
              确定
            </Button>
          </Modal.Footer>
        </Modal>
        <NotificationSystem ref={ref => (this.notificationMonitor = ref)} style={style} />
      </div>
      );
  }
}

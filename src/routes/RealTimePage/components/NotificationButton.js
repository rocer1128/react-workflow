import React, { Component, PropTypes } from "react";
import { Button } from "react-bootstrap";

export default class NotificationButton extends Component {
  static propTypes = {
    alerts: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    showAlerts: PropTypes.func.isRequired,
    notificationMonitor: PropTypes.object.isRequired,
  }
  onShow = () => {
    this.props.showAlerts(this.props.alerts);
    this.props.notificationMonitor.removeNotification(
      this.props.uid,
    );
  }

  render() {
    return (
      <Button bsStyle={this.props.level} bsSize="xsmall" onClick={this.onShow}>
        详细信息
      </Button>
      );
  }
}

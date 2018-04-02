import React, { Component, PropTypes } from "react";
import "./CoreLayout.scss";
import "../../styles/core.scss";

import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";

import NotificationSystem from "react-notification-system";

export default class CoreLayoutNoHeader extends Component {
  static childContextTypes = {
    registerNotifiaction: PropTypes.func,
    unregisterNotifiaction: PropTypes.func,
  }

  getChildContext() {
    return {
      registerNotifiaction: this.registerNotifiaction.bind(this),
      unregisterNotifiaction: this.unregisterNotifiaction.bind(this),
    };
  }

  registerNotifiaction(level, message, key) {
    let autoDismiss = 3;
    if (level === OPERATION_LEVEL_ERROR) {
      autoDismiss = 0;
      message = "错误信息：" + message;
    } else {
      message = key + message + "成功";
    }
    this.notificationSystem.clearNotifications();
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      position: "br",
      autoDismiss: autoDismiss,
      onRemove: function () {}
    });
  }

  unregisterNotifiaction() {
    this.notificationSystem.clearNotifications();
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <div className="container-fluid">
        {children}
        <NotificationSystem ref={ref => {
                                   this.notificationSystem = ref
                                 }} />
      </div>);
  }
}
import React, { Component, PropTypes } from "react";
import __ from "lodash";
import Cell from "../ComGroup/coms/Cell";
import { GetObjectAttributes, GetMenus, GetEvents, GetBinds, IsFunc, IsObject } from "components/Common/CommonUtil";

const RT = (Com) => class extends Component {
  static contextTypes = {
    getRef: PropTypes.func,
    dataSource: PropTypes.object,
    setData: PropTypes.func,
    getSelectedIndex: PropTypes.func,
    setSelectedIndex: PropTypes.func,
    getOptDataNodeId: PropTypes.func,
    setOptDataNodeId: PropTypes.func,
    alertSource: PropTypes.object,
    setAlert: PropTypes.func,
    setDevice: PropTypes.func,
    submitForm: PropTypes.func,
    handleSelect: React.PropTypes.func,
    setRef: React.PropTypes.func,

  };

  static childContextTypes = {
    ref: React.PropTypes.func,
  };

  getChildContext() {
    return {
      ref: (id) => this.ref(id),

    };
  }

  constructor(props) {
    super(props);
    const { events, binds, menus } = this.props;

    this.events = GetEvents(this.props, this);
    this.binds = GetBinds(this);
    if (menus) {
      this.menus = GetMenus(this);
    }
  }

  data(key) {
    return this.context.dataSource[key];
  }

  // getData(key) {
  //   const channelIdArrs = Object.keys(this.context.dataSource);
  //   const dataNodeIdArrs = Object.values(this.context.dataSource);
  //   const index = dataNodeIdArrs.indexOf(key);
  //   console.log("RT---------------", channelIdArrs[index]);
  //   return parseInt(channelIdArrs[index]);
  // }

  alert(key) {
    this.alertId = key;
    return this.context.alertSource[key];
  }

  setData = (key, value) => {
    this.context.setData(key, value);
  }

  setDevice = (key) => {
    this.context.setDevice(key);
  }

  submitForm = (...args) => {
    this.context.submitForm(...args);
  }

  setAlert = () => {
    this.context.setAlert(this.context.getOptDataNodeId(), 1);
    return this;
  }

  yk(value) {
    console.log("yk", value);
    if (this.context.getSelectedIndex()) {
      const key = this.context.getRef(this.context.getSelectedIndex()).ykId;
      if (key) {
        this.context.setData(key, value);
      }
    }
    return this;
  }

  clearAlert(value) {
    if (this.context.getSelectedIndex()) {
      const key = this.context.getRef(this.context.getSelectedIndex()).alertId;
      if (key) {
        this.context.setAlert(key, value);
      }
    }
    return this;
  }

  setSelected() {
    this.context.setSelectedIndex(this.props.id);
  }

  bindDataNode(id) {
    this.ykId = id;
    this.context.setOptDataNodeId(id);
  }

  clearSelected() {
    this.context.setSelectedIndex(null);
  }

  clearBindedCHN() { // 解除与示波器通道的绑定
    this.context.setChannelId(null);
  }

  clearBindedDN() {
    this.context.setOptDataNodeId(null);
  }

  clearAll() {
    this.clearSelected();
    this.clearBindedDN();
  }
  clearChannel() {
    this.context.setChannelId(null);
  }

  isSelected() {
    return this.props.id === this.context.getSelectedIndex();
  }

  isBindedDN() {
    return this.context.getOptDataNodeId() !== null ? true : false;
  }

  // setRef = (id, ref) => {
  //   this.context.setRef(id, ref);
  // }

  ref(id) {
    if (this.context.getRef(id) && this.context.getRef(id).self) {
      return this.context.getRef(id).self;
    }
  }

  runCode(expr) {
    if (!__.isFunction(expr)) {
      return expr;
    } else {
      return expr.call(this);
    }
  }

  changeTab(value) {
    if (this.context.handleSelect) {
      this.context.handleSelect(value);
    }
  }

  render() {
    const { styles, events, binds, objects, ...rest } = this.props;
    const bounds = __.mapValues(this.binds, attr => {
      if (__.isArray(attr)) {
        return attr.map(item => this.runCode(item));
      } else if (IsObject(attr)) {
        return __.mapValues(attr, item => this.runCode(item));
      } else {
        return this.runCode(attr);
      }
    });

    const attrs = GetObjectAttributes(this.props, bounds);
    if (attrs.data) {
      this.comData = attrs.data;
    }

    if (Com === Cell) {
      return (<Com {...rest} ref={ref => this.self = ref} objects={objects} refHandler={this.events} {...attrs} />);
    } else {
      return (<Com {...rest} ref={ref => this.self = ref} menus={this.menus} refHandler={this.events} {...attrs} />);
    }
  }
};

export default RT;

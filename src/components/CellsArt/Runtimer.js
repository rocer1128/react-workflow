import React, { Component } from "react";
import __ from "lodash";
import * as types from "../ComGroup/coms/types";
import RT from "./RT";
import dependencies from "./Dependencies";

export default class Runtimer extends Component {

  state = {
    objectRefs: [],
    objects: null,
    selectedIndex: null,
    optDataNodeId: null,
    optChannelId: null,
  }

  static childContextTypes = {
    getRef: React.PropTypes.func,
    setRef: React.PropTypes.func,
    dataSource: React.PropTypes.object,
    setData: React.PropTypes.func,
    alertSource: React.PropTypes.object,
    setAlert: React.PropTypes.func,
    setDevice: React.PropTypes.func,
    submitForm: React.PropTypes.func,

    getSelectedIndex: React.PropTypes.func,
    setSelectedIndex: React.PropTypes.func,
    getOptDataNodeId: React.PropTypes.func,
    setOptDataNodeId: React.PropTypes.func,

    sendBindMsg: React.PropTypes.func,
    sendUnbindMsg: React.PropTypes.func,

    data: React.PropTypes.object,
    get: React.PropTypes.func,
    register: React.PropTypes.func,
  };

  static defaultProps = {
    viewBox: "0 0 800 600",
    width: "100%",
    height: "100%"
  }

  getChildContext() {
    return {
      ...dependencies,
      getRef: (id) => this.state.objectRefs[id],
      setRef: (id, ref) => this.state.objectRefs[id] = ref,
      dataSource: this.props.dataSource,
      setData: (key, value) => this.props.setData(key, value),
      sendBindMsg: (dataNodeId, channelId) => this.props.sendBindMsg(dataNodeId, channelId),
      sendUnbindMsg: (dataNodeId, channelId) => this.props.sendUnbindMsg(dataNodeId, channelId),
      getSelectedIndex: () => this.state.selectedIndex,
      setSelectedIndex: (selectedIndex) => this.setState({
        selectedIndex
      }),
      getOptDataNodeId: () => this.state.optDataNodeId,
      setOptDataNodeId: (optDataNodeId) => this.setState({
        optDataNodeId
      }),
      alertSource: this.props.alertSource,
      setAlert: (key, value) => this.props.setAlert(key, value),
      setDevice: (key) => {
        return this.props.setDevice(key)
      },
      submitForm: (...args) => this.props.submitForm(this.props.pageId, ...args)
    }
  }

  renderObjects(objects) {
    return objects.map((item, index) => {
      const { tag, id, ...rest } = item;
      const Type = RT(types[tag]);
      return <Type id={id} ref={ref => this.state.objectRefs[id] = ref} key={index} {...rest} />;
    });

  }

  componentWillMount() {
    if (this.state.objects === null) {
      this.setState({
        objects: this.renderObjects(this.props.objects),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!__.isEqual(this.props.objects, nextProps.objects)) {
      this.setState({
        objects: this.renderObjects(nextProps.objects),
      });
    }
  }

  render() {
    const { viewBox, width, height } = this.props;
    return (
      <svg width={width} height={height} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        {this.state.objects}
      </svg>

      );
  }

}

import React, { Component } from "react";
import style from "./DataSourcePanel.scss"
import __ from "lodash";

import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/textmate";

import TreeView from "./TreeView";

import { LEVEL_TYPES } from "components/Common/ComponentConstant";

export default class DataSourcePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      dataSourceMap: null,
      formatJson: "",
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    if (this.props.type === "project") {
      this.setState({
        dataSourceMap: this.props.dataSourceMap,
        formatJson: this.formatJson(this.props.dataSourceMap, this.props.alertSource, this.props.type),
      })
    }
  }

  handleEditorChange(newValue) {
    this.setState({
      formatJson: newValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type != "project") {
      const data = this.mergeDsMapDpList(nextProps.dataSourceMap, nextProps.dataSource);
      this.setState({
        formatJson: this.formatJson(data, nextProps.alertSource, nextProps.type),
        dataSource: nextProps.dataSource,
        dataSourceMap: nextProps.dataSourceMap,
      });
    }
  }

  mergeDsMapDpList = (dsMap, dpList) => {
    if (dsMap && dpList) {
      dsMap.map((item, index) => {
        item.nodes.map((node, nodeIndex) => {
          if (node.data_node_id in dpList) {
            node["value"] = dpList[node.data_node_id];
          }
        });
      });
    }
    return dsMap;
  }

  handleBlur() {
    if (this.props.type === "localTest") {
      let changeData = {};
      let changeAlert = {};
      const dataSourceMap = this.state.dataSourceMap;
      for (var item in dataSourceMap) {
        const source = dataSourceMap[item];
        for (var subItem in source.nodes) {
          const node = source.nodes[subItem];
          changeData[node.data_node_id] = this.findChangeValue(source.data_source_name, node.data_node_name).value;
          changeAlert[node.data_node_id] = this.findChangeValue(source.data_source_name, node.data_node_name).alert;
        }
      }
      this.props.onChange(changeData, changeAlert);
    }
  }

  findChangeValue(dataSourceName, dataNodeName) {
    const formatJson = JSON.parse(this.state.formatJson);
    for (var item in formatJson) {
      if (dataSourceName === item) {
        for (var subItem in formatJson[item]) {
          if (subItem === dataNodeName) {
            return formatJson[item][subItem];
          }
        }
      }
    }
  }

  isEmptyObject = (obj) => {
    for (let o in obj) {
      return false;
    }
    return true;
  }

  formatJson = (mergeData, alertSource, type) => {
    if (!mergeData || mergeData.length == 0) {
      return "";
    }
    let param = {};
    mergeData.map((item, index) => {
      let subParam = {};
      item.nodes.map((subItem, subIndex) => {
        subParam[subItem.data_node_name] = {};
        subParam[subItem.data_node_name].id = subItem.data_node_id;
        subParam[subItem.data_node_name].value = 0;
        if (subItem.value) {
          subParam[subItem.data_node_name].value = subItem.value;
        }
        if (alertSource && !this.isEmptyObject(alertSource)) {
          if (type === "localTest") {
            subParam[subItem.data_node_name].alert = alertSource[subItem.data_node_id];
          } else {
            subParam[subItem.data_node_name].alert = LEVEL_TYPES[alertSource[subItem.data_node_id]];
          }
        }
      });
      param[item.data_source_name] = subParam;
    });
    return JSON.stringify(param, null, 2);
  }

  formatReadOnlyJson = (formatJson) => {
    let treeData = [];
    if (formatJson === "") {
      return treeData;
    }
    const dataJson = JSON.parse(formatJson);
    for (let item in dataJson) {
      let singleTreeData = {
        text: item,
        nodes: [],
      };
      for (let subItem in dataJson[item]) {
        let subNode = {
          text: subItem,
          nodes: [],
        };
        singleTreeData.nodes.push();
        for (let subSubItem in dataJson[item][subItem]) {
          subNode.nodes.push({
            text: subSubItem + ":" + dataJson[item][subItem][subSubItem]
          });
        }
        singleTreeData.nodes.push(subNode);
      }
      treeData.push(singleTreeData);
    }
    return treeData;
  }

  render() {
    if (this.props.type === "localTest") {
      return (<div className="jt_container">
                <AceEditor
                  mode="json"
                  theme="textmate"
                  fontSize="12px"
                  tabSize={2}
                  name="refTextarea"
                  value={this.state.formatJson}
                  onChange={this.handleEditorChange}
                  readOnly={false}
                  onBlur={this.handleBlur}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{ showLineNumbers: false }}
                  style={{ postion: "absolute", top: "0px", bottom: "0px", width: "100%", height: "100%", overflow: "auto" }}
                />
              </div>);
    } else {
      if (this.state.formatJson === "") {
        return (<div></div>);
      }
      const treeData = this.formatReadOnlyJson(this.state.formatJson);
      return (<TreeView showBorder={false} emptyIcon={null} nodeIcon={null} selectable={false} data={treeData} />);
    }
  }
}
import React, { Component } from "react";

import style from "./JsonPanel.scss";

import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/monokai";

export default class JsonPanel extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.objects);
    this.state = {
      jsonStr: JSON.stringify(this.props.objects, null, 4),
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      jsonStr: JSON.stringify(nextProps.objects, null, 4),
    };
  }

  handleEditorChange(newValue) {
    this.setState({
      jsonStr: newValue,
    });
  }

  handleBlur() {
    this.props.onhandleClick(JSON.parse(this.state.jsonStr));
  }

  render() {

    return (
      <div className="jp_container">
        <AceEditor
          mode="json"
          theme="monokai"
          fontSize="12px"
          tabSize={2}
          name="refTextarea"
          showPrintMargin={false}
          value={this.state.jsonStr}
          onChange={this.handleEditorChange}
          onBlur={this.handleBlur}
          editorProps={{ $blockScrolling: true }}
          style={{ postion: "absolute", top: "0px", bottom: "0px", width: "100%", height: "100%", overflow: "auto" }}
        />
      </div>);
  }
}

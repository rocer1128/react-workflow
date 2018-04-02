import React, { Component, PropTypes } from "react";
import ResourceToolbar from "./ResourceToolbar";
import ResourceList from "./ResourceList";
import { ERROR_TYPES } from "../../../components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "../../../components/Common/OperationConstant";

export default class Resource extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func.isRequired,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    searchResource: PropTypes.func.isRequired,
    searchResourceByName: PropTypes.func.isRequired,
    uploadResource: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {
    this.props.searchResource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resource.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.resource.operation, "资源");
      this.props.searchResource();
    } else if (nextProps.resource.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.resource.error.code], "资源");
    }
  }
  handleDelete(index) {
    this.props.deleteResource(index);
  }

  handleSearch(name) {
    this.props.searchResourceByName(name);
  }

  handleUpload(resource) {
    const rs = {
      name: "未命名",
      category: "common",
      file_type: "图片",
    };
    Object.assign(rs, resource);
    this.props.uploadResource(rs);
  }

  render() {
    return (
      <div>
        <ResourceToolbar onSearch={this.handleSearch} onUpload={this.handleUpload} searchAll={this.props.searchResource} />
        <ResourceList listRes={this.props.resource.listRes} onDelete={this.handleDelete} />
      </div>
    );
  }
}

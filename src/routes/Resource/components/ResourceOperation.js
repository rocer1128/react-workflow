import React, { Component, PropTypes } from "react";

import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import "./Resource.scss";
import { wildfoxConfig } from "../../../../config/web.config";

export default class ResourceOperation extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
      isDelete: false,
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.closePreviewModal = this.closePreviewModal.bind(this);
    this.handleDownLoad = this.handleDownLoad.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.resource.id);
    this.closeDeleteModal();
  }

  handlePreview() {
    this.setState({
      isPreview: true,
    });
  }

  handleDelete() {
    this.setState({
      isDelete: true,
    });
  }

  closePreviewModal() {
    this.setState({
      isPreview: false,
    });
  }

  closeDeleteModal() {
    this.setState({
      isDelete: false,
    });
  }

  handleDownLoad() {
    const url = `${wildfoxConfig.url}:${wildfoxConfig.port}${this.props.resource.file_type}`;
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", `${this.props.resource.file_type}`); // 添加指定的属性，并为其赋指定的值
    tempLink.setAttribute("target", "_blank");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button bsStyle="success" onClick={this.handlePreview}>
            预览
          </Button>
          <Button bsStyle="primary" onClick={this.handleDownLoad}>
            下载
          </Button>
          <Button bsStyle="danger" onClick={this.handleDelete}>
            删除
          </Button>
        </ButtonToolbar>
        <Modal show={this.state.isPreview} onHide={this.closePreviewModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>资源信息</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass="preview-modal_align">
            {this.state.isPreview && <img src={url} className="preview-img" />}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePreviewModal}>关闭</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isDelete} onHide={this.closeDeleteModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>删除</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确定删除
            {this.props.resource.name} 资源 ?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onDelete}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeDeleteModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

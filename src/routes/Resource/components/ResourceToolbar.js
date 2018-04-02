import React, { Component, PropTypes } from "react";
import { Button, Form, FormGroup, FormControl, Col, Modal, ControlLabel } from "react-bootstrap";

export default class ResourceToolbar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowFileUpload: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.openFileUpload = this.openFileUpload.bind(this);
    this.uploadResource = this.uploadResource.bind(this);
    this.closeFileUpload = this.closeFileUpload.bind(this);
  }

  onSearch() {
    if (this.filterResName.value)
    { this.props.onSearch(this.filterResName.value); }
    else {
      this.props.searchAll();
    }

  }

  openFileUpload() {
    this.setState({
      isShowFileUpload: true,
    });
  }

  closeFileUpload() {
    this.setState({
      isShowFileUpload: false,
    });
  }

  uploadResource() {
    // const resourceName = this.resouceName.value;
    // const reader = new FileReader();
    // reader.readAsDataURL(this.resouceFile.files[0]);
    // const currentThis = this;

    // reader.onload = () => {
    //   const base64 = reader.result;
    //   const findIndex = base64.indexOf("base64,") + "base64,".length;
    //   const resource = {
    //     name: resourceName,
    //     category: 1,
    //     base64_image: base64.substring(findIndex, base64.length),
    //   };
    //   currentThis.props.onUpload(resource);
    //   currentThis.closeFileUpload();
    // }; 
    const resource = {
      name: this.resouceName.value,
    }
    this.props.onUpload(resource);
    this.closeFileUpload();
  }

  render() {
    return (
      <div>
        <Form inline className="resourcetoolbar">
          <FormGroup controlId="Searchbar">
            <FormControl type="text" placeholder="资源名称" inputRef={ref => (this.filterResName = ref)} />
          </FormGroup>{" "}
          <Button bsStyle="primary" onClick={this.onSearch}>
            检索
          </Button>
          <Button bsStyle="primary" className="floatr" onClick={this.openFileUpload}>
            上传
          </Button>
        </Form>
        <Modal show={this.state.isShowFileUpload} onHide={this.closeFileUpload}>
          <Modal.Header closeButton>
            <Modal.Title>上传资源</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  {" "}资源名称
                </Col>
                <Col sm={8}>
                  <FormControl type="text" placeholder="资源名称" inputRef={ref => (this.resouceName = ref)} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  {" "}文件
                </Col>
                <Col sm={8}>
                  <FormControl type="file" inputRef={ref => (this.resouceFile = ref)} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.uploadResource}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeFileUpload}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

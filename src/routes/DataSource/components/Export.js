import React, { Component, PropTypes } from "react";
import { Button, Form, FormGroup, FormControl, Col, Modal, ControlLabel } from "react-bootstrap";

export default class Export extends Component {
  static propTypes = {
    dataSource: PropTypes.object.isRequired, // 数据源列表
    dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
    projectId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isable: true,
      isShowFileUpload: false,
    };
    this.exportData = this.exportData.bind(this);
    this.openFileUpload = this.openFileUpload.bind(this);
    this.closeFileUpload = this.closeFileUpload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (dataSource.listDatasource.length) {
      this.setState({
        isable: false,
      });
    } else {
      this.setState({
        isable: true,
      });
    }
  }

  openFileUpload() {
    this.props.dataSourceMethod.onloadDataSourcePoint(this.props.projectId);
    this.setState({
      isShowFileUpload: true,
    });
  }

  closeFileUpload() {
    this.setState({
      isShowFileUpload: false,
    });
  }

  exportData() {
    let json = {};
    const output = this.props.dataSource.listDataSourcePoint.map((element) => {
      const { nodes, ...rest } = element;
      const datanodes = nodes.map((node) => {
        const { data_source_id, id, ...restnode } = node;
        return restnode;
      });
      json = {
        data_source: {
          ...rest,
          data_points: datanodes,
        },
      };
      return json;
    });
    const blob = new Blob([JSON.stringify(output, 0, 2)], {
      type: "json",
    });
    if (typeof window.navigator.msSaveBlob !== "undefined") {
      window.navigator.msSaveBlob(blob, `${this.name.value}.json`); // 使用 Blob 和 msSaveBlob 以本地方式保存文件(IE)
    } else {
      const blobURL = window.URL.createObjectURL(blob); // 使用html5<a>标签download属性保存文件
      const tempLink = document.createElement("a");
      tempLink.href = blobURL;
      tempLink.setAttribute("download", `${this.name.value}.json`); // 添加指定的属性，并为其赋指定的值
      tempLink.setAttribute("target", "_blank");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
    this.closeFileUpload();
  }

  render() {
    return (
      <div style={{ float: "left" }}>
        <Button bsStyle="primary" onClick={this.openFileUpload} disabled={this.state.isable}>
          导出
        </Button>
        <Modal show={this.state.isShowFileUpload} onHide={this.closeFileUpload}>
          <Modal.Header closeButton>
            <Modal.Title>
              导出数据
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}> 输入文件名
                </Col>
                <Col sm={8}>
                <FormControl type="input" inputRef={ref => (this.name = ref)} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.exportData}>
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

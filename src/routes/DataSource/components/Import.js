import React, { Component, PropTypes } from "react";
import { Button, Form, FormGroup, FormControl, Col, Modal, ControlLabel } from "react-bootstrap";
import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";

export default class Import extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  static propTypes = {
    dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
    projectId: PropTypes.number.isRequired, // 工程id
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowFileUpload: false,
    };
    this.openFileUpload = this.openFileUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.closeFileUpload = this.closeFileUpload.bind(this);
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

  checkFormat = (json) => {
    const inputjson = json;
    if (Object.prototype.toString.call(inputjson) === "[object Array]" && inputjson.length !== 0) {
      let element;
      for (element in inputjson) {
        if (!inputjson[element].data_source) {
          return [false, parseInt(element, 10) + 1];
        }
      }
      return [true, ""];
    }
    return [false, -1];
  }

  uploadFile() {
    const reader = new FileReader();
    const arr = this.File.files[0].name.split(".");
    // 判断文件类型是否正确，规定后缀名称".json"
    if (arr[arr.length - 1] === "json") {
      reader.readAsText(this.File.files[0]);
      const currentThis = this;
      reader.onload = () => {
        const inputjson = JSON.parse(reader.result);
        const checkResult = this.checkFormat(inputjson); // 判断是否是格式正确
        if (checkResult[0]) {
          inputjson.map((element) => {
            const json = {
              project_id: parseInt(this.props.projectId, 10),
              data_source: element.data_source,
            };
            this.props.dataSourceMethod.importDataSource(json); // 向数据库发送创建请求
            return true;
          });
          currentThis.closeFileUpload();
        } else if (checkResult[1] === -1) {
          this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, "文件内容格式不正确！", "数据源");
        } else {
          this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, `第${checkResult[1]}个数据源格式不符合！`, "数据源");
        }
      };
    } else {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, "文件类型不符合，请选择json文件！", "数据源");
    }
  }

  render() {
    return (
      <div style={{ float: "left" }}>
        <Button bsStyle="primary" onClick={this.openFileUpload} style={{ marginLeft: 3, float: "left" }}>
          导入
        </Button>
        <Modal show={this.state.isShowFileUpload} onHide={this.closeFileUpload}>
          <Modal.Header closeButton>
            <Modal.Title>
              导入数据
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}> 文件
                </Col>
                <Col sm={8}>
                <FormControl type="file" inputRef={ref => (this.File = ref)} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.uploadFile}>
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

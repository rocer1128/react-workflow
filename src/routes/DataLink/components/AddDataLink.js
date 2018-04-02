import React, { Component, PropTypes } from "react";
import { Modal, Button } from "react-bootstrap";
import DataLinkTemp from "./DataLinkTemp";
import style from "./DataLink.scss";

/**
 * AddDataLink：新建数据联动类
 */
export default class AddDataLink extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired, // 工程id
    dataLinkMethod: PropTypes.object.isRequired, // 数据联动各种方法的对象
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.create = this.create.bind(this);
  }

  /**
   * 弹出模态框
   */
  showModal() {
    this.setState({
      show: true,
    });
  }

  /**
   * 关闭模态框
   */
  hideModal() {
    this.setState({
      show: false,
    });
  }

  /**
   * 新建数据联动
   */
  create() {
    const json = this.edit.getRefValue(); // 获取页面上填写的值
    const pro = {
      project_id: parseInt(this.props.projectId, 10),
    };
    const sendjson = Object.assign(pro, json); // 新建数据联动，需要加上工程id字段
    this.props.dataLinkMethod.UploadLink(sendjson); // 调用新建数据联动的方法
    this.hideModal();
  }

  render() {
    // 因为是新建数据联动，所以数据都是空的字段
    const fakedata = {
      project_id: parseInt(this.props.projectId, 10),
      name: "",
      is_valid: false,
      description: "",
      inputs: [],
      outputs: [],
      formula: "",
    };

    return (
      <div className={style.adddatalink}>
        <Button bsStyle="primary" onClick={this.showModal}>
          添加数据联动
        </Button>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              添加数据联动
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataLinkTemp dataLink={fakedata} dataLinkMethod={this.props.dataLinkMethod} ref={ref => (this.edit = ref)} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.create}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.hideModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

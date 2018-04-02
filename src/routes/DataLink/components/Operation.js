import React, { Component, PropTypes } from "react";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
import DataLinkTemp from "./DataLinkTemp";

/**
 * Operation：操作类，即“编辑”和“删除”
 */
export default class Operation extends Component {
  static propTypes = {
    component: PropTypes.object.isRequired, // 数据联动Json
    dataLinkMethod: PropTypes.object.isRequired, // 数据联动各种方法的对象
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowDelete: false,
      show: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * 弹出删除模态框
   */
  onDelete() {
    this.setState({
      isShowDelete: true,
    });
  }

  /**
   * 关闭删除模态框
   */
  closeDeleteModal() {
    this.setState({
      isShowDelete: false,
    });
  }

  /**
   * 弹出编辑模态框
   */
  showModal() {
    this.setState({
      show: true,
    });
  }

  /**
   * 关闭编辑模态框
   */
  hideModal() {
    this.setState({
      show: false,
    });
  }

  /**
   * 删除数据联动方法
   */
  delete() {
    this.props.dataLinkMethod.deleteLink(this.props.component.id);
    this.closeDeleteModal();
  }

  /**
   * 编辑保存数据联动
   */
  save() {
    // 保存的时候要加上已有的id字段
    const json = this.edit.getRefValue();
    const pro = {
      id: this.props.component.id,
    };
    // 合并对象
    const sendjson = Object.assign(pro, json);
    // 调用保存数据联动的方法
    this.props.dataLinkMethod.saveLink(sendjson);
    this.hideModal();
  }

  render() {
    return (
      <div style={{ marginLeft: "25%" }}>
        <ButtonToolbar>
          <Button bsStyle="info" onClick={this.showModal}>
            编辑
          </Button>
          <Button bsStyle="danger" onClick={this.onDelete}>
            删除
          </Button>
        </ButtonToolbar>
        <Modal show={this.state.isShowDelete} onHide={this.closeDeleteModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              删除数据联动提示
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <h4>确定要删除数据联动：{this.props.component.name} ?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.delete}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeDeleteModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              编辑数据联动
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataLinkTemp dataLink={this.props.component} dataLinkMethod={this.props.dataLinkMethod} ref={ref => (this.edit = ref)} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.save}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.hideModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>);
  }
}

import React, { Component, PropTypes } from "react";
import { ButtonToolbar, Button, Modal } from "react-bootstrap";
import DataPointTemp from "./DataPointTemp";

/**
 * Operation：操作类（编辑和删除）
 */
class Operation extends Component {
  static propTypes = {
    dataTemplateId: PropTypes.number.isRequired, // 数据源模板
    deletePoint: PropTypes.func.isRequired, // 删除数据点方法
    savePoint: PropTypes.func.isRequired, // 保存数据点方法
    component: PropTypes.object.isRequired, // 当前数据点信息
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowDelete: false, // 删除数据点模态框显示
      show: false, // 编辑模态框显示
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
   * 删除数据点函数
   */
  delete() {
    this.props.deletePoint(this.props.component.id);
    this.closeDeleteModal();
  }

  /**
   * 编辑保存数据点函数
   */
  save() {
    const json = this.edit.getRefValue(); // 获取编辑过后的数据点信息
    this.props.savePoint(json);
    this.hideModal();
  }

  render() {
    return (
      <div>
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
              删除数据点提示
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <h4>确定要删除数据点：{this.props.component.name} ?</h4>
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
              编辑数据点
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataPointTemp dataTemplateId={this.props.dataTemplateId} dataPoint={this.props.component} ref={ref => (this.edit = ref)} />
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
export default Operation;

import React, { Component, PropTypes } from "react";
import { Modal, Button, FormGroup, FormControl, Col, Row } from "react-bootstrap";

export default class AddCurve extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired, // 保存曲线组函数
    newCreate: PropTypes.func.isRequired, // 新建曲线组函数
    CurveInfo: PropTypes.object.isRequired, // 曲线方法
    delete: PropTypes.func.isRequired, // 删除曲线组方法
  }

  constructor(props) {
    super(props);
    this.state = {
      addshow: false, // 保存曲线组显示
      deleteshow: false, // 删除曲线组显示
      name: "", // 曲线组名称
    };
  }

  /**
   * 弹出"保存当前曲线组"模态框
   */
  showAddModal = () => {
    const cid = this.props.CurveInfo.curveIndex; // 点击index
    const ldc = this.props.CurveInfo.listDataCurve; // 数据曲线数组
    // 获取数据曲线组的名称
    let name;
    if (cid >= 0 && ldc[cid]) {
      name = ldc[cid].name;
    } else {
      name = "";
    }
    this.setState({
      addshow: true,
      name,
    });
  }

  /**
   * 关闭"保存当前曲线组"模态框
   */
  hideAddModal = () => {
    this.setState({
      addshow: false,
    });
  }

  /**
   * 保存曲线组函数
   */
  saveCurves = () => {
    if (this.name.value === "") {
      alert("请输入保存的曲线组名称！");
    } else {
      this.props.save(this.name.value);
      this.hideAddModal();
    }
  }

  /**
   * 弹出"删除当前曲线组"模态框
   */
  showDeleteModal = () => {
    this.setState({
      deleteshow: true,
    });
  }

  /**
   * 关闭"删除当前曲线组"模态框
   */
  hideDeleteModal = () => {
    this.setState({
      deleteshow: false,
    });
  }

  /**
   *删除曲线组函数
   */
  deleteCurves = () => {
    this.props.delete();
    this.hideDeleteModal();
  }

  render() {
    return (
      <div className="addcurve">
        <Button bsStyle="success" onClick={this.props.newCreate} style={{ marginRight: 5 }}>
          新增曲线组
        </Button>
        <Button bsStyle="warning" onClick={this.showAddModal} style={{ marginRight: 5 }}>
          保存当前曲线组
        </Button>
        <Button bsStyle="danger" style={{ marginRight: 5 }} onClick={this.showDeleteModal}>
          删除当前曲线组
        </Button>
        <Modal show={this.state.addshow} onHide={this.hideAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              保存曲线组
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
                曲线组名称：
              </Col>
              <Col xs={7}>
                <form style={{ margin: 0 }}>
                  <FormGroup style={{ marginBottom: 2 }}>
                    <FormControl type="text" inputRef={ref => (this.name = ref)} defaultValue={this.state.name} />
                  </FormGroup>
                </form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.saveCurves}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.hideAddModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.deleteshow} onHide={this.hideDeleteModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              删除曲线组
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确定删除当前曲线组？
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.deleteCurves}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.hideDeleteModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

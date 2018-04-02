import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { ButtonToolbar, Button, Modal, Form, FormGroup, Col, FormControl, ControlLabel } from "react-bootstrap";
import { RESOURCE_TYPE, COMPONENT_GROUP } from "../../../components/Common/ComponentConstant";
import { createOpt } from "../../../components/Common/CommonUtil";
import Icon from "../../../components/CellsArt/DesignPanel/Icon";
import Cell from "../../../components/ComGroup/coms/Cell";
import DT from "../../../components/CellsArt/DT";
import "./Widget.scss";

export default class Operation extends Component {
  //  参考 Widget.js的注释
  static propTypes = {
    widget: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired, // 编辑组件属性
    onEditWidget: PropTypes.func.isRequired, // 编辑组件
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false, // 克隆组件模态框的状态
      isShowEditAttrs: false, // 编辑组件属性模态框的状态
      isShowDelete: false, // 删除组件模态框的状态
      isShowPriview: false, // 预览组件模态框的状态
    };
  }

  onAdd = () => {
    this.setState({
      isShowAdd: true,
    });
  };

  onEditAttrs = () => {
    this.setState({
      isShowEditAttrs: true,
    });
  };

  /**
   * 在设计视图中，打开并编辑组件
   */
  onEditWidget = () => {
    this.props.onEditWidget(this.props.widget);
    browserHistory.push({
      pathname: "/workbench",
      query: {
        id: this.props.widget.id,
        from: "widget",
      },
    });
  };

  onDelete = () => {
    this.setState({
      isShowDelete: true,
    });
  };

  showPriviewModal = () => {
    const { styles, objects } = this.props.widget.data;
    const Type = DT(Cell);
    styles.width = 50;
    styles.height = 50;
    styles.x = 0;
    styles.y = 0;
    this.previewModel = (
      <Icon icon={"cell"} size={380}>
        <Type id={"000"} styles={styles} objects={objects} />
      </Icon>
    );
    this.setState({
      isShowPriview: true,
    });
  };

  closePriviewModal = () => {
    this.setState({
      isShowPriview: false,
    });
  };

  closeEditModal = () => {
    this.setState({
      isShowEditAttrs: false,
      isShowAdd: false,
    });
  };

  closeDeleteModal = () => {
    this.setState({
      isShowDelete: false,
    });
  };

  /**
   * 编辑组件中属性
   */
  editWidgetAttrs = () => {
    const widget = Object.assign(
      {},
      {
        name: this.nameText.value,
        category: this.categoryText.value,
        group: this.groupText.value,
      },
    );

    this.props.onEdit(this.props.widget.id, widget);
    this.closeEditModal();
  };

  /**
   * 根据组件ID进行删除
   */
  deleteWidget = () => {
    this.props.onDelete(this.props.widget.id);
    this.closeDeleteModal();
  };

  /**
   * 克隆组件，调用添加api
   */
  addWidget = () => {
    const widget = Object.assign({}, this.props.widget, {
      name: this.nameText.value,
      category: this.categoryText.value,
      group: this.groupText.value,
    });
    this.props.onAdd(widget);
    this.closeEditModal();
  };

  /**
   * 编辑组件属性时，弹出的模态框, 将属性图形化
   */
  eidtWidgetInfo = () => {
    const { widget } = this.props;
    const categoryTypeOpt = createOpt(RESOURCE_TYPE);
    const groupTypeOpt = createOpt(COMPONENT_GROUP);

    if (widget) {
      const editForm = (
        <Form horizontal>
          <FormGroup controlId="formName">
            <Col componentClass={ControlLabel} sm={3}>
              名称:
            </Col>{" "}
            <Col sm={8}>
              <FormControl type="text" placeholder="组件名称..." inputRef={ref => (this.nameText = ref)} defaultValue={widget.name} />
            </Col>
          </FormGroup>{" "}
          <FormGroup controlId="formCategory">
            <Col componentClass={ControlLabel} sm={3}>
              分类：
            </Col>{" "}
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="选择分类..." inputRef={ref => (this.categoryText = ref)} defaultValue={widget.category}>
                {categoryTypeOpt}
              </FormControl>
            </Col>
          </FormGroup>{" "}
          <FormGroup controlId="formGroup">
            <Col componentClass={ControlLabel} sm={3}>
              分组：
            </Col>{" "}
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="选择分组..." inputRef={ref => (this.groupText = ref)} defaultValue={widget.group}>
                {groupTypeOpt}
              </FormControl>
            </Col>
          </FormGroup>{" "}
        </Form>
      );
      return editForm;
    }
  };

  render() {
    const { name, data } = this.props.widget;
    const { user } = this.props.auth;

    return (
      <div>
        <ButtonToolbar>
          <Button bsStyle="success" onClick={this.showPriviewModal}>
            预览
          </Button>
          <Button bsStyle="info" onClick={this.onEditWidget}>
            编辑组件
          </Button>
          <Button bsStyle="primary" onClick={this.onAdd}>
            克隆组件
          </Button>
          <Button bsStyle="info" onClick={this.onEditAttrs}>
            编辑属性
          </Button>
          <Button bsStyle="danger" onClick={this.onDelete}>
            删除
          </Button>
        </ButtonToolbar>
        <Modal show={this.state.isShowEditAttrs || this.state.isShowAdd} onHide={this.closeEditModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.isShowEditAttrs ? "编辑属性" : "克隆组件"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass="edit-modal_align">
            {(this.state.isShowEditAttrs || this.state.isShowAdd) && this.eidtWidgetInfo()}
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={this.state.isShowEditAttrs ? this.editWidgetAttrs : this.addWidget}>
              确定
            </Button>
            <Button onClick={this.closeEditModal}>取消</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowDelete} onHide={this.closeDeleteModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>删除</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确定删除
            {name}组件 ?
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={this.deleteWidget}>
              确定
            </Button>
            <Button onClick={this.closeDeleteModal}>取消</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowPriview} onHide={this.closePriviewModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>预览</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass="preview-modal_align">
            <div className="pane-content">
              {this.previewModel}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePriviewModal}>取消</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

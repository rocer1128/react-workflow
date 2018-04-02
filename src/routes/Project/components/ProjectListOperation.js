import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from "react-bootstrap";
import moment from "moment";

export default class ProjectListOperation extends Component {

  // 定义校验 prop
  static propTypes = {
    onOpen: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDeply: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowDelete: false,
      isShowEdit: false,
      proName: this.props.project.name,
      proCategory: this.props.project.category,
      proDescription: this.props.project.description,
      proWorkIp: this.props.project.work_ip,
    };

    this.onOpenProject = this.onOpenProject.bind(this);
    this.onDeply = this.onDeply.bind(this);
    this.onCancelDeply = this.onCancelDeply.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRuntime = this.onRuntime.bind(this);
    this.onSPC = this.onSPC.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
    this.onCloseDelete = this.onCloseDelete.bind(this);

    this.onEditProject = this.onEditProject.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);
  }

  onOpenProject() {
    this.props.onOpen(this.props.project.id);
  }

  onDelete() {
    this.setState({
      isShowDelete: true,
    });
  }

  onCloseDelete() {
    this.setState({
      isShowDelete: false,
    });
  }

  onDeleteProject() {
    this.props.onDelete(this.props.project.id);
    this.onCloseDelete();
  }

  onEdit() {
    this.setState({
      isShowEdit: true,
    });
  }

  onCloseEdit() {
    this.setState({
      isShowEdit: false,
    });
  }

  onEditProject() {
    const onEditProject = {
      id: this.props.project.id,
      name: this.state.proName,
      category: this.state.proCategory,
      description: this.state.proDescription,
      modify_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      work_ip: this.state.proWorkIp,
    };
    this.props.onEdit(onEditProject);
    this.onCloseEdit();
  }

  onDeply() {
    this.props.onDeply({
      id: this.props.project.id,
      deploy_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      state: true,
    });
  }

  onCancelDeply() {
    this.props.onCancelDeply({
      id: this.props.project.id,
      deploy_time: "",
      state: false,
    });
  }

  onRuntime() {
    window.open(`projectMonitor?id=${this.props.project.id}`);
  }

  onSPC() {
    window.open(`storedprogramcontrol?id=${this.props.project.id}`);
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <ButtonToolbar>
          {project.state === false &&
           <Button bsStyle="success" onClick={this.onOpenProject}>
             打开工程
           </Button>}
          {project.state === true &&
           <Button bsStyle="success" disabled>
             打开工程
           </Button>}
          {project.state === false &&
           <Button bsStyle="primary" onClick={this.onDeply}>
             工程部署
           </Button>}
          {project.state === true &&
           <Button bsStyle="primary" onClick={this.onCancelDeply}>
             取消部署
           </Button>}
          {project.state === false &&
           <Button bsStyle="info" onClick={this.onEdit}>
             编辑
           </Button>}
          {project.state === true &&
           <Button bsStyle="success" onClick={this.onRuntime}>
             查看
           </Button>}
          {project.state === true &&
           <Button bsStyle="success" onClick={this.onSPC}>
             程控
           </Button>}
          {project.state === true &&
           <Button disabled bsStyle="danger">
             删除
           </Button>}
          {project.state === false &&
           <Button bsStyle="danger" onClick={this.onDelete}>
             删除
           </Button>}
        </ButtonToolbar>
        <Modal show={this.state.isShowDelete} onHide={this.onCloseDelete} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>
              删除
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            确定删除
            {project.name} 以及工程下所有的界面?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onDeleteProject}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.onCloseDelete}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowEdit} onHide={this.onCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>
              编辑 -
              {project.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}> 工程名称
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="工程名称" value={this.state.proName} onChange={this.handleChange.bind(this, "proName")} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}> 工程分类
                </Col>
                <Col sm={8}>
                <FormControl componentClass="select" value={this.state.proCategory} onChange={this.handleChange.bind(this, "proCategory")}>
                  <option value="common">
                    通用
                  </option>
                  <option value="scada">
                    电力
                  </option>
                  <option value="fui">
                    表单
                  </option>
                  <option value="fas">
                    FAS
                  </option>
                  <option value="bas">
                    BAS
                  </option>
                </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}> 工程描述
                </Col>
                <Col sm={8}>
                <FormControl componentClass="textarea" placeholder="工程描述" value={this.state.proDescription} onChange={this.handleChange.bind(this, "proDescription")} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}> 工作IP
                </Col>
                <Col sm={8}>
                <FormControl type="text" placeholder="工作IP" value={this.state.proWorkIp} onChange={this.handleChange.bind(this, "proWorkIp")} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onEditProject}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.onCloseEdit}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

import React, { Component, PropTypes } from "react";
import { Button, Modal, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { CATEGORY_TYPES } from "../../../components/Common/ComponentConstant";
import "./Project.scss";

export default class ProjectOperation extends Component {
  // 定义校验 prop
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowCreateProject: false,
    };
    this.onCreateProject = this.onCreateProject.bind(this);
    this.closeCreateProject = this.closeCreateProject.bind(this);
    this.createProject = this.createProject.bind(this);
  }

  onCreateProject() {
    this.setState({
      isShowCreateProject: true,
    });
  }

  closeCreateProject() {
    this.setState({
      isShowCreateProject: false,
    });
  }

  createProject() {
    const project = {
      name: this.projectName.value,
      category: this.projectCategory.value,
      description: this.projectDesc.value,
      state: false,
      work_ip: this.projectWorkIp.value,
      device_ip: this.deviceWorkIp.value ? [{
        "work_ip": this.deviceWorkIp.value,
        "level": 2
      }] : [],
      local_state: false,
      is_create_health_data_sources: this.healthData.checked,
    };
    this.props.onCreate(project);
    this.closeCreateProject();
  }

  render() {
    return (
      <div>
        <div className="button_container">
          <Button bsStyle="primary" className="creat_project" onClick={this.onCreateProject}>
            创建工程
          </Button>
        </div>
        <div>
          <Modal show={this.state.isShowCreateProject} onHide={this.closeCreateProject}>
            <Modal.Header closeButton>
              <Modal.Title>
                创建工程
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 0 }}>
              <Form horizontal>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}> 工程名称
                  </Col>
                  <Col sm={8}>
                  <FormControl type="text" placeholder="工程名称" inputRef={ref => (this.projectName = ref)} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}> 工程分类
                  </Col>
                  <Col sm={8}>
                  <FormControl componentClass="select" inputRef={ref => (this.projectCategory = ref)}>
                    <option value="common">
                      {CATEGORY_TYPES.common}
                    </option>
                    <option value="scada">
                      {CATEGORY_TYPES.scada}
                    </option>
                    <option value="fui">
                      {CATEGORY_TYPES.fui}
                    </option>
                    <option value="fas">
                      {CATEGORY_TYPES.fas}
                    </option>
                    <option value="bas">
                      {CATEGORY_TYPES.bas}
                    </option>
                  </FormControl>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}> 工程描述
                  </Col>
                  <Col sm={8}>
                  <FormControl type="text" placeholder="工程描述" inputRef={ref => (this.projectDesc = ref)} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}> 工作IP
                  </Col>
                  <Col sm={8}>
                  <FormControl type="text" placeholder="工作IP" inputRef={ref => (this.projectWorkIp = ref)} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}> 备用工作IP
                  </Col>
                  <Col sm={8}>
                  <FormControl type="text" placeholder="备用工作IP" inputRef={ref => (this.deviceWorkIp = ref)} />
                  </Col>
                  <Col componentClass={ControlLabel} sm={3}> 生成健康数据源
                  </Col>
                  <Col sm={8}>
                  <Checkbox inputRef={ref => (this.healthData = ref)} />
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.createProject}>
                确定
              </Button>
              <Button bsStyle="default" onClick={this.closeCreateProject}>
                取消
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      );
  }
}

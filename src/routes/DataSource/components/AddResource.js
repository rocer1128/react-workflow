import React, { Component, PropTypes } from "react";
import { Modal, Button, FormGroup, FormControl, option, Col, Row, Checkbox } from "react-bootstrap";
import DynamicForm from "./DynamicForm";
import "./DataResource.scss";
import { DATASOURCE_TEMP } from "./CommonTemp";
import { DATATEMP_TYPES } from "../../../components/Common/ComponentConstant";

/**
 * AddResource：添加数据源类
 */
export default class AddResource extends Component {
  static propTypes = {
    UploadSource: PropTypes.func.isRequired, // 新建数据源的方法
    projectId: PropTypes.number.isRequired, // 工程id
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectId: "0",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.create = this.create.bind(this);
    this.change = this.change.bind(this);
    this.transParams = this.transParams.bind(this);
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
      selectId: "0",
    });
  }

  /**
    * 选择的数据源模板类型
    */
  change(e) {
    this.setState({
      selectId: e.target.value,
    });
  }

  /**
    * 根据选择的数据源模板到DATASOURCE_TEMP中取到相应的要展示的字段
    */
  transParams() {
    const key = this.state.selectId;
    return DATASOURCE_TEMP[key];
  }

  /**
    * 新建数据源函数
    */
  create() {
    // 得到数据源各字段的值，然后调用新建数据源的方法
    const json = {
      project_id: parseInt(this.props.projectId, 10),
      name: this.name.value,
      cycle: parseInt(this.state.selectId, 10) === 4 ? null : this.cycle.value,
      is_valid: this.checkbox.checked,
      data_template_id: parseInt(this.select.value, 10),
      description: this.desc.value,
      params: this.dynamic.getRefValue(), // 获取动态加载的字段的值
    };
    this.props.UploadSource(json); // 新建数据源的方法
    this.hideModal(); // 关闭模态框
  }

  render() {
    // 下拉选择框中的"数据源模板"
    const sourceOption = Object.keys(DATATEMP_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {DATATEMP_TYPES[parseInt(element, 10)]}
      </option>
    ));
    // 页面中要填的字段
    const dsinfor = (
    <div className="margin">
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据源名称：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl type="text" inputRef={ref => (this.name = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据源模板：
        </Col>
        <Col xs={7}>
        <FormGroup style={{ marginBottom: 2 }}>
          <FormControl componentClass="select" inputRef={ref => (this.select = ref)} onChange={this.change}>
            {sourceOption}
          </FormControl>
        </FormGroup>
        </Col>
      </Row>
      {parseInt(this.state.selectId, 10) !== 4 && <Row>
                                                    <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 更新周期：
                                                    </Col>
                                                    <Col xs={7}>
                                                    <form style={{ margin: 0 }}>
                                                      <FormGroup style={{ marginBottom: 2 }}>
                                                        <FormControl type="text" inputRef={ref => (this.cycle = ref)} />
                                                      </FormGroup>
                                                    </form>
                                                    </Col>
                                                  </Row>}
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据源描述：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 0 }}>
            <FormControl componentClass="textarea" style={{ resize: "none" }} placeholder="数据源描述" inputRef={ref => (this.desc = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ width: 130 }}> 是否生效：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 0, height: 20 }}>
            <Checkbox style={{ margin: 0 }} inputRef={ref => (this.checkbox = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
    </div>);

    return (
      <div className="addresource">
        <Button bsStyle="primary" onClick={this.showModal}>
          添加数据源
        </Button>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              添加数据源
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {dsinfor}
            <DynamicForm dataTemp={this.transParams()} ref={ref => (this.dynamic = ref)} />
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

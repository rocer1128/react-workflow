import React, { Component, PropTypes } from "react";
import { Modal, Button, FormGroup, FormControl, Col, Row, Checkbox } from "react-bootstrap";
import DynamicForm from "./DynamicForm";
import { DATATEMP_TYPES } from "../../../components/Common/ComponentConstant";
import { DATASOURCE_TEMP } from "./CommonTemp";

/**
 * DataFormTemp：数据源信息展示模板类
 */
export default class DataFormTemp extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired, // 当前激活的数据源的Json信息
    onDelete: PropTypes.func.isRequired, // 点击"删除数据源"要运行的函数
    dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.transParams = this.transParams.bind(this);
  }

  /**
    * 组件挂载完时，已生成DOM节点，把数据库中的数据源信息展示到页面上
    */
  componentDidMount() {
    this.name.value = this.props.data.name;
    this.checkbox.checked = this.props.data.is_valid;
    this.desc.value = this.props.data.description;
    if (this.props.data.data_template_id !== 4) {
      this.cycle.value = this.props.data.cycle;
    }
  }

  /**
   * 接收新props时，即修改了数据库中的值的时候，重新把数据库中的数据源信息展示到页面上
   */
  componentWillReceiveProps(nextProps) {
    this.name.value = nextProps.data.name;
    this.checkbox.checked = nextProps.data.is_valid;
    this.desc.value = nextProps.data.description;
    if (this.props.data.data_template_id !== 4) {
      this.cycle.value = nextProps.data.cycle;
    }
  }

  /**
   * 动态加载字段
   * @return {Array} [要动态加载字段的数组]
   */
  transParams() {
    const key = this.props.data.data_template_id; // 获取数据源的模板id
    const pobj = this.props.data.params; // 获取数据源动态加载Json
    // 根据模板id获取模板后，解析动态加载的Json，填入相应的值
    // 模板如下：
    // {
    //   id: "port",
    //   name: "端口号",
    //   type: "PropertyText",
    //   value: "",
    // }
    // 动态加载的Json如下：
    // { port : 2000 }
    const tempJson = DATASOURCE_TEMP[key].map((component) => {
      const newComponent = Object.assign({}, component);
      const id = newComponent.id; // 获取关键字，如“port”
      newComponent.value = pobj[id]; // 填入值，如 value:2000
      return newComponent;
    });
    return tempJson || [];
  }

  /**
   * 弹出删除模态框
   */
  showModal() {
    this.setState({
      show: true,
    });
  }

  /**
   * 隐藏删除模态框
   */
  hideModal() {
    this.setState({
      show: false,
    });
  }

  /**
   * 编辑保存函数
   */
  save() {
    // 获取页面的值
    const json = {
      id: this.props.data.id,
      name: this.name.value,
      cycle: this.props.data.data_template_id === 4 ? null : this.cycle.value,
      is_valid: this.checkbox.checked,
      description: this.desc.value,
      params: this.dynamic.getRefValue(),
    };
    this.props.dataSourceMethod.saveSource(json); // 保存数据源方法
  }

  /**
   * 删除数据源函数
   */
  delete() {
    this.props.dataSourceMethod.deleteSource(this.props.data.id); // 删除数据源方法
    this.hideModal(); // 隐藏删除模态框
    this.props.onDelete(); // 点击删除数据源按钮额外做的事情（不显示右侧信息栏）
  }

  render() {
    const dsinfor = (
    <div>
      <Row style={{ marginTop: 20 }}>
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
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl type="text" value={DATATEMP_TYPES[this.props.data.data_template_id]} readOnly />
          </FormGroup>
        </form>
        </Col>
      </Row>
      {this.props.data.data_template_id !== 4 && <Row>
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
      <div>
        {dsinfor}
        <DynamicForm dataTemp={this.transParams()} ref={ref => (this.dynamic = ref)} />
        <div style={{ paddingTop: 10, textAlign: "center" }}>
          <Button bsStyle="warning" onClick={this.save}>
            保存
          </Button>
          <Button bsStyle="danger" onClick={this.showModal} style={{ marginLeft: 5 }}>
            删除
          </Button>
        </div>
        <Modal bsSize="small" show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              操作提示
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <h4>确定要删除数据源：{this.props.data.name}?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.delete}>
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

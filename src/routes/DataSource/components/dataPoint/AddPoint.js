import React, { Component, PropTypes } from "react";
import { Modal, Button, FormGroup, FormControl, option, Col, Row, Checkbox, Tabs, Tab } from "react-bootstrap";
import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";
import DynamicForm from "./DynamicForm";
import { DATAPOINT_TEMP } from "../CommonTemp";
import { UNIT_TYPES, DATA_TYPES } from "../../../../components/Common/ComponentConstant";
import AlertTemp from "./AlertTemp";
import * as Types from "./types";

/**
 * AddPoint：新建数据点类
 */
export default class AddPoint extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  static propTypes = {
    dataSource: PropTypes.object.isRequired, // 数据源Json
    create: PropTypes.func.isRequired, // 新建数据点方法
  }

  constructor(props) {
    super(props);
    const tempkey = `DATAPOINTTEMP_TYPES${this.props.dataSource.data_template_id}`;
    this.state = {
      show: false, // 新建数据点模态框显示
      sourceType: this.props.dataSource.data_template_id, // 数据源模板
      nodeType: parseInt(Object.keys(Types[tempkey])[0], 10), // 数据点类型
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.create = this.create.bind(this);
    this.change = this.change.bind(this);
    this.transParams = this.transParams.bind(this);
  }

  /**
   * 因为"AddPoint"这个组件是一上来就加载了
   * “WillReceiveProps”生命周期对应的场景为：关闭了模态框后，重新打开的时候，数据点类型要重置为0，否则为上次的选择类型
   * （这块没有写好，可以改进，把button提到外面去，点击的时候再加载这个组件，这样每次都是重置的）
   */
  componentWillReceiveProps() {
    this.setState({
      sourceType: 0,
    });
  }

  /**
   * 弹出模态框
   */
  showModal() {
    const tempkey = `DATAPOINTTEMP_TYPES${this.props.dataSource.data_template_id}`;
    this.setState({
      show: true,
      nodeType: parseInt(Object.keys(Types[tempkey])[0], 10),
    });
  }

  /**
   * 关闭模态框，同时做了上面说的重置的事情
   */
  hideModal() {
    this.setState({
      show: false,
      sourceType: 0,
    });
  }

  /**
   * 数据点类型改变时触发的函数
   */
  change(e) {
    const value = parseInt(e.target.value, 10);
    // 根据选择的类型值来取得不同的数据点动态加载模板
    // 有三种动态加载模板：导出量，虚拟值，以及剩余的其他类型为一种
    if (value === 0) {
      this.setState({
        sourceType: 0,
        nodeType: value,
      });
    } else if (value === 12) {
      this.setState({
        sourceType: 2,
        nodeType: value,
      });
    } else if (value === 11 || value === 13 || value === 14) {
      this.setState({
        sourceType: 4,
        nodeType: value,
      });
    } else if (value === 7 || value === 8 || value === 9 || value === 10 || value === 15) {
      this.setState({
        sourceType: 3,
        nodeType: value,
      });
    } else {
      this.setState({
        sourceType: 1,
        nodeType: value,
      });
    }
  }

  /**
   * 获取要动态加载的模板
   */
  transParams() {
    const templeKey = this.state.sourceType;
    return DATAPOINT_TEMP[templeKey];
  }

  /**
   * 新建数据点函数
   */
  create() {
    let dataType; // 数据类型
    let defaultValue;
    // 看SVN中“DH数据库”中的T表
    // 如果是开关量类型，数据类型为1（开关型）
    // 如果是导出量类型，页面会动态加载数据类型的选择下拉框，为选择的值（也就是导出量的数据类型可以为任意一种）
    // 剩余其他的类型，对应的数据类型为2（数值型）
    if (this.state.nodeType === 2 || this.state.nodeType === 3 || this.state.nodeType === 4 || this.state.nodeType === 7) {
      dataType = 1;
    } else if (this.state.nodeType === 0) {
      dataType = parseInt(this.selectDataType.value, 10);
    } else if (this.state.nodeType === 11) {
      dataType = 4;
    } else if (this.state.nodeType === 13 || this.state.nodeType === 14) {
      dataType = 3;
    } else {
      dataType = 2;
    }

    switch (dataType) {
      case 1:
        defaultValue = this.pointValue.value ? parseInt(this.pointValue.value, 10) : 0;
        break;
      case 2:
        defaultValue = this.pointValue.value ? parseFloat(this.pointValue.value) : 1;
        break;
      case 3:
        defaultValue = this.pointValue.value;
        break;
      case 4:
        try {
          JSON.parse(this.pointValue.value);
        } catch (e) {
          this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, "数据点值格式错误", "数据点");
        }
        defaultValue = this.pointValue.value ? JSON.parse(this.pointValue.value) : JSON.parse("{}");
        break;
      default:
        defaultValue = this.pointValue.value;
    }

    // 获取页面基本信息的值
    const json = {
      data_source_id: parseInt(this.props.dataSource.id, 10), //  数据源id
      name: this.name.value,
      node_type: this.state.nodeType,
      data_type: dataType,
      unit: parseInt(this.unit.value, 10), // 单位
      is_valid: this.isValid.checked,
      is_save: this.isSave.checked,
      description: this.desc.value,
      default_value: defaultValue,
      save_params: {},
      params: this.dynamic.getRefValue(), // 动态模板的值
    };
    Object.assign(json, this.alertTemp.getRefValue()); // 上面是基本信息的值，还要拼上报警信息的值
    this.props.create(json); // 新建数据点方法
    this.hideModal();
  }

  render() {
    // 数据点类型选择
    const tid = String(this.props.dataSource.data_template_id); // 当前数据源的模板id
    const tempKey = `DATAPOINTTEMP_TYPES${tid}`; // 拼出数据点的模板类型
    // 取得数据源的类型展示在选择下拉框中
    const pointsOption = Object.keys(Types[tempKey]).map((element, index) => (
      <option value={element} key={index}>
        {Types[tempKey][element]}
      </option>
    ));
    // 单位选择
    const unitOption = Object.keys(UNIT_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {UNIT_TYPES[element]}
      </option>
    ));
    // 数据类型
    const dataTypeOption = Object.keys(DATA_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {DATA_TYPES[element]}
      </option>
    ));
    const dpedit = (
    <div>
      <Row style={{ marginTop: 10 }}>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据点名称：
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
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据点类型：
        </Col>
        <Col xs={7}>
        <FormGroup style={{ marginBottom: 2 }}>
          <FormControl componentClass="select" onChange={this.change} inputRef={ref => (this.select = ref)}>
            {pointsOption}
          </FormControl>
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据点值：
        </Col>
        <Col xs={3}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl type="text" inputRef={ref => (this.pointValue = ref)} />
          </FormGroup>
        </form>
        </Col>
        <Col xs={2} style={{ marginTop: 8, marginLeft: 0, width: 50, padding: 0 }}> 单位：
        </Col>
        <Col xs={3}>
        <FormControl componentClass="select" inputRef={ref => (this.unit = ref)}>
          <option value="0" />
          {unitOption}
        </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据点描述：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl componentClass="textarea" style={{ resize: "none" }} inputRef={ref => (this.desc = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Col xsOffset={1} xs={3} style={{ width: 130 }}> 是否生效：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 0, height: 20 }}>
            <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isValid = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Col xsOffset={1} xs={3} style={{ width: 130 }}> 是否存盘：
        </Col>
        <Col xs={7}>
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 0, height: 20 }}>
            <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isSave = ref)} />
          </FormGroup>
        </form>
        </Col>
      </Row>
      {this.state.nodeType === 0 &&
       <Row>
         <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}> 数据类型：
         </Col>
         <Col xs={7}>
         <FormGroup style={{ marginBottom: 2 }}>
           <FormControl componentClass="select" inputRef={ref => (this.selectDataType = ref)}>
             {dataTypeOption}
           </FormControl>
         </FormGroup>
         </Col>
       </Row>}
    </div>);

    return (
      <div>
        <div style={{ textAlign: "right" }}>
          <Button bsStyle="primary" style={{ marginTop: 8, marginBottom: 8 }} onClick={this.showModal}>
            添加数据点
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              添加数据点
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey={1} id="showpointstab">
              <Tab eventKey={1} title="基本信息">
                {dpedit}
                <DynamicForm dataTemp={this.transParams()} ref={ref => (this.dynamic = ref)} />
              </Tab>
              <Tab eventKey={2} title="报警信息">
                <AlertTemp nodeType={this.state.nodeType} ref={ref => (this.alertTemp = ref)} />
              </Tab>
              <Tab eventKey={3} title="存盘信息" />
            </Tabs>
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

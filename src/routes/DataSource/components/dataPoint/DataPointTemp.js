import React, { Component, PropTypes } from "react";
import { Tabs, Tab, FormGroup, FormControl, option, Col, Row, Checkbox } from "react-bootstrap";
import { OPERATION_LEVEL_ERROR } from "components/Common/OperationConstant";
import DynamicForm from "./DynamicForm";
import { DATAPOINT_TEMP } from "../CommonTemp";
import { UNIT_TYPES, DATA_TYPES } from "../../../../components/Common/ComponentConstant";
import AlertEditTemp from "./AlertEditTemp";
import * as Types from "./types";

/**
 * DataPointTemp：编辑数据点模板类
 */
export default class DataPointTemp extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  static propTypes = {
    dataTemplateId: PropTypes.number.isRequired, // 数据源模板
    dataPoint: PropTypes.object.isRequired, // 当前数据点信息
  }

  constructor(props) {
    super(props);
    this.getRefValue = this.getRefValue.bind(this);
  }

  /**
    * 组件挂载完时，已生成DOM节点，把数据库中的数据点信息展示到页面上
    */
  componentDidMount() {
    this.name.value = this.props.dataPoint.name;
    this.isValid.checked = this.props.dataPoint.is_valid;
    this.isSave.checked = this.props.dataPoint.is_save;
    this.desc.value = this.props.dataPoint.description;
    this.pointValue.value = this.props.dataPoint.default_value;
    this.unit.value = this.props.dataPoint.unit.toString();
    // 如果数据点的类型是导出量，则显示保存的数据类型，编辑中可以改变数据类型
    if (this.props.dataPoint.node_type === 0) {
      this.selectDataType.value = String(this.props.dataPoint.data_type);
    }
  }

  /**
    * 外层组件调用此方法获取编辑过后的数据点信息
    */
  getRefValue() {
    let dataType;
    let defaultValue;
    // 看SVN中“DH数据库”中的T表
    // 如果是开关量类型，数据类型为1（开关型）
    // 如果是导出量类型，页面会动态加载数据类型的选择下拉框，为选择的值（也就是导出量的数据类型可以为任意一种）
    // 剩余其他的类型，对应的数据类型为2（数值型）
    const nodeType = this.props.dataPoint.node_type;
    if (nodeType === 2 || nodeType === 3 || nodeType === 4 || nodeType === 7) {
      dataType = 1;
    } else if (nodeType === 0) {
      dataType = parseInt(this.selectDataType.value, 10);
    } else if (nodeType === 11) {
      dataType = 4;
    } else if (nodeType === 13 || nodeType === 14) {
      dataType = 3;
    } else {
      dataType = 2;
    }
    // 不同的数据类型发送给数据库的值类型也不同
    // 开关型--int，数值型--float，字符串--string，json--json
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
          JSON.parse(this.pointValue.value)
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
      id: this.props.dataPoint.id, //  数据点id
      name: this.name.value,
      data_type: dataType,
      unit: parseInt(this.unit.value, 10),
      is_valid: this.isValid.checked,
      is_save: this.isSave.checked,
      description: this.desc.value,
      default_value: defaultValue,
      save_params: {},
      params: this.dynamic.getRefValue(),
    };
    Object.assign(json, this.alertTemp.getRefValue()); // 上面是基本信息的值，还要拼上报警信息的值
    return json;
  }

  /**
   * 获取要动态加载的模板
   */
  transParams() {
    const templeKey = this.props.dataPoint.node_type; // 数据点类型
    // 根据数据点类型值来取得不同的数据点动态加载模板
    // 有三种动态加载模板：导出量，虚拟值，以及剩余的其他类型为一种
    let key;
    if (templeKey === 0) {
      return [];
    } else if (templeKey === 12) {
      key = 2;
    } else if (templeKey === 11 || templeKey === 13) {
      key = 0;
    } else if (templeKey === 7 || templeKey === 8 || templeKey === 9 || templeKey === 10) {
      key = 3;
    } else {
      key = 1;
    }
    // 获取数据点动态加载模板后，解析动态加载的Json，填入相应的值
    // 模板如下：
    // {
    //    id: "offset",
    //    name: "偏移量",
    //    type: "PropertyText",
    //    value: "",
    //  }
    // 动态加载的Json如下：
    // { offset : 100 }
    const pobj = this.props.dataPoint.params; // 获取数据点动态的信息
    const tempJson = DATAPOINT_TEMP[key].map((component) => {
      const newComponent = Object.assign({}, component);
      const id = newComponent.id; // 获取关键字，如“offset”
      newComponent.value = pobj[id]; // 填入值，如 value:100
      return newComponent;
    });
    return tempJson;
  }

  render() {
    // 数据点类型选择
    const tid = String(this.props.dataTemplateId); // 当前数据源的模板id
    const tempKey = `DATAPOINTTEMP_TYPES${tid}`; // 拼出数据点的模板类型
    // 单位选择下拉框
    const unitOption = Object.keys(UNIT_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {UNIT_TYPES[parseInt(element, 10)]}
      </option>
    ));
    // 数据类型选择下拉框
    const dataTypeOption = Object.keys(DATA_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {DATA_TYPES[parseInt(element, 10)]}
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
        <form style={{ margin: 0 }}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl type="text" value={Types[tempKey][this.props.dataPoint.node_type]} readOnly />
          </FormGroup>
        </form>
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
      {this.props.dataPoint.node_type === 0 &&
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
        <Tabs defaultActiveKey={1} id="showpointstab">
          <Tab eventKey={1} title="基本信息">
            {dpedit}
            <DynamicForm dataTemp={this.transParams()} ref={ref => (this.dynamic = ref)} />
          </Tab>
          <Tab eventKey={2} title="报警信息">
            <AlertEditTemp isAlert={this.props.dataPoint.is_alert} alertParams={this.props.dataPoint.alert_params} nodeType={this.props.dataPoint.node_type} ref={ref => (this.alertTemp = ref)} />
          </Tab>
          <Tab eventKey={3} title="存盘信息" />
        </Tabs>
      </div>
      );
  }
}

import React, { Component, PropTypes } from "react";
import { FormGroup, FormControl, option, Col, Row, Checkbox } from "react-bootstrap";
import SelectCol from "./SelectCol";

/**
 * DataLinkTemp：数据联动模板类，新建与编辑数据联动都使用此模板
 */
export default class DataLinkTemp extends Component {
  static propTypes = {
    dataLinkMethod: PropTypes.object.isRequired, // 数据联动各种方法的对象
    dataLink: PropTypes.object.isRequired, // 数据联动Json
  }

  constructor(props) {
    super(props);
    // 如果传入的dataLink有“data_source_id”，说明是“编辑数据联动”调用的此模块，显示数据库中保存的数据源id
    if (this.props.dataLink.data_source_id) {
      const sourceId = this.props.dataLink.data_source_id;
      this.state = {
        show: false,
        dataSourceId: sourceId,
      };
    } else if (this.props.dataLinkMethod.dataLink.listDataSource.length > 0) {
      // 否则， 说明是“新建数据联动”调用的此模块，则显示该工程下第一个数据源到选择框中
      const sourceId = parseInt(this.props.dataLinkMethod.dataLink.listDataSource[0].data_source_id, 10);
      this.state = {
        show: false,
        dataSourceId: sourceId,
      };
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getRefValue = this.getRefValue.bind(this);
    this.change = this.change.bind(this);
  }

  /**
   * 组件挂载完之后，把传入的数据显示出来
   */
  componentDidMount() {
    this.name.value = this.props.dataLink.name;
    this.checkbox.checked = this.props.dataLink.is_valid;
    this.desc.value = this.props.dataLink.description;
    // 如果传入的dataLink有“data_source_id”，说明是“编辑数据联动”调用的此模块，显示数据库中保存的数据源id
    if (this.props.dataLink.data_source_id) {
      this.dataSource.value = this.props.dataLink.data_source_id.toString();
    } else if (this.props.dataLinkMethod.dataLink.listDataSource.length > 0) {
      // 否则， 说明是“新建数据联动”调用的此模块，则显示该工程下第一个数据源到选择框中
      const sourceId = this.props.dataLinkMethod.dataLink.listDataSource[0].data_source_id;
      this.dataSource.value = sourceId;
    }
    this.formula.value = this.props.dataLink.formula;
  }

  /**
   * 外层调用此方法，获得页面中填写的Json结构
   * @return {object}
   */
  getRefValue() {
    const json = {
      name: this.name.value,
      is_valid: this.checkbox.checked,
      data_source_id: parseInt(this.dataSource.value, 10),
      description: this.desc.value,
      inputs: this.input.state.value.map(element => element.value),
      outputs: this.output.state.value.map(element => element.value),
      formula: this.formula.value,
    };
    return json;
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
    });
  }

  /**
   * 选择数据源的onchange事件，改变state中数据源id
   */
  change(e) {
    this.setState({
      dataSourceId: parseInt(e.target.value, 10),
    });
  }

  render() {
    const sourcelist = this.props.dataLinkMethod.dataLink.listDataSource; // 数据源与数据点的综合信息
    let showPoint = []; // 可选择的数据点
    let showSource = []; // 可选择的数据源
    const inputoptions = []; // 输入中已经选择的数据点
    const outputoptions = []; // 输出中已经选择的数据点

    // 判断数据源是否有数据
    if (sourcelist.length > 0) {
      // 如果有数据源的信息，则加到选择框中
      showSource = sourcelist.map((element, index) => (
        <option value={element.data_source_id} key={index}>
          {element.data_source_name}
        </option>
      ));
      // 如果数据源id与当前state中的数据源id相等，且该数据源下有数据点的信息，则将其加入到可选择的数据点列表中
      let pointlist = [];
      for (let i = 0; i < sourcelist.length; i++) {
        if (sourcelist[i].data_source_id === this.state.dataSourceId) {
          pointlist = sourcelist[i].nodes.length > 0 ? sourcelist[i].nodes : [];
          showPoint = pointlist.length > 0 ? pointlist.map(element => (
          {
            value: element.data_node_id,
            label: element.data_node_name,
          }
          )) : [];
          break;
        }
      }
      // 如果可选择的数据点不为空，则读取外部传入的输入输出列表
      if (pointlist.length > 0) {
        const input = this.props.dataLink.inputs; // 输入
        const output = this.props.dataLink.outputs; // 输出
        // 如果输入列表不为空，则将其加入到inputoptions列表中，展示在页面上
        if (input.length > 0) {
          for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < pointlist.length; j++) {
              // 在可选择的数据点列表pointlist中取出与输入列表input中的id相等的名称，拼成select组件要的格式{value:xx,label:"xxx"}
              if (input[i] === pointlist[j].data_node_id) {
                inputoptions.push({
                  value: pointlist[j].data_node_id,
                  label: pointlist[j].data_node_name,
                });
              }
            }
          }
        }
        // 如果输出列表不为空，则将其加入到outputoptions列表中，展示在页面上
        if (output.length > 0) {
          for (let i = 0; i < output.length; i++) {
            for (let j = 0; j < pointlist.length; j++) {
              if (output[i] === pointlist[j].data_node_id) {
                outputoptions.push({
                  value: pointlist[j].data_node_id,
                  label: pointlist[j].data_node_name,
                });
              }
            }
          }
        }
      }
    }

    return (
      <div>
        <Row style={{ marginTop: 10 }}>
          <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
            名称：
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
          <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
            描述：
          </Col>
          <Col xs={7}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 0 }}>
                <FormControl componentClass="textarea" style={{ resize: "none" }} inputRef={ref => (this.desc = ref)} />
              </FormGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col xsOffset={1} xs={3} style={{ width: 130 }}>
            是否生效：
          </Col>
          <Col xs={7}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 0, height: 20 }}>
                <Checkbox style={{ margin: 0 }} inputRef={ref => (this.checkbox = ref)} />
              </FormGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
            数据源：
          </Col>
          <Col xs={7}>
            <FormGroup style={{ marginBottom: 2 }}>
              <FormControl componentClass="select" onChange={this.change} inputRef={ref => (this.dataSource = ref)}>
                {showSource}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <SelectCol options={showPoint} ref={ref => (this.input = ref)} changeoptions={inputoptions} title={"输入"} />
        <SelectCol options={showPoint} ref={ref => (this.output = ref)} changeoptions={outputoptions} title={"输出"} />
        <Row>
          <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
            表达式：
          </Col>
          <Col xs={7}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 2 }}>
                <FormControl componentClass="textarea" style={{ resize: "none" }} inputRef={ref => (this.formula = ref)} />
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>);
  }
}

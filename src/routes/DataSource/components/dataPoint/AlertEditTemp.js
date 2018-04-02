import React, { Component, PropTypes } from "react";
import { Panel, FormGroup, FormControl, option, Col, Row, Checkbox, ControlLabel } from "react-bootstrap";
import { LEVEL_TYPES, ALERT_TYPES1, ALERT_TYPES2 } from "../../../../components/Common/ComponentConstant";

/**
 * AlertEditTemp：编辑报警信息类
 */
export default class AlertEditTemp extends Component {
  static propTypes = {
    isAlert: PropTypes.bool.isRequired, // 是否允许报警
    alertParams: PropTypes.object.isRequired, // 报警信息对象
    nodeType: PropTypes.number.isRequired, // 数据点类型
  }

  constructor(props) {
    super(props);
    this.state = {
      isAllDisable: this.props.isAlert, // 是否允许报警
      isDisable: new Map(), // 存每一个报警类型是否允许报警
    };
    this.isSingleDisable = []; // 每一个报警类型是否允许报警
    this.textDesRefs = []; // 每一种报警的注释
    this.textValRefs = []; // 每一种报警的报警值
    this.textStandRefs = []; // 基准值
    this.getRefValue = this.getRefValue.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.changeSingle = this.changeSingle.bind(this);
  }

  /**
    *  组件挂载完后，先初始化所有报警选择为不勾选状态
    *  然后根据数据库中的信息进行修改
    */
  componentDidMount() {
    Object.keys(ALERT_TYPES1).map(element => (
    this.setState({
      isDisable: this.state.isDisable.set(element, false),
    })
    ));
    Object.keys(ALERT_TYPES2).map(element => (
    this.setState({
      isDisable: this.state.isDisable.set(element, false),
    })
    ));
    // 如果允许报警
    //    报警参数格式如下：
    // {
    //     "level": 1,
    //     "default_info": "",
    //     "alerts": [
    //       {
    //         "alert_type": 2,
    //         "value": 100,
    //         "info":""
    //       },
    //       {
    //         "alert_type": 3,
    //         "value": 30,
    //         "info":""
    //       }
    //     ]
    //   }
    if (this.state.isAllDisable) {
      this.isAlert.checked = true;
      this.level.value = this.props.alertParams.level.toString(); // 报警级别
      this.alertDesc.value = this.props.alertParams.default_info; // 缺省报警注释
      // 解析报警信息
      if (this.props.alertParams.alerts.length > 0) {
        this.props.alertParams.alerts.map((element) => {
          // 如果数据点类型是“读数字量”类型，报警类型为“开关量”相关类型
          // 往字段里塞值
          if (this.props.nodeType === 2 || this.props.nodeType === 3) {
            Object.keys(ALERT_TYPES1).map((element1, index1) => {
              if (parseInt(element1, 10) === element.alert_type) {
                if (element1 === 1) {
                  this.textValRefs[0].value = element.value;
                }
                this.isSingleDisable[index1].checked = true;
                this.textDesRefs[index1].value = element.info;
                this.setState({
                  isDisable: this.state.isDisable.set(element1, true),
                });
              }
              return true;
            });
          } else if (this.props.nodeType === 1 || this.props.nodeType === 5) {
            // 如果数据点类型是"模拟量"类型，报警类型为“上下限”相关的类型
            // 往字段里塞值
            Object.keys(ALERT_TYPES2).map((element2, index2) => {
              if (parseInt(element2, 10) === element.alert_type) {
                if (parseInt(element2, 10) === 9) {
                  this.textStandRefs[0].value = element.standard;
                }
                if (parseInt(element2, 10) === 10) {
                  this.textStandRefs[1].value = element.standard;
                }
                this.isSingleDisable[index2].checked = true;
                this.textDesRefs[index2].value = element.info;
                this.textValRefs[index2].value = element.value;
                this.setState({
                  isDisable: this.state.isDisable.set(element2, true),
                });
              }
              return true;
            });
          }
          return true;
        });
      }
    }
  }

  getRefValue() {
    const alertInfos = []; // 对应alerts数组
    // 获取报警点信息
    // 如果数据点类型是“读数字量”类型，报警类型为“开关量”相关类型
    if (this.props.nodeType === 2 || this.props.nodeType === 3) {
      Object.keys(ALERT_TYPES1).map((element, index) => {
        // 如果勾选了报警且是“开关量报警”类型，则有参数中有value值（0或者1）
        if (parseInt(element, 10) === 1 && this.isSingleDisable[index].checked) {
          const alertInfo = {
            alert_type: 1, // 报警类型
            value: parseInt(this.textValRefs[0].value, 10), // 0或者1
            info: this.textDesRefs[index].value, // 报警注释
          };
          alertInfos.push(alertInfo); // 把json塞进数组里
        } else if (this.isSingleDisable[index].checked) {
          // 如果勾选了报警且不是“开关量报警”类型的其他“开关量”类型，则没有value值
          const alertInfo = {
            alert_type: parseInt(element, 10), // 报警类型
            info: this.textDesRefs[index].value, // 报警注释
          };
          alertInfos.push(alertInfo);
        }
        return alertInfos;
      });
    } else if (this.props.nodeType === 1 || this.props.nodeType === 5) {
      // 如果数据点类型是"模拟量"类型，报警类型为“上下限”相关的类型
      Object.keys(ALERT_TYPES2).map((element, index) => {
        // 如果勾选了报警且报警类型是“上下偏差报警”类型，则参数中有standard基准值
        if ((parseInt(element, 10) === 9 || parseInt(element, 10) === 10) && this.isSingleDisable[index] && this.isSingleDisable[index].checked) {
          const alertInfo = {
            alert_type: parseInt(element, 10),
            value: parseInt(this.textValRefs[index].value, 10),
            info: this.textDesRefs[index].value,
            standard: (parseInt(element, 10) === 9) ? parseInt(this.textStandRefs[0].value, 10) : parseInt(this.textStandRefs[1].value, 10), // 基准值对象存在textStandRefs数组中,[0]是下偏差报警,[1]是上偏差报警
          };
          alertInfos.push(alertInfo);
        } else if (this.isSingleDisable[index] && this.isSingleDisable[index].checked) {
          // 如果勾选了报警且报警类型不是“上下偏差报警”类型，则参数中没有standard基准值
          const alertInfo = {
            alert_type: parseInt(element, 10),
            value: parseInt(this.textValRefs[index].value, 10),
            info: this.textDesRefs[index].value,
          };
          alertInfos.push(alertInfo);
        }
        return alertInfos;
      });
    }
    // 报警总体信息，如果允许报警，则获取相应的字段值
    const alertParams = this.state.isAllDisable ? {
      level: parseInt(this.level.value, 10),
      default_info: this.alertDesc.value,
      alerts: alertInfos,
    } : {};
    // 报警的json结构，要返回到上层组件进行拼接的字段
    const json = {
      is_alert: this.state.isAllDisable, // 是否报警
      alert_params: alertParams, // 报警参数
    };
    return json;
  }

  /**
   * 数据点是否允许报警的切换函数
   */
  changeAll(e) {
    this.setState({
      isAllDisable: e.target.checked,
    });
  }

  /**
   * 各种报警类型是否允许报警的切换函数
   */
  changeSingle(key, e) {
    this.setState({
      isDisable: this.state.isDisable.set(key, e.target.checked),
    });
  }

  render() {
    let alertSet = []; // 报警设置信息数组
    // 如果是数字量类型
    if (this.props.nodeType === 2 || this.props.nodeType === 3) {
      alertSet = Object.keys(ALERT_TYPES1).map((element, index) => (
        <Row key={index}>
          <Col xs={1} style={{ marginTop: 4 }}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 0, height: 20 }}>
                {this.state.isAllDisable &&
                 <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isSingleDisable[index] = ref)} onChange={e => this.changeSingle(element, e)} />}
                {!this.state.isAllDisable &&
                 <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isSingleDisable[index] = ref)} checked={false} />}
              </FormGroup>
            </form>
          </Col>
          <Col xs={2} style={{ width: 120, padding: 0, marginTop: 4 }} componentClass={ControlLabel}>
            {ALERT_TYPES1[element]}
          </Col>
          <Col xs={8}>
            <Row>
              <Col xs={1} style={{ width: 80, padding: 0, marginTop: 4 }}>
                报警注释：
              </Col>
              <Col xs={9}>
                <form style={{ margin: 0 }}>
                  <FormGroup style={{ marginBottom: 2 }}>
                    <FormControl type="text" inputRef={ref => (this.textDesRefs[index] = ref)} readOnly={(!this.state.isAllDisable || !this.state.isDisable.get(element))} />
                  </FormGroup>
                </form>
              </Col>
            </Row>
            {parseInt(element, 10) === 1 &&
             <Row>
               <Col xs={1} style={{ width: 80, padding: 0, marginTop: 4 }}>
                 报警值：
               </Col>
               <Col xs={9}>
                 <form style={{ margin: 0 }}>
                   <FormGroup style={{ marginBottom: 2 }}>
                     {(this.state.isAllDisable && this.state.isDisable.get(element)) &&
                      <FormControl componentClass="select" inputRef={ref => (this.textValRefs[0] = ref)}>
                        <option value="1">
                          开
                        </option>
                        <option value="0">
                          关
                        </option>
                      </FormControl>}
                     {(!this.state.isAllDisable || !this.state.isDisable.get(element)) &&
                      <FormControl componentClass="select" inputRef={ref => (this.textValRefs[0] = ref)} style={{ backgroundColor: "#EEEEEE" }} disabled="disabled">
                        <option value="1">
                          开
                        </option>
                        <option value="0">
                          关
                        </option>
                      </FormControl>}
                   </FormGroup>
                 </form>
               </Col>
             </Row>}
          </Col>
        </Row>
      ));
    } else if (this.props.nodeType === 1 || this.props.nodeType === 5) {
      alertSet = Object.keys(ALERT_TYPES2).map((element, index) => (
        <Row key={index}>
          <Col xs={1} style={{ marginTop: 4 }}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 0, height: 20 }}>
                {!this.state.isAllDisable &&
                 <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isSingleDisable[index] = ref)} checked={false} />}
                {this.state.isAllDisable &&
                 <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isSingleDisable[index] = ref)} onChange={e => this.changeSingle(element, e)} />}
              </FormGroup>
            </form>
          </Col>
          <Col xs={2} style={{ width: 120, padding: 0, marginTop: 4 }} componentClass={ControlLabel}>
            {ALERT_TYPES2[element]}
          </Col>
          <Col xs={8}>
            <Row>
              <Col xs={1} style={{ width: 80, padding: 0, marginTop: 4 }}>
                报警注释：
              </Col>
              <Col xs={9}>
                <form style={{ margin: 0 }}>
                  <FormGroup style={{ marginBottom: 2 }}>
                    <FormControl type="text" inputRef={ref => (this.textDesRefs[index] = ref)} readOnly={(!this.state.isAllDisable || !this.state.isDisable.get(element))} />
                  </FormGroup>
                </form>
              </Col>
            </Row>
            <Row>
              <Col xs={1} style={{ width: 80, padding: 0, marginTop: 4 }}>
                报警值：
              </Col>
              <Col xs={9}>
                <form style={{ margin: 0 }}>
                  <FormGroup style={{ marginBottom: 2 }}>
                    <FormControl type="text" inputRef={ref => (this.textValRefs[index] = ref)} defaultValue={0} readOnly={(!this.state.isAllDisable || !this.state.isDisable.get(element))} />
                  </FormGroup>
                </form>
              </Col>
            </Row>
            {(parseInt(element, 10) === 9 || parseInt(element, 10) === 10) &&
             <Row>
               <Col xs={1} style={{ width: 80, padding: 0, marginTop: 4 }}>
                 基准值：
               </Col>
               <Col xs={9}>
                 <form style={{ margin: 0 }}>
                   <FormGroup style={{ marginBottom: 2 }}>
                     {parseInt(element, 10) === 9 &&
                      <FormControl type="text" inputRef={ref => (this.textStandRefs[0] = ref)} defaultValue={0} readOnly={(!this.state.isAllDisable || !this.state.isDisable.get(element))} />}
                     {parseInt(element, 10) === 10 &&
                      <FormControl type="text" inputRef={ref => (this.textStandRefs[1] = ref)} defaultValue={0} readOnly={(!this.state.isAllDisable || !this.state.isDisable.get(element))} />}
                   </FormGroup>
                 </form>
               </Col>
             </Row>}
          </Col>
        </Row>
      ));
    }
    // 报警级别
    const levelOption = Object.keys(LEVEL_TYPES).map((element, index) => (
      <option value={element} key={index}>
        {LEVEL_TYPES[element]}
      </option>
    ));
    // 整个报警设置的背景
    const isdis = this.state.isAllDisable ? {} : {
      backgroundColor: "#EEEEEE",
    };
    const dpedit = (
    <div>
      <Row style={{ marginTop: 10 }}>
        <Col xsOffset={1} xs={3} style={{ width: 130 }} componentClass={ControlLabel}>
          允许进行报警：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 0, height: 20 }}>
              <Checkbox style={{ margin: 0 }} inputRef={ref => (this.isAlert = ref)} onChange={this.changeAll} />
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          报警优先级：
        </Col>
        <Col xs={7}>
          <FormGroup style={{ marginBottom: 2 }}>
            {!this.state.isAllDisable &&
             <FormControl componentClass="select" onChange={this.change} inputRef={ref => (this.level = ref)} style={{ backgroundColor: "#EEEEEE" }} disabled="disabled">
               {levelOption}
             </FormControl>}
            {this.state.isAllDisable &&
             <FormControl componentClass="select" onChange={this.change} inputRef={ref => (this.level = ref)}>
               {levelOption}
             </FormControl>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, marginLeft: 50, width: 130 }}>
          报警缺省注释：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 2 }}>
              <FormControl componentClass="textarea" style={{ resize: "none" }} inputRef={ref => (this.alertDesc = ref)} readOnly={!this.state.isAllDisable} />
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Row style={{ marginLeft: 35, marginTop: 10, marginRight: 30 }}>
        <Panel header={"报警设置"} style={isdis}>
          <Col style={{ overflow: "auto", overflowX: "hidden", width: 480, height: 200 }}>
            {alertSet}
          </Col>
        </Panel>
      </Row>
    </div>);

    return (
      <div>
        {dpedit}
      </div>
      );
  }
}

import React, { Component, PropTypes } from "react";
import { FormGroup, FormControl, option, Col, Row } from "react-bootstrap";
import moment from "moment";
import Datetime from "react-datetime";
import "./react-datetime.css";
import style from "./Curve.scss";
import SelectCol from "./SelectCol";

/**
 * CurveTemp：添加曲线类
 */
export default class CurveTemp extends Component {
  static propTypes = {
    listDataSource: PropTypes.array.isRequired, // 数据源点的综合信息
    cjlen: PropTypes.number.isRequired, // 当前数据曲线的长度（有几个曲线了，用做生成id用）
  }

  constructor(props) {
    super(props);
    this.state = {
      selectId: "0",
      startTime: moment().format("YYYY-MM-DD HH:mm:ss"), // 起始时间
      endTime: moment().format("YYYY-MM-DD HH:mm:ss"), // 结束时间
    };
    this.getJson = this.getJson.bind(this);
    this.change = this.change.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
  }

  /**
   * 外层调用此方法获取曲线json
   */
  getJson() {
    const json = {
      id: this.props.cjlen + 1, // 根据长度生成id，拼成唯一key用
      garphName: this.name.value, // 图名称
      width: 550, // 图宽
      height: 300, // 图高
      startTime: moment(this.state.startTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(this.state.endTime).format("YYYY-MM-DD HH:mm:ss"),
      isGrid: true, // 是否有网格
      isTooltip: true, // 点上是否有详细信息提示
      isrealtime: this.state.selectId === "1", // 是否是实时查询
      xLabel: this.xlabel.value, // x轴名称
      yLabel: this.ylabel.value, // y轴名称
      refresh: this.rate ? parseInt(this.rate.value, 10) : 10, // 刷新频率
      dataNum: this.num ? parseInt(this.num.value, 10) : 10, // 展示的数据点个数
      // 数据点的信息，选择了几个
      dataInfo: this.selectPoints.state.value.map(element => (
      {
        dataPointId: element.value, // 数据点id
        type: "monotone", // 曲线类型
        curveName: element.label, // 曲线名称
      }
      )),
    };
    // 历史查询的时候起始时间要小于结束时间
    if (json.endTime < json.startTime) {
      alert("错误：结束时间必须不小于起始时间！");
    } else {
      return json;
    }
  }

  /**
   * 改变起始时间
   */
  handleChangeStartTime(event) {
    this.setState({
      startTime: event._d,
    });
  }

  /**
   * 改变结束时间
   */
  handleChangeEndTime(event) {
    this.setState({
      endTime: event._d,
    });
  }

  /**
   * 改变查询类型，实时还是历史查询
   */
  change(e) {
    this.setState({
      selectId: e.target.value,
    });
  }

  render() {
    // 获得数据源和数据点组合的信息
    const sourcelist = this.props.listDataSource;
    // 拼接react-select需要的格式
    const showPoint = [];
    if (sourcelist.length > 0) {
      // 只有一个数据源的时候，显示的选择点中的label名称为：数据点名称+数据点id
      if (sourcelist.length === 1) {
        sourcelist.map((element) => {
          if (element.nodes.length > 0) {
            element.nodes.map(element1 => (
            showPoint.push({
              value: element1.data_node_id,
              label: `${element1.data_node_name}(${element1.data_node_id})`,
            })
            ));
          }
          return true;
        });
      } else {
        // 有多个数据源的时候，显示的选择点中的label名称为：数据源名称+数据点名称+数据点id
        sourcelist.map((element) => {
          if (element.nodes.length > 0) {
            element.nodes.map(element1 => (
            showPoint.push({
              value: element1.data_node_id,
              label: `${element.data_source_name}:${element1.data_node_name}(${element1.data_node_id})`,
            })
            ));
          }
          return true;
        });
      }
    }

    const dsinfor = (
    <div className={style.margin}>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          曲线图名称：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 2 }}>
              <FormControl type="text" inputRef={ref => (this.name = ref)} placeholder="xx随时间变化图" />
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          查询类型：
        </Col>
        <Col xs={7}>
          <FormGroup style={{ marginBottom: 2 }}>
            <FormControl componentClass="select" inputRef={ref => (this.select = ref)} onChange={this.change}>
              <option value="0">
                历史查询
              </option>
              <option value="1">
                实时查询
              </option>
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
      <SelectCol options={showPoint} ref={ref => (this.selectPoints = ref)} changeoptions={[]} title={"数据点"} />
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          X轴名称：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 2 }}>
              <FormControl type="text" defaultValue={"时间"} inputRef={ref => (this.xlabel = ref)} />
            </FormGroup>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
          Y轴名称：
        </Col>
        <Col xs={7}>
          <form style={{ margin: 0 }}>
            <FormGroup style={{ marginBottom: 2 }}>
              <FormControl type="text" defaultValue={"值"} inputRef={ref => (this.ylabel = ref)} />
            </FormGroup>
          </form>
        </Col>
      </Row>
      {this.state.selectId === "0" &&
       <Row>
         <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
           起始时间：
         </Col>
         <Col xs={7}>
           <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.startTime} onChange={this.handleChangeStartTime} />
         </Col>
       </Row>}
      {this.state.selectId === "0" &&
       <Row>
         <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
           结束时间：
         </Col>
         <Col xs={7}>
           <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.endTime} onChange={this.handleChangeEndTime} />
         </Col>
       </Row>}
      {this.state.selectId === "1" &&
       <Row>
         <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
           刷新频率：
         </Col>
         <Col xs={7}>
           <form style={{ margin: 0 }}>
             <FormGroup style={{ marginBottom: 2 }}>
               <FormControl type="text" inputRef={ref => (this.rate = ref)} />
             </FormGroup>
           </form>
         </Col>
       </Row>}
      {this.state.selectId === "1" &&
       (<Row>
          <Col xsOffset={1} xs={3} style={{ marginTop: 8, width: 130 }}>
            展示个数：
          </Col>
          <Col xs={7}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 2 }}>
                <FormControl type="text" inputRef={ref => (this.num = ref)} />
              </FormGroup>
            </form>
          </Col>
        </Row>)}
    </div>);

    return (
      <div>
        {dsinfor}
      </div>
      );
  }
}

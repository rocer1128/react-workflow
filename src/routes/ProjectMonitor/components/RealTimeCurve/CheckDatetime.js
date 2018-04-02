import React, { Component, PropTypes } from "react";
import Datetime from "react-datetime";
import { Button, Col, Row, FormGroup } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";
import "./react-datetime.css";

/**
 * CheckDatetime：历史查询类
 */
export default class CheckDatetime extends Component {
  static propTypes = {
    st: PropTypes.string.isRequired, // 起始时间
    et: PropTypes.string.isRequired, // 结束时间
    renderJson: PropTypes.func.isRequired, // 改变json
    index: PropTypes.number.isRequired, // 索引，第几个
    id: PropTypes.number.isRequired, // 拼唯一key的id值
    dataInfo: PropTypes.array.isRequired, // 数据点信息
    listDataSource: PropTypes.array.isRequired, // 数据源点综合信息
    getHistory: PropTypes.func.isRequired, // 查询历史数据方法
    deleteHistory: PropTypes.func.isRequired, // 删除历史数据方法
    PointId: PropTypes.array.isRequired, // 数据点数组
  }

  constructor(props) {
    super(props);
    const dataInfo = this.props.dataInfo; // 数据点信息
    const inputoptions = []; // 获取已选择的数据点
    dataInfo.map(element => (
    inputoptions.push({
      value: element.dataPointId,
      label: element.curveName,
    })
    ));
    this.state = {
      startTime: this.props.st,
      endTime: this.props.et,
      value: inputoptions, // 选择的数据点数组
    };
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkDataHistory = this.checkDataHistory.bind(this);
    this.transReal = this.transReal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataInfo = nextProps.dataInfo; // 数据点信息
    const inputoptions = []; // 获取已选择的数据点
    dataInfo.map(element => (
    inputoptions.push({
      value: element.dataPointId,
      label: element.curveName,
    })
    ));
    this.setState({
      value: inputoptions, // 选择的数据点数组
    });
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
   * 改变选择的数据点
   */
  handleSelectChange(value) {
    this.setState({
      value,
    });
  }

  /**
   * 点击“查询历史”执行的函数
   */
  checkDataHistory() {
    const st = moment(this.state.startTime).format("YYYY-MM-DD HH:mm:ss");
    const et = moment(this.state.endTime).format("YYYY-MM-DD HH:mm:ss");
    if (et < st) {
      alert("错误：结束时间必须不小于起始时间！");
      return;
    }
    // 第一步：去除已经在MAP里的数据
    if (this.props.PointId.length > 0) {
      this.props.PointId.map(ids => (
      this.props.deleteHistory(String(this.props.id) + String(ids))
      ));
    }
    // 第二步：修改数据点，取到选择的数据点
    const dataJson = this.state.value.map(element => (
    {
      dataPointId: element.value,
      type: "monotone",
      curveName: element.label,
    }
    ));
    // 曲线图json改变的部分
    const changPart = {
      startTime: st,
      endTime: et,
      dataInfo: dataJson,
      isrealtime: false,
    };
    // 访问数据库，查找历史数据
    let json;
    this.state.value.map((element) => {
      json = {
        data_node_id: element.value,
        start_date: st,
        end_date: et,
        number: null,
      };
      // 得到历史数据的方法
      this.props.getHistory(json, String(this.props.id) + String(element.value));
      return true;
    });
    // 把改变的json结构传给外层
    this.props.renderJson(changPart, this.props.index, true);
  }

  /**
   * 点击“实时查询”执行的函数
   */
  transReal() {
    // 改变的部分，是否是实时查询变为true
    const changPart = {
      isrealtime: true,
    };
    // 第一步：去除已经在MAP里的数据
    if (this.props.PointId.length > 0) {
      this.props.PointId.map(ids => (
      this.props.deleteHistory(String(this.props.id) + String(ids))
      ));
    }
    // 把改变的json结构传给外层
    this.props.renderJson(changPart, this.props.index, false);
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

    return (
      <div>
        <Row style={{ marginTop: 10, marginBottom: 10 }}>
          <Col xs={2} style={{ marginTop: 8, width: 60, padding: 0, marginLeft: 30 }}>
            起始时间:
          </Col>
          <Col xs={3} style={{ width: 100, padding: 0, marginLeft: 10 }}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.startTime} onChange={this.handleChangeStartTime} />
          </Col>
          <Col xs={2} style={{ marginTop: 8, width: 60, padding: 0, marginLeft: 5 }}>
            结束时间:
          </Col>
          <Col xs={3} style={{ width: 100, padding: 0, marginLeft: 10 }}>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={this.state.endTime} onChange={this.handleChangeEndTime} />
          </Col>
          <Col xs={2} style={{ padding: 0, marginLeft: 5, width: 85 }}>
            <Button bsStyle="primary" onClick={this.checkDataHistory}>
              查询历史
            </Button>
          </Col>
          <Col xs={2} style={{ padding: 0, width: 85 }}>
            <Button bsStyle="success" onClick={this.transReal}>
              实时查询
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col xs={2} style={{ marginTop: 8, width: 60, padding: 0, marginLeft: 30 }}>
            数据点：
          </Col>
          <Col xs={9} style={{ padding: 0, marginLeft: 10 }}>
            <form style={{ margin: 0 }}>
              <FormGroup style={{ marginBottom: 2 }}>
                <Select
                  noResultsText={"请先定义数据点"}
                  onChange={this.handleSelectChange}
                  placeholder="请选择数据点"
                  multi
                  value={this.state.value}
                  options={showPoint}
                />
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
      );
  }

}

import React, { Component, PropTypes } from "react";
import { Button, Col, Row, FormControl, FormGroup } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";

/**
 * RealTimeShow：实时查询类
 */
export default class RealTimeShow extends Component {
  static propTypes = {
    refresh: PropTypes.number.isRequired, // 刷新频率
    dataNum: PropTypes.number.isRequired, // 展示个数
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
      interval: [],
      value: inputoptions, // 选择的数据点数组
    };
    this.checkRealData = this.checkRealData.bind(this);
    this.transHistory = this.transHistory.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /**
   * 挂载完后往字段里塞值
   */
  componentDidMount() {
    this.rate.value = this.props.refresh;
    this.num.value = this.props.dataNum;
    if (this.props.PointId.length > 0) {
      this.props.PointId.map((ids, index) => {
        // 更改时先停止之前的刷新
        if (this.state.interval[index]) {
          clearInterval(this.state.interval[index]);
        }
        // 调用数据库的方法
        const shownum = this.num.value ? this.num.value : null;
        this.state.interval[index] = setInterval(() => {
          const json = {
            data_node_id: ids,
            start_date: null,
            end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            number: parseInt(shownum, 10),
          };
          this.props.getHistory(json, String(this.props.id) + String(ids));
        }, parseInt(this.rate.value ? this.rate.value * 1000 : 60000, 10));
        return true;
      });
    }
    window.addEventListener("beforeunload", this.onUnload);
    window.addEventListener("unload", this.handleDestroy);
  }

  /**
  * 卸载的时候停止刷新
  */
  componentWillUnmount() {
    this.handleDestroy();
    window.removeEventListener("beforeunload", this.onUnload);
    window.removeEventListener("unload", this.handleDestroy);
  }

  /**
   * 作为beforeunload事件的回调函数
   */
  onUnload = (event) => {
    const e = event;
    e.returnValue = "离开该网站";
  }
  /**
   * 在页面关闭或刷新时，关闭连接的操作
   */
  handleDestroy = () => {
    if (this.props.PointId.length > 0) {
      this.props.PointId.map((ids, index) => {
        if (this.state.interval[index]) {
          clearInterval(this.state.interval[index]);
        }
        return true;
      });
    }
  }

  /**
   * 点击“查询实时”执行的函数
   */
  checkRealData() {
    // 第一步：更改时先停止之前的刷新
    if (this.props.PointId.length > 0) {
      this.props.PointId.map((ids, index) => {
        if (this.state.interval[index]) {
          clearInterval(this.state.interval[index]);
          this.props.deleteHistory(String(this.props.id) + String(ids));
        }
        return true;
      });
    }
    // 第二步：修改数据点
    const dataJson = this.state.value.map(element => (
    {
      dataPointId: element.value,
      type: "monotone",
      curveName: element.label,
    }
    ));

    // 曲线图json改变的部分
    const changPart = {
      refresh: parseInt(this.rate.value ? this.rate.value : 600, 10),
      dataNum: parseInt(this.num.value ? this.num.value : null, 10),
      dataInfo: dataJson,
      isrealtime: true,
    };

    // 访问数据库，更新数据
    this.state.value.map((element, index) => {
      // 先运行一次，然后在进入每隔x秒的更新
      const oncejson = {
        data_node_id: element.value,
        start_date: null,
        end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        number: parseInt(this.num.value ? this.num.value : null, 10),
      };
      this.props.getHistory(oncejson, String(this.props.id) + String(element.value));

      this.state.interval[index] = setInterval(() => {
        console.log("实时调用");
        const json = {
          data_node_id: element.value,
          start_date: null,
          end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
          number: parseInt(this.num.value ? this.num.value : null, 10),
        };
        this.props.getHistory(json, String(this.props.id) + String(element.value));
      }, parseInt(this.rate.value ? this.rate.value * 1000 : 60000, 10));
      return true;
    });
    this.props.renderJson(changPart, this.props.index, true);
  }

  /**
   * 改变数据点
   */
  handleSelectChange(value) {
    this.setState({
      value,
    });
  }

  /**
   * 点击“历史查询”执行的函数
   */
  transHistory() {
    // 转换成历史查询的时候停止刷新
    if (this.props.PointId.length > 0) {
      this.props.PointId.map((ids, index) => {
        if (this.state.interval[index]) {
          clearInterval(this.state.interval[index]);
          this.props.deleteHistory(String(this.props.id) + String(ids));
        }
        return true;
      });
    }
    // 改变的部分，是否是实时查询变为false
    const changPart = {
      isrealtime: false,
    };
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
            刷新频率:
          </Col>
          <Col xs={3} style={{ width: 100, padding: 0, marginLeft: 10 }}>
            <form>
              <FormGroup style={{ margin: 0 }}>
                <FormControl type="text" inputRef={ref => (this.rate = ref)} />
              </FormGroup>
            </form>
          </Col>
          <Col xs={2} style={{ marginTop: 8, width: 60, padding: 0, marginLeft: 5 }}>
            展示个数:
          </Col>
          <Col xs={3} style={{ width: 100, padding: 0, marginLeft: 10 }}>
            <form>
              <FormGroup style={{ margin: 0 }}>
                <FormControl type="text" inputRef={ref => (this.num = ref)} />
              </FormGroup>
            </form>
          </Col>
          <Col xs={2} style={{ padding: 0, marginLeft: 5, width: 85 }}>
            <Button bsStyle="primary" onClick={this.checkRealData}>
              查询实时
            </Button>
          </Col>
          <Col xs={2} style={{ padding: 0, width: 85 }}>
            <Button bsStyle="success" onClick={this.transHistory}>
              历史查询
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

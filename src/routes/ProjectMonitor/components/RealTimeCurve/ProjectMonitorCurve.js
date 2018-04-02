import React, { Component, PropTypes } from "react";
import moment from "moment";
import CurveShow from "./CurveShow";
import AddCurve from "./AddCurve";

/**
 * ProjectMonitorCurve：数据曲线类
 */
export default class ProjectMonitorCurve extends Component {
  static propTypes = {
    DataInfo: PropTypes.object.isRequired, // 数据方法
    projectId: PropTypes.number.isRequired, // 工程id
    CurveInfo: PropTypes.object.isRequired, // 曲线方法
  }

  constructor(props) {
    super(props);
    this.state = {
      curveJson: [], // 曲线组的json
      ishow: new Map(), // 曲线是否显示
      color: new Map(), // 曲线的颜色
    };
    this.addCurveClick = this.addCurveClick.bind(this);
    this.renderJson = this.renderJson.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.newCreate = this.newCreate.bind(this);
    this.clickShow = this.clickShow.bind(this);
  }

  /**
   * 如果点击了某个曲线组标签（curveIndex >= 0），而且这一次点击和上一次点的标签不同，则改变当前存储的曲线Json
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.CurveInfo.curveIndex >= 0 && nextProps.CurveInfo.curveIndex !== this.props.CurveInfo.curveIndex) {
      if (nextProps.CurveInfo.listDataCurve[nextProps.CurveInfo.curveIndex]) {
        // 深拷贝json对象
        const singleJson = this.copy([], nextProps.CurveInfo.listDataCurve[nextProps.CurveInfo.curveIndex].data.data);
        this.setState({
          curveJson: singleJson,
        });
      }
    }
  }

  // 检查类型及深拷贝
  getType = (o) => {
    const _t = typeof (o);
    return ((_t) === "object" ? o === null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
  }
  copy = (destination, source) => {
    const de = destination;
    for (const p in source) {
      if (this.getType(source[p]) === "array" || this.getType(source[p]) === "object") {
        de[p] = this.getType(source[p]) === "array" ? [] : {};
        this.copy(de[p], source[p]);
      } else {
        de[p] = source[p];
      }
    }
    return destination;
  }

  /**
   * 外部点击左侧”数据曲线“下方的”xx组“时执行的函数
   * @param  {Number} index [显示的数据组index]
   */
  clickShow(index) {
    // 第一步：去掉已经在Map里的数据
    this.state.curveJson.map((element) => {
      const { dataInfo } = element;
      let injectKey = "";
      if (dataInfo.length > 0) {
        dataInfo.map((points) => {
          injectKey = String(element.id) + String(points.dataPointId); // 拼唯一key
          this.props.DataInfo.deleteHistory(injectKey);
          return true;
        });
      }
      return true;
    });
    // 第二步：先把各个曲线的show改为true，然后去执行各个json的内容，加载出曲线
    const showJson = this.props.CurveInfo.listDataCurve[index].data.data;
    if (showJson.length > 0) {
      showJson.map((element) => {
        this.setState({
          ishow: this.state.ishow.set(element.id, true),
        });
        this.excuteJson(element); // 执行json中描述的加载方式（实时还是历史查询）
        return true;
      });
    }
  }

  /**
   * 点击“添加曲线图”按钮执行的函数
   * @param  {object} json [新添加的曲线json]
   */
  addCurveClick(json) {
    const tempJson = this.state.curveJson; // 先获取当前曲线组中的曲线json
    tempJson.push(json); // 把新添加的曲线json加到曲线组里
    this.setState({
      curveJson: tempJson,
      ishow: this.state.ishow.set(json.id, true),
    });
    this.excuteJson(json); // 执行json中描述的加载方式（实时还是历史查询）
  }

  /**
   * 执行json中描述的加载方式（实时还是历史查询）
   * @param  {objectect} json [新添加的曲线json]
   */
  excuteJson = (json) => {
    const { dataInfo, startTime, endTime, isrealtime, dataNum } = json;
    let injectKey = ""; // 唯一标识key
    let checkJson = {};
    // 如果是历史查询
    if (dataInfo.length > 0 && !isrealtime) {
      dataInfo.map((points) => {
        injectKey = String(json.id) + String(points.dataPointId);
        checkJson = {
          data_node_id: points.dataPointId,
          start_date: startTime,
          end_date: endTime,
          number: null,
        };
        // 给当前曲线设置颜色
        this.setState({
          color: this.state.color.set(injectKey, `RGB(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`),
        });
        // 查询历史数据
        this.props.DataInfo.getHistory(checkJson, injectKey);
        return true;
      });
    } else if (isrealtime && dataInfo.length > 0) {
      // 如果是实时查询
      dataInfo.map((points) => {
        injectKey = String(json.id) + String(points.dataPointId);
        checkJson = {
          data_node_id: points.dataPointId,
          start_date: null,
          end_date: moment().format("YYYY-MM-DD HH:mm:ss"),
          number: parseInt(dataNum || null, 10),
        };
        this.setState({
          color: this.state.color.set(injectKey, `RGB(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`),
        });
        this.props.DataInfo.getHistory(checkJson, injectKey);
        return true;
      });
    }
  }

  /**
   * "保存当前曲线组"的函数
   * @param  {string} name [曲线组名称]
   */
  save(name) {
    // 如果是在没有点击某个曲线组（即是在新增曲线组）的时候点的保存，调用新建曲线组的方法
    if (this.props.CurveInfo.curveIndex < 0) {
      const json = {
        project_id: this.props.projectId, // 新建要有工程id
        name,
        data: {
          data: this.state.curveJson,
        },
      };
      this.props.CurveInfo.addDataCurves(json); // 新建曲线组方法
      this.props.CurveInfo.curveIndexShow(this.props.CurveInfo.listDataCurve.length); // 选择的要展示的曲线组(新添加的这个)
    } else {
      // 如果是点击某个曲线组的时候点的保存，调用更新曲线组的方法
      const json = {
        id: this.props.CurveInfo.listDataCurve[this.props.CurveInfo.curveIndex].id, // 更新要有曲线组id
        name,
        data: {
          data: this.state.curveJson,
        },
      };
      this.props.CurveInfo.updateDataCurves(json); // 更新曲线组
    }
  }

  /**
   * "删除当前曲线组"的函数
   */
  delete() {
    // 如果是在点击了某个曲线组的时候点的删除，调用删除曲线组的方法
    if (this.props.CurveInfo.curveIndex >= 0 && this.props.CurveInfo.listDataCurve[this.props.CurveInfo.curveIndex].id) {
      const deleteId = this.props.CurveInfo.listDataCurve[this.props.CurveInfo.curveIndex].id; // 要删除的id
      this.props.CurveInfo.deleteDataCurves(deleteId); // 删除曲线组的方法
      this.props.CurveInfo.curveIndexShow(-1); // 删除完后，把展示的曲线组标签改为-1（即不显示某个组）
      this.setState({
        curveJson: [], // 把数据曲线的json置成空
      });
    } else {
      return true;
    }
  }

  /**
   * "新增曲线组"的函数，点击的时候把展示的标签置-1,数据曲线置空
   */
  newCreate() {
    this.props.CurveInfo.curveIndexShow(-1);
    this.setState({
      curveJson: [],
    });
  }

  /**
   * 修改曲线组中某个图的json
   * @param  {objectt} json   [改变的图json]
   * @param  {numberr} index  [改变的是哪个图]
   * @param  {bool} isshow [是否显示]
   */
  renderJson(json, index, isshow) {
    const origJson = this.state.curveJson; // 获取原来的json
    Object.assign(origJson[index], json); // 更改json
    this.setState({
      curveJson: origJson,
      ishow: this.state.ishow.set(origJson[index].id, isshow),
    });
    // 设置颜色
    let injectKey = "";
    if (origJson[index].dataInfo.length > 0) {
      origJson[index].dataInfo.map((points) => {
        injectKey = String(origJson[index].id) + String(points.dataPointId);
        this.setState({
          color: this.state.color.set(injectKey, `RGB(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`),
        });
        return true;
      });
    }
  }

  render() {
    return (
      <div>
        <AddCurve save={this.save} newCreate={this.newCreate} CurveInfo={this.props.CurveInfo} delete={this.delete} />
        <CurveShow
          renderJson={this.renderJson}
          chartJson={this.state.curveJson}
          addCurveClick={this.addCurveClick}
          listDataSource={this.props.DataInfo.listDataSource}
          color={this.state.color}
          ishow={this.state.ishow}
          DataInfo={this.props.DataInfo}
        />
      </div>
      );
  }
}

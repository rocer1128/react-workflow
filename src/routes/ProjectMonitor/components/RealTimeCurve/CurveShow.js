import React, { Component, PropTypes } from "react";
import { Panel, Modal, Button } from "react-bootstrap";
import { LineChart, XAxis, YAxis, Tooltip, Brush, CartesianGrid, Legend, Line } from "recharts";
import moment from "moment";
import CheckDatetime from "./CheckDatetime";
import RealTimeShow from "./RealTimeShow";
import CurveTemp from "./CurveTemp";

/**
 * CurveShow：曲线展示类
 */
export default class CurveShow extends Component {
  static propTypes = {
    renderJson: PropTypes.func.isRequired, // 更改json的方法
    chartJson: PropTypes.array.isRequired, // 数据曲线的整体json
    addCurveClick: PropTypes.func.isRequired, // 添加曲线图方法
    listDataSource: PropTypes.array.isRequired, // 数据源点综合信息数组
    color: PropTypes.object.isRequired, // 曲线颜色
    ishow: PropTypes.object.isRequired, // 曲线是否显示
    DataInfo: PropTypes.object.isRequired, // 数据的一些方法
  }

  /**
   * 转换数据表现形式
   * @param  {string} data [数据形式，这里是时间格式]
   * @return {string}      [返回你要的格式]
   */
  static formatDatas(data) {
    const dsp = data.split("-")[2].split(" ")[1].split(":");
    return (`${dsp[1]}:${dsp[2]}`);
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  /**
  * 弹出"添加曲线图"模态框
  */
  showModal = () => {
    this.setState({
      show: true,
    });
  }

  /**
  * 关闭"添加曲线图"模态框
  */
  hideModal = () => {
    this.setState({
      show: false,
    });
  }

  /**
  * 新建曲线图函数
  */
  create = () => {
    const json = this.temp.getJson(); // 获得曲线json
    if (json) {
      this.props.addCurveClick(json);
      this.hideModal();
    }
  }

  render() {
    // 如果数据曲线的整体json不是空数组的话
    const curves = this.props.chartJson.length > 0 ? this.props.chartJson.map((element, index) => {
      const { width, height, garphName, isGrid, isTooltip, xLabel, yLabel, refresh, dataNum, startTime, endTime, dataInfo } = element; // 结构出参数
      const allData = []; // 给recharts组件的数据格式
      let pointData = []; // 数据点数组
      let injectKey = ""; // 唯一标识id
      const pointsIds = []; // 数据点的id数组

      const line = dataInfo.length > 0 ? dataInfo.map((points, pindex) => {
        // 拼唯一id
        injectKey = String(element.id) + String(points.dataPointId);
        // 存数据点id
        pointsIds.push(points.dataPointId);
        // 根据id取数据
        if (this.props.DataInfo.listHistory.get(injectKey)) {
          pointData = this.props.DataInfo.listHistory.get(injectKey);
        }
        // 把每个数据点的数据拼成recharts要的data结构
        // allData还是空数组的时候，即第一次塞值
        if (allData.length === 0 && pointData && pointData.length > 0) {
          pointData.map((unitdata) => {
            allData.push({
              [points.curveName]: parseInt(unitdata.value, 10),
              time: moment(unitdata.time).format("YYYY-MM-DD HH:mm:ss"),
            });
            return true;
          });
        }
        // allData已经有数据的时候，合并对象
        if (allData.length > 0 && pointData && pointData.length > 0) {
          pointData.map((unitdata, unitindex) => {
            Object.assign(allData[unitindex], {
              [points.curveName]: parseInt(unitdata.value, 10),
              time: moment(unitdata.time).format("YYYY-MM-DD HH:mm:ss"),
            });
            return true;
          });
        }
        // 返回要画的曲线
        return (<Line isAnimationActive={false} key={pindex} type={points.type} dataKey={points.curveName} stroke={this.props.color.get(injectKey)} />);
      }) : [];
      // 如果是历史查询情况下
      if (dataInfo.length > 0 && !element.isrealtime) {
        // 每个图的总体结构
        return (
          <div style={{ width: width + 10, height: height + 150, marginTop: 20, float: "left", border: "1px solid  #DDDDDD" }} key={index}>
            <CheckDatetime
              st={startTime}
              et={endTime}
              renderJson={this.props.renderJson}
              index={index}
              id={element.id}
              dataInfo={dataInfo}
              listDataSource={this.props.DataInfo.listDataSource}
              getHistory={this.props.DataInfo.getHistory}
              deleteHistory={this.props.DataInfo.deleteHistory}
              PointId={pointsIds}
            />
            <div style={{ textAlign: "center", fontSize: 14 }}>
              <h4>{garphName}</h4>
            </div>
            {this.props.ishow.get(element.id) &&
             <LineChart width={width} height={height} data={allData} style={{ fontSize: 6 }} margin={{ top: 30, right: 30, left: 5, bottom: 5 }}>
               <XAxis dataKey="time" label={xLabel} fontSize={6} tickFormatter={this.formatDatas} />
               <YAxis label={yLabel} />
               {isGrid && <CartesianGrid strokeDasharray="3 3" />}
               {isTooltip && <Tooltip />}
               <Legend align="center" />
               {line}
               <Brush />
             </LineChart>}
          </div>
          );
      } else if (dataInfo.length > 0 && element.isrealtime) {
        // 如果是实时查询情况下
        return (
          <div style={{ width: width + 10, height: height + 150, marginTop: 20, float: "left", border: "1px solid  #DDDDDD" }} key={index}>
            <RealTimeShow
              PointId={pointsIds}
              listDataSource={this.props.DataInfo.listDataSource}
              index={index}
              renderJson={this.props.renderJson}
              dataInfo={dataInfo}
              id={element.id}
              getHistory={this.props.DataInfo.getHistory}
              deleteHistory={this.props.DataInfo.deleteHistory}
              refresh={refresh}
              dataNum={dataNum}
            />
            <div style={{ textAlign: "center", fontSize: 14 }}>
              <h4>{garphName}</h4>
            </div>
            {this.props.ishow.get(element.id) &&
             <LineChart
               syncId="anyId"
               width={width}
               height={height}
               data={allData}
               style={{ fontSize: 6 }}
               margin={{ top: 30, right: 30, left: 5, bottom: 5 }}
             >
               <XAxis dataKey="time" label={xLabel} fontSize={6} tickFormatter={this.formatDatas} />
               <YAxis label={yLabel} />
               {isGrid && <CartesianGrid strokeDasharray="3 3" />}
               {isTooltip && <Tooltip />}
               <Legend align="center" />
               {line}
             </LineChart>}
          </div>
          );
      }
      return [];
    }) : [];

    return (
      <Panel header={"数据曲线"}>
        <div style={{ height: 50, width: "100%" }}>
          <Button bsStyle="primary" onClick={this.showModal} style={{ float: "right" }}>
            添加曲线图
          </Button>
          <Modal show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                添加曲线图
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CurveTemp listDataSource={this.props.listDataSource} cjlen={this.props.chartJson.length} ref={ref => (this.temp = ref)} />
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
        <div>
          {curves}
        </div>
      </Panel>
      );
  }
}

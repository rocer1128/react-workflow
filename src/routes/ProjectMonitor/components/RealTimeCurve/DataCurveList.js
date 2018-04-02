import React, { Component, PropTypes } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

/**
 * DataCurveList：展示数据曲线组列表类
 */
export default class DataCurveList extends Component {
  static propTypes = {
    listDataCurve: PropTypes.array.isRequired, // 数据曲线列表
    curveIndex: PropTypes.number.isRequired, // 点击的数据曲线组标签索引
    curveIndexShow: PropTypes.func.isRequired, // 选择的要展示的曲线组方法
    curveGetShow: PropTypes.func.isRequired, // 加载要展示的曲线组方法
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.curveIndexShow(parseInt(e.target.value, 10));
    this.props.curveGetShow(parseInt(e.target.value, 10));
  }

  render() {
    const cols = (this.props.listDataCurve.length > 0) ? this.props.listDataCurve.map((element, index) => (
      <ListGroupItem active={this.props.curveIndex === index} key={index} value={index} onClick={this.handleClick} bsStyle="info">
        {element.name}
      </ListGroupItem>
    ),
    ) : [];

    return (
      <ListGroup>
        {cols}
      </ListGroup>
      );
  }
}

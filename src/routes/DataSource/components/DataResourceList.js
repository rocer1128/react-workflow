import React, { Component, PropTypes } from "react";
import { Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import ShowData from "./ShowData";

/**
 * DataResourceList：数据源列表
 */
export default class DataResourceList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据源列表
    dataSourceMethod: PropTypes.object.isRequired, // 数据源各种方法的对象
    dataPointMethod: PropTypes.object.isRequired, // 数据点各种方法的对象
  }
  constructor(props) {
    super(props);
    this.state = {
      clickindex: "", // 激活标签，代表点击的是哪一个数据源
      isshow: false, // 是否显示右侧数据源信息栏（数据源信息/数据点列表）
      tabkey: 1, // 代表当前是在哪个Tab页（数据源信息/数据点列表）
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * 接收新props时，这边是判断数据源列表的长度有没有改变，如果变长，即添加了新的数据源，则激活标签"clickindex"显示为最新添加的这个
   * 同时显示右侧信息栏（isshow: true），Tab页为数据源信息（tabkey: 1）
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.dataSource.length && nextProps.dataSourceMethod.dataSource.importRefresh === false) {
      if (nextProps.dataSource.length > this.props.dataSource.length) {
        this.setState({
          clickindex: nextProps.dataSource.length - 1,
          isshow: true,
          tabkey: 1,
        });
      }
    } else if (nextProps.dataSourceMethod.dataSource.importRefresh === true) {
      this.setState({
        clickindex: "",
        isshow: false,
        tabkey: 1,
      });
    }
  }

  /**
   * 子组件“ShowData”里点击"删除数据源"要做的事情之一：不显示右侧信息栏（isshow: false）
   */
  handleDelete() {
    this.setState({
      isshow: false,
    });
  }

  /**
   * 点击左侧数据源标签时：修改激活标签clickindex，显示右侧信息栏isshow，Tab页改为数据源信息（tabkey: 1）
   */
  handleClick(e) {
    this.setState({
      clickindex: parseInt(e.target.value, 10),
      isshow: true,
      tabkey: 1,
    });
  }

  /**
   * 子组件“ShowData”里点击Tab页（数据源信息/数据点列表）做的事情：
   * 1. 如果点击的是“数据点列表”，则加载当前激活数据源（this.state.clickindex）下的数据点信息（onloadPoint）
   * 2. 修改子组件“ShowData”里要激活的Tab页（tabkey: key）
   */
  handleSelect(key) {
    if (key === 2) {
      this.props.dataPointMethod.onloadPoint(this.props.dataSource[this.state.clickindex].id);
    }
    this.setState({
      tabkey: key,
    });
  }

  render() {
    // 子组件“ShowData”中的"Tabs"组件用到的方法
    const tabPara = {
      handleSelect: this.handleSelect,
      tabkey: this.state.tabkey,
    };
    // 左侧栏展示的数据源列表
    const cols = (this.props.dataSource.length > 0) ? this.props.dataSource.map((element, index) => (
      <ListGroupItem
        style={{ textAlign: "center" }}
        active={this.state.clickindex === index}
        key={index}
        value={index}
        id={element.id}
        onClick={this.handleClick}
      >
        {element.name}
      </ListGroupItem>
    ),
    ) : [];

    return (
      <div style={{ border: "1px solid  #DDDDDD" }}>
        <Row style={{ marginLeft: 0 }}>
          <Col xs={2} style={{ borderRight: "1px solid  #DDDDDD", padding: 0, height: "calc(100vh - 105px)" }}>
          <ListGroup>
            {cols}
          </ListGroup>
          </Col>
          <Col xs={10}>
          {this.state.isshow && <ShowData dataSource={this.props.dataSource[this.state.clickindex]} tabPara={tabPara} onDelete={this.handleDelete} dataSourceMethod={this.props.dataSourceMethod} dataPointMethod={this.props.dataPointMethod} />}
          </Col>
        </Row>
      </div>
      );
  }
}

import React, { Component, PropTypes } from "react";
import ServiceList from "./ServiceList";
import Search from "./Search";
import DetailInfo from "./DetailInfo";
// import { browserHistory } from "react-router";
import "./style.css"
export default class ServiceLib extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  // 定义校验 prop
  static propTypes = {
    auth: PropTypes.object.isRequired,
    servicelib: PropTypes.object.isRequired,
    getAllResult: PropTypes.func.isRequired,
    getQueryResult: PropTypes.func.isRequired,
    searchClick: PropTypes.func.isRequired,
    checkDetailInfo: PropTypes.func.isRequired,
    exitCheckDetail: PropTypes.func.isRequired,
    returnSearch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.exitCheckDetail();
    this.props.returnSearch();
  }
  componentWillReceiveProps(nextProps) {
    console.log("===========", nextProps);
    if (nextProps.servicelib.refresh === true) {
      this.props.finishSearch();
    }
  }

  checkDetail = (repair) => {
    this.props.checkDetailInfo(repair);
  }
  exitCheckDetail = () => {
    this.props.exitCheckDetail();
  }


  searchClick = () => {
    this.props.searchClick();
  }
  render() {
    return (
      <div>
        {this.props.servicelib.isSearch && !this.props.servicelib.detail && <Search searchByNum={this.props.getQueryResult} />}
        {!this.props.servicelib.isSearch && !this.props.servicelib.detail && <ServiceList data={this.props.servicelib.list} checkDetail={this.checkDetail} returnSearch={this.props.returnSearch} />}
        {this.props.servicelib.detail && <DetailInfo detailInfo={this.props.servicelib.detailInfo} exitCheck={this.exitCheckDetail} />}
      </div>
      );

  }
}
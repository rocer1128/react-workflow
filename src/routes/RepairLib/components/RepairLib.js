import React, { Component, PropTypes } from "react";
import RepairList from "./RepairList";
import SearchBar from "./SearchBar";
import DetailInfo from "./DetailInfo";
import { browserHistory } from "react-router";
export default class RepairLib extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  // 定义校验 prop
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repairlib: PropTypes.object.isRequired,
    getAllResult: PropTypes.func.isRequired,
    getQueryResult: PropTypes.func.isRequired,
    searchStations: PropTypes.func.isRequired,
    searchClick: PropTypes.func.isRequired,
    checkDetailInfo: PropTypes.func.isRequired,
    exitCheckDetail: PropTypes.func.isRequired,
    exitSearch: PropTypes.func.isRequired,
    exitSearchResult: PropTypes.func.isRequired,
    searchStaff: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllResult();
    this.props.searchStations();
    this.props.searchStaff(this.props.auth.user)
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps-==-=-=-=", nextProps);
    if (nextProps.repairlib.refresh === true) {
      this.props.finishSearch();
    }
  }

  checkDetail = (repair) => {
    this.props.checkDetailInfo(repair);
  }
  exitCheckDetail = () => {
    this.props.getAllResult();
    this.props.exitCheckDetail();
  }
  exitSearch = () => {
    this.props.exitSearch();
  }

  returnList = () => {
    this.props.getAllResult();
    this.props.exitSearchResult();
  }

  searchClick = () => {
    // this.props.searchStaff(this.props.auth.user);
    this.props.searchClick();

  }

  render() {
    const { repairs } = this.props.repairlib;
    return (
      <div>
        {!this.props.repairlib.detail && !this.props.repairlib.searchBar && <RepairList list={this.props.repairlib.repairs} searchClick={this.searchClick} checkDetail={this.checkDetail} searchResult={this.props.repairlib.searchResult} returnList={this.returnList} />}
        {!this.props.repairlib.detail && this.props.repairlib.searchBar && <SearchBar
                                                                             uid={this.props.auth.user}
                                                                             list={this.props.repairlib.repairs}
                                                                             searchClick={this.props.getQueryResult}
                                                                             staffs={this.props.repairlib.staffs}
                                                                             stations={this.props.repairlib.stations}
                                                                             exitSearch={this.exitSearch}
                                                                           />}
        {this.props.repairlib.detail && <DetailInfo detailInfo={this.props.repairlib.detailInfo} exitCheck={this.exitCheckDetail} />}
      </div>
      );

  }
}
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllResult, searchStaff, getQueryResult, finishSearch, searchStations, searchClick, checkDetailInfo, exitCheckDetail, exitSearch, exitSearchResult } from "../modules/repairlibrary";
import RepairLib from "../components/RepairLib";
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllResult,
    finishSearch,
    searchStaff,
    getQueryResult,
    searchStations,
    searchClick,
    checkDetailInfo,
    exitCheckDetail,
    exitSearch,
    exitSearchResult,
  }, dispatch)
}

const mapStateToProps = state => ({
  auth: state.home,
  repairlib: state.repairlib,
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairLib)
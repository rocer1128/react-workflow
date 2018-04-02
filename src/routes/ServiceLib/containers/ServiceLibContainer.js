import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllResult, getQueryResult, finishSearch, searchClick, checkDetailInfo, exitCheckDetail, returnSearch, getDeviceInfo } from "../modules/servicelib";
import ServiceLib from "../components/ServiceLib";
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllResult,
    finishSearch,
    getQueryResult,
    getDeviceInfo,
    searchClick,
    checkDetailInfo,
    exitCheckDetail,
    returnSearch,
  }, dispatch)
}

const mapStateToProps = state => {
  return ({
    auth: state.home,
    servicelib: state.servicelib,
  });
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceLib)
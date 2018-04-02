import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo } from "../modules/repairlist";
import RepairList from "../components/RepairList";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
}, dispatch);

const mapStateToProps = state => ({
  repairlist: state.repairlist,
  auth: state.home,
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairList);

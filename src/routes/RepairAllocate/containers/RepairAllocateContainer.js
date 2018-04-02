import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/repairallocate";
import RepairAllocate from "../components/RepairAllocate";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
  submitFinish,
}, dispatch);

const mapStateToProps = state => ({
  repairallocate: state.repairallocate,
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairAllocate);

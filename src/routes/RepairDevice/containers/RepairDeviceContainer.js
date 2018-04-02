import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/repairdevice";
import RepairDevice from "../components/RepairDevice";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
  submitFinish,
}, dispatch);

const mapStateToProps = state => ({
  repairdevice: state.repairdevice,
  auth: state.home,
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairDevice);

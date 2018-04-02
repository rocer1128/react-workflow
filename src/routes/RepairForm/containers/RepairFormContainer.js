import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/repairform";
import RepairForm from "../components/RepairForm";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
  submitFinish,
}, dispatch);

const mapStateToProps = state => ({
  repairform: state.repairform,
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairForm);

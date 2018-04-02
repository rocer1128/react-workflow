import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/machinerepair";
import MachineRepair from "../components/MachineRepair";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
  submitFinish,
}, dispatch);

const mapStateToProps = state => ({
  machinerepair: state.machinerepair,
});

export default connect(mapStateToProps, mapDispatchToProps)(MachineRepair);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/modulerepair";
import ModuleRepair from "../components/ModuleRepair";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
  submitFinish,
}, dispatch);

const mapStateToProps = state => ({
  modulerepair: state.modulerepair,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleRepair);

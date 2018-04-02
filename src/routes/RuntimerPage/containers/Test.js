import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDsMap, initDefaultData, start, end, changeData, initDefaultAlertData, save, switchDevice,submitForm} from "../modules/runtimer";
import { searchProject, deplyProject, getProjectInfo } from "../../Project/modules/project";
import Test from "../components/Test";

const mapDispatchToProps = dispatch => bindActionCreators({
  getDsMap,
  initDefaultData,
  searchProject,
  deplyProject,
  getProjectInfo,
  start,
  end,
  changeData,
  initDefaultAlertData,
  save,
  switchDevice,
  submitForm
}, dispatch);

const mapStateToProps = state => ({
  auth: state.home,
  workbench: state.workbench,
  test: state.test,
  project: state.project,
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);

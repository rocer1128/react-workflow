import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initInfo, initPageInfo, groupEvents, creatTasks, initTasks, deleteTasks, initHistoryInfo } from "../modules/calender";
import Calender from "../components/Calender";


const mapDispatchToProps = dispatch => bindActionCreators({
  initInfo,
  initPageInfo,
  groupEvents,
  creatTasks,
  initTasks,
  deleteTasks,
  initHistoryInfo,
}, dispatch);

const mapStateToProps = state => ({
  auth: state.home.user,
  project: state.project,
  calender: state.calender,
});

export default connect(mapStateToProps, mapDispatchToProps)(Calender);

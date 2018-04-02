import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo } from "../modules/modulelist";
import ModuleList from "../components/ModuleList";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
  submitInfo,
}, dispatch);

const mapStateToProps = state => ({
  modulelist: state.modulelist,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataSources, getPages, getPagesFinish, unregisterAlert } from "../modules/realTimePage";
import { changeData, start, end, connecting, switchDevice, submitForm } from "../../RuntimerPage/modules/runtimer";
import RealTimePage from "../components/RealTimePage";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDataSources,
    getPages,
    getPagesFinish,
    changeData,
    switchDevice,
    submitForm,
    unregisterAlert,
    start,
    end,
    connecting,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home,
  test: state.test,
  realTimePage: state.realTimePage,
});

export default connect(mapStateToProps, mapDispatchToProps)(RealTimePage);

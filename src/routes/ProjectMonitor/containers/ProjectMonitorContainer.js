import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataSources, getHistory, deleteHistory, getPages, getPagesFinish, getAlerts, registerAlert, unregisterAlert } from "../modules/projectMonitor";
import { getDataCurves, addDataCurves, deleteDataCurves, updateDataCurves } from "../modules/CurveReducer";
import { changeData, start, end, connecting, switchDevice, submitForm } from "../../RuntimerPage/modules/runtimer";
import ProjectMonitor from "../components/ProjectMonitor";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDataSources,
    getHistory,
    deleteHistory,
    getPages,
    getPagesFinish,
    getAlerts,
    changeData,
    switchDevice,
    submitForm,
    registerAlert,
    unregisterAlert,
    start,
    end,
    connecting,
    getDataCurves,
    addDataCurves,
    deleteDataCurves,
    updateDataCurves,
  }, dispatch);
}

// const config = window.config;
// const location = window.config.location;
const mapStateToProps = state => ({
  test: state.test,
  // auth: state.home,
  projectMonitor: state.projectMonitor,
  curve: state.curve,
  // auth: home,
  // location: location,
  /*location: {
    query: {
      id: config.projectId,
      from: config.from,
      key: config.tabId,
    }
  },
  auth: {
    user: {
      id: config.odoo.userId,
      permission: config.permission,
    }
  }*/
  location: {
    query: {
      id: 24,
      from: "projectMonitor",
      key: 32,

    }
  },
  auth: {
    user: {
      id: 1,
      permission: 0,
    }
  }
});




export default connect(mapStateToProps, mapDispatchToProps)(ProjectMonitor);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDataSources, getPages, getPagesFinish, unregisterAlert, save, setCurrentPage, updateCurrentPageJson, stopProgrammed, changeSendData } from "../modules/storedprogramcontrol";
import { changeData, start, end, connecting, connected, switchDevice } from "../../RuntimerPage/modules/runtimer";
import { searchProject, deplyProject, getProjectInfo } from "../../Project/modules/project";
import StoredProgramControl from "../components/StoredProgramControl";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchProject,
      deplyProject,
      getProjectInfo,
      changeData,
      start,
      end,
      connecting,
      connected,
      switchDevice,
      getDataSources,
      getPages,
      getPagesFinish,
      unregisterAlert,
      save,
      setCurrentPage,
      updateCurrentPageJson,
      changeSendData,
      stopProgrammed,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  test: state.test,
  storedprogramcontrol: state.storedprogramcontrol,
});

export default connect(mapStateToProps, mapDispatchToProps)(StoredProgramControl);

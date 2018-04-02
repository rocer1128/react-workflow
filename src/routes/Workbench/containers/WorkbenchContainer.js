import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCurrentPageObjects, deletePagesObjects, updatePagesObjects, addPage, deletePage, getPages, getDataSources, searchWidget, save, addWidget, updateWidget, setupProjectCurrentObject, setupWidgetCurrentObject, clearCurrentObject, pageOperationFinish, widgetOperationFinish, searchFinish, setupWidgetCurrentObjectFinish, resetFinish, setCurrentPage } from "../modules/workbench";
import { searchGisByPageId, delGisInfo } from "../../Gis/modules/gis"
import Workbench from "../components/Workbench";
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPage,
    deletePage,
    searchGisByPageId,
    delGisInfo,
    getPages,
    getDataSources,
    searchWidget,
    save,
    addWidget,
    updateWidget,
    setupProjectCurrentObject,
    setupWidgetCurrentObject,
    clearCurrentObject,
    pageOperationFinish,
    widgetOperationFinish,
    searchFinish,
    setupWidgetCurrentObjectFinish,
    resetFinish,
    setCurrentPage,
    updateCurrentPageObjects,
    updatePagesObjects,
    deletePagesObjects,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home,
  workbench: state.workbench,
  gis: state.gis,
});

export default connect(mapStateToProps, mapDispatchToProps)(Workbench);

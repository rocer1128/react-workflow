import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchProject, deplyProject, deleteProject, createProject, editProject, openProject, clear, getProjectPages, cancelDeplyProject } from "../modules/project";
import { clearCurrentObject, getPages, deletePage } from "../../Workbench/modules/workbench";
import Project from "../components/Project";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchProject,
    deplyProject,
    deleteProject,
    createProject,
    editProject,
    openProject,
    clear,
    getProjectPages,
    clearCurrentObject,
    cancelDeplyProject,
    deletePage,
    getPages,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home,
  project: state.project,
});

export default connect(mapStateToProps, mapDispatchToProps)(Project)

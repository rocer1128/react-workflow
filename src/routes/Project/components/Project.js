import React, { Component, PropTypes } from "react";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS, OPERATION_DELETE } from "components/Common/OperationConstant";
import ProjectOperation from "./ProjectOperation";
import ProjectList from "./ProjectList";

export default class Project extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };

  // 定义校验 prop
  static propTypes = {
    searchProject: PropTypes.func.isRequired,
    openProject: PropTypes.func.isRequired,
    deplyProject: PropTypes.func.isRequired,
    cancelDeplyProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    clearCurrentObject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    getProjectPages: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeply = this.handleDeply.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDeply = this.handleCancelDeply.bind(this);
  }

  componentWillMount() {
    this.props.searchProject();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project.createState === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.project.operation, "工程");
      this.props.openProject(nextProps.project.operationResult);
    } else if (nextProps.project.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.project.operation, "工程");
      this.props.searchProject(this.props.auth.user);
    } else if (nextProps.project.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.project.error.code], "工程");
    }
    if (nextProps.project.operation === OPERATION_DELETE) {
      console.log(nextProps.project.projectPages);
      nextProps.project.projectPages.map((item, index) => {
        this.props.deletePage(item.id);
      });
    }
  }

  handleDeply(deply) {
    this.props.deplyProject(deply);
  }

  handleCancelDeply(deply) {
    this.props.cancelDeplyProject(deply);
  }

  handleEdit(project) {
    this.props.editProject(project);
  }

  handleDelete(id) {
    this.props.getProjectPages(id);
    this.props.deleteProject(id);
    this.props.clearCurrentObject();
  }

  handleCreate(project) {
    project.user_id = this.props.auth.user.id;
    this.props.createProject(project);
  }

  handleOpen(project) {
    this.props.openProject(project);
  }

  render() {
    const { listProject } = this.props.project;
    return (
      <div>
        <ProjectOperation onCreate={this.handleCreate} />
        <ProjectList
          onOpen={this.handleOpen}
          onEdit={this.handleEdit}
          onDeply={this.handleDeply}
          onCancelDeply={this.handleCancelDeply}
          onDelete={this.handleDelete}
          listProject={listProject}
        />
      </div>
      );
  }
}

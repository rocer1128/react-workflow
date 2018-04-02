import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import Radium from "radium";
import moment from "moment";
import { CATEGORY_TYPES } from "../../../components/Common/ComponentConstant";
import ProjectListOperation from "./ProjectListOperation";
import "./Project.scss";

const ProjectList = ({ ...props }) => {
  const rows = props.listProject.map((project, index) => (
    <tr key={index}>
      <td>
        {project.name}
      </td>
      <td>
        {CATEGORY_TYPES[project.category]}
      </td>
      <td>
        {project.create_date && moment(project.create_date).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td>
        {project.write_date && moment(project.write_date).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td>
        {project.deploy_time && moment(project.deploy_time).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td className="operation_btn">
        <ProjectListOperation
          onOpen={props.onOpen}
          onEdit={props.onEdit}
          onDeply={props.onDeply}
          onCancelDeply={props.onCancelDeply}
          onDelete={props.onDelete}
          project={project}
        />
      </td>
    </tr>));

  return (
    <Table bordered striped responsive>
      <thead>
        <tr>
          <th>
            {"工程名称"}
          </th>
          <th>
            {"工程分类"}
          </th>
          <th>
            {"创建时间"}
          </th>
          <th>
            {"修改时间"}
          </th>
          <th>
            {"部署时间"}
          </th>
          <th>
            {"操作"}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
    );
};

ProjectList.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  listProject: PropTypes.array.isRequired,
};

export default Radium(ProjectList);

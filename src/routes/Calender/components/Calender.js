import React, { Component, PropTypes } from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import __ from "lodash";
import { ERROR_TYPES } from "components/Common/ErrorConstant";
import { OPERATION_LEVEL_ERROR, OPERATION_LEVEL_SUCCESS } from "components/Common/OperationConstant";
import CalenderOperation from "./CalenderOperation";
import CalenderEvent from "./CalenderEvent";
import "./Calender.css";

BigCalendar.momentLocalizer(moment);
export default class Calender extends Component {
  static contextTypes = {
    registerNotifiaction: PropTypes.func,
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    calender: PropTypes.object.isRequired,
    initInfo: PropTypes.func.isRequired,
    initPageInfo: PropTypes.func.isRequired,
    groupEvents: PropTypes.func.isRequired,
    creatTasks: PropTypes.func.isRequired,
    initTasks: PropTypes.func.isRequired,
    deleteTasks: PropTypes.func.isRequired,
    initHistoryInfo: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectValues: [],
    };
  }
  componentWillMount() {
    this.props.initInfo(this.props.auth.id);
    this.props.initTasks();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.calender.refresh === true) {
      this.context.registerNotifiaction(OPERATION_LEVEL_SUCCESS, nextProps.calender.operation, "任务");
      this.props.initTasks();
    } else if (nextProps.calender.init === true) {
      this.handleSelectChange(nextProps.calender.events, this.state.selectValues);
    } else if (nextProps.calender.error != null) {
      this.context.registerNotifiaction(OPERATION_LEVEL_ERROR, ERROR_TYPES[nextProps.calender.error.code], "任务");
    }
  }

  handleSelectChange = (events, objects) => {
    if (objects.length) {
      const Group = __.groupBy(events, event => event.category);
      let newEvents = [];
      objects.forEach((object) => {
        if (Group[object.value]) {
          newEvents = [...newEvents, ...Group[object.value]];
        }
        this.props.groupEvents(newEvents);
      });
    } else {
      this.props.groupEvents(events);
    }
    this.setState({
      selectValues: objects,
    });
  };

  render() {
    return (
      <div>
        <CalenderOperation
          project={this.props.calender.listProject}
          getPage={this.props.initPageInfo}
          page={this.props.calender.listPage}
          creat={this.props.creatTasks}
          handleSelectChange={this.handleSelectChange}
          events={this.props.calender.events}
          options={this.props.calender.options}
          selectValues={this.state.selectValues}
        />
        <CalenderEvent
          history={this.props.initHistoryInfo}
          historyData={this.props.calender.listHistory}
          creat={this.props.creatTasks}
          project={this.props.calender.listProject}
          getPage={this.props.initPageInfo}
          page={this.props.calender.listPage}
          events={this.props.calender.newevents}
          delete={this.props.deleteTasks}
        />
      </div>
    );
  }
}

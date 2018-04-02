import React, { Component, PropTypes } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { FormGroup, Form, Button, Col, Checkbox, FormControl, Modal, ControlLabel } from "react-bootstrap";
import { CALENDER_CATEGORY_TYPES } from "components/Common/ComponentConstant";

export default class CalenderEvent extends Component {
  static propTypes = {
    project: PropTypes.array.isRequired,
    page: PropTypes.array.isRequired,
    getPage: PropTypes.func.isRequired,
    creat: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    history: PropTypes.func.isRequired,
    historyData: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isShowAdd: false,
      starttime: new Date(),
      endtime: new Date(),
      isShowInfo: false,
      isShowDelete: false,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("zzz")
  // }

  closeModal = () => {
    this.setState({
      isShowAdd: false,
      isShowInfo: false,
    });
  };
  showDeleteModal = () => {
    this.setState({
      isShowDelete: true,
    });
  };
  closeDeleteModal = () => {
    this.setState({
      isShowDelete: false,
    });
  };

  listPage = (e) => {
    if (e.target.value !== 0) {
      this.props.getPage(parseInt(e.target.value, 10));
    }
  };

  save = () => {
    const calenderInfo = {
      name: this.name.value,
      start_time: moment(this.state.starttime).format("YYYY-MM-DD HH:mm:ss.000"),
      end_time: moment(this.state.endtime).format("YYYY-MM-DD HH:mm:ss.000"),
      page_id: parseInt(this.pageid.value, 10),
      category: this.category.value,
    };
    this.props.creat(calenderInfo);
    this.closeModal();
  };

  formatEvent = events =>
    events.map((element) => {
      const newjson = {
        title: element.name,
        start: new Date(element.start_time),
        end: new Date(element.end_time),
        category: element.category,
        id: element.id,
      };
      return newjson;
    });

  delete = () => {
    this.props.delete(this.deleteid);
    this.closeDeleteModal();
    this.closeModal();
  };

  formatTime = (time) => {
    this.setState({
      isShowAdd: true,
      starttime: time.start,
      endtime: time.end,
    });
  };

  selectEvent = (event) => {
    this.end = event.end;
    this.deletename = event.title;
    this.deleteid = event.id;
    this.setState({
      isShowInfo: true,
    });
    // const json = {
    //   page_id: event.id,
    //   end_time: moment(event.end).format("YYYY-MM-DD HH:mm:ss"),
    // };
    // this.props.history(json);
  };

  saveModal = () => {
    this.closeModal();
  };

  render() {
    const { project, page, events } = this.props;
    return (
      <div>
        <div className="example" style={{ height: "calc(100vh - 150px)" }}>
          <BigCalendar
            selectable={true}
            popup
            culture="en-GB"
            events={events.length ? this.formatEvent(events) : []}
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            eventPropGetter={(event) => {
              switch (event.category) {
                case "repair":
                  return {
                    style: {
                      backgroundColor: "green",
                    },
                  };
                  break;
                case "fix":
                  return {
                    style: {
                      backgroundColor: "red",
                    },
                  };
                  break;
                case "attendance":
                  return {
                    style: {
                      backgroundColor: "orange",
                    },
                  };
                  break;
              }
            }}
            onSelectEvent={event => this.selectEvent(event)}
            onSelectSlot={(slotInfo) => {
              this.formatTime(slotInfo);
            }}
          />
        </div>
        <Modal show={this.state.isShowAdd} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>添加任务信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}>
                  {" "}名称
                </Col>
                <Col sm={8}>
                  <FormControl type="text" placeholder="名称" inputRef={ref => (this.name = ref)} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}>
                  {" "}开始日期
                </Col>
                <Col sm={8}>
                  <FormControl type="text" value={this.state.starttime.toLocaleString()} disabled={true} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}>
                  {" "}结束日期
                </Col>
                <Col sm={8}>
                  <FormControl type="text" value={this.state.endtime.toLocaleString()} disabled={true} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}>
                  {" "}选择表单
                </Col>
                <Col sm={4}>
                  <FormControl componentClass="select" onChange={this.listPage}>
                    <option key={0}>选择工程</option>
                    {project.map((element, index) =>
                      <option key={index} value={element.id} name={element.name}>
                        {element.name}
                      </option>,
                    )}
                  </FormControl>
                </Col>
                <Col sm={4}>
                  <FormControl componentClass="select" inputRef={ref => (this.pageid = ref)}>
                    {page.map((element, index) =>
                      <option key={index} value={element.id} name={element.name}>
                        {element.name}
                      </option>,
                    )}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={3} componentClass={ControlLabel}>
                  {" "}类别
                </Col>
                <Col sm={8}>
                  <FormControl componentClass="select" inputRef={ref => (this.category = ref)}>
                    <option value={"repair"}>
                      {CALENDER_CATEGORY_TYPES.repair}
                    </option>
                    <option value={"fix"}>
                      {CALENDER_CATEGORY_TYPES.fix}
                    </option>
                    <option value={"attendance"}>
                      {CALENDER_CATEGORY_TYPES.attendance}
                    </option>
                  </FormControl>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.save}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowInfo} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.deletename}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  {" "}工作内容...
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  {" "}步骤一
                </Col>
                <Col sm={8}>
                  <FormControl type="text" value={this.props.historyData.length ? this.props.historyData[0].data[0].value : ""} disabled={true} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.end > new Date() &&
              <Button bsStyle="success" onClick={this.saveModal}>
                保存
              </Button>}
            <Button bsStyle="danger" onClick={this.showDeleteModal}>
              删除
            </Button>
            <Button bsStyle="primary" onClick={this.closeModal}>
              关闭
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isShowDelete} onHide={this.closeDeleteModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>删除提示</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <h4>
              确定要删除：{this.deletename}?
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.delete}>
              确定
            </Button>
            <Button bsStyle="default" onClick={this.closeDeleteModal}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

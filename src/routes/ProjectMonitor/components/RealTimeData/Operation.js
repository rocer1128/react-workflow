import React, { Component, } from "react";
import { ButtonToolbar, Button, Modal, } from "react-bootstrap";
import ProjectMonitorHistory from "./ProjectMonitorHistory"
import moment from "moment";

class Operation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      hlist: [],
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let translist = nextProps.listHistory.get(nextProps.PointId);
    if (translist) {
      translist.map((element, index) => (element.time = moment(element.time).format("YYYY-MM-DD HH:mm:ss")))
      this.setState({
        hlist: translist
      });
    }
  }

  showModal() {
    this.setState({
      show: true,
      hlist: [],
    });
  }

  hideModal() {
    this.setState({
      show: false
    });
  }

  render() {

    return (
      <div style={{ marginLeft: "25%" }}>
        <ButtonToolbar>
          <Button bsStyle="success" onClick={this.showModal}>
            查看历史数据
          </Button>
        </ButtonToolbar>
        <Modal show={this.state.show} onHide={this.hideModal} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>
              查询数据点历史数据
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center", minHeight: "70vh" }}>
            <ProjectMonitorHistory listHistory={this.state.hlist} PointId={this.props.PointId} getHistory={this.props.getHistory} />
          </Modal.Body>
        </Modal>
      </div>);
  }
}
export default Operation;

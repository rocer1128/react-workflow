import React, { Component } from "react";
import { Button, Tabs, Tab, } from "react-bootstrap";
import _ from "lodash";

import CheckDatetime from "../CheckDatetime";
import DataPointlist from "./DataPointlist";
import ShowAnalog from "./ShowAnalog";

export default class ProjectMonitorHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <CheckDatetime getHistory={this.props.getHistory} PointId={this.props.PointId} />
        <Tabs id="showtab">
          <Tab eventKey={1} title="数据点值列表">
            <DataPointlist historyData={this.props.listHistory} />
          </Tab>
          <Tab eventKey={2} title="曲线图">
            <ShowAnalog historyData={this.props.listHistory} />
          </Tab>
        </Tabs>
      </div>);
  }
}

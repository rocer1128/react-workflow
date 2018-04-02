import React, { Component } from "react"

import { Pagination } from "react-bootstrap"

export default class MonitorPage extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(eventKey) {
    this.props.onSelect(eventKey)
  }

  render() {
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={this.props.pages}
        maxButtons={3}
        activePage={this.props.activePage}
        onSelect={this.handleSelect}
      />);
  }
}
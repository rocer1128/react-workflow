import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Designer from "components/CellsArt/DesignPanel/Designer";
import DesignMenu from "components/CellsArt/DesignPanel/scada/Menu";
import __ from "lodash";

export default class DesignerPage extends Component {
  handleUpdate(objects, newOne) {
    if (newOne) {
      newOne.id = __.padStart(`${objects.length + 1}`, 3, "0");
      objects.push(newOne);
    }
    this.props.onHandleUpdateObjects(objects);
  }

  render() {
    const { widgets, data } = this.props;
    if (widgets) {
      return (
        <div>
          <div style={{ border: "1px solid #DDDDDD", height: "calc(100vh - 105px)", overflow: "auto", paddingTop: "10px" }}>
            <Designer width={800} height={600} insertMenu={DesignMenu} widgets={widgets} objects={data} onUpdate={this.handleUpdate.bind(this)} currentPageId={this.props.currentPageId} />
          </div>
        </div>
      );
    }
    return <div />;
  }
}

import React, { Component } from "react";
import Cell from "../ComGroup/coms/Cell";
import { GetObjectAttributes, GetMenus } from "components/Common/CommonUtil";

const DT = (Com) => class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { styles, events, binds, objects, conditions, onRender, onMouseOver, ...rest } = this.props;

    const refHandler = {
      ref: onRender,
      onMouseOver: onMouseOver,
    };

    if (Com === Cell) {
      return (<Com {...rest} objects={objects} {...GetObjectAttributes(this.props)} refHandler={refHandler} isDesigner={true} />);
    } else {
      return (<Com {...rest} menus={GetMenus(this, true)} {...GetObjectAttributes(this.props)} refHandler={refHandler} isDesigner={true} />);
    }
  }
};

export default DT;

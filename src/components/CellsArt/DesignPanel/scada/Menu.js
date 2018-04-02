import React, { Component, PropTypes } from "react";
import radium from "radium";
import Icon from "../Icon";
import Cell from "components/ComGroup/coms/Cell";
import __ from "lodash";
import { CATEGORY_TYPES, COMPONENT_GROUP } from "components/Common/ComponentConstant";
import * as objectTypes from "components/ComGroup/coms/types";
import "./Menu.scss";
import DT from "components/CellsArt/DT";

class Menu extends Component {
  static propTypes = {
    currentTool: PropTypes.bool,
    onSelect: PropTypes.func,
    iconObject: PropTypes.object,
  };

  renderCurrentTool() {
    const { currentTool, iconObject } = this.props;

    if (currentTool === true) {
      return (
        <center>
          {renderIcon(iconObject.data, 60)}
        </center>
      );
    }
      return (
        <center>
          <Icon icon={"add"} size={100} />
        </center>
      );
  }

  render() {
    const { widgets, onSelect } = this.props;
    const widgetGroups = __.groupBy(widgets, widget => widget.group);
    return (
      <div className="insertMenu">
        <div className="mainIcon">
          {this.renderCurrentTool()}
        </div>
        {__.map(widgetGroups, (value, key) => <SubMenu objects={value} key={key} title={COMPONENT_GROUP[key]} onMouseDown={onSelect} />)}
      </div>
    );
  }
}

class SubMenu extends Component {
  static propTypes = {
    title: React.PropTypes.string,
  };

  state = {
    showFlag: false,
  };

  handleClick() {
    this.setState({
      showFlag: !this.state.showFlag,
    });
  }

  render() {
    const { title, ...rest } = this.props;
    return (
      <div>
        <div className="components" onClick={this.handleClick.bind(this)}>
          {title}
        </div>
        {this.state.showFlag && <List className="toolBox" {...rest} />}
      </div>
    );
  }
}

class List extends Component {
  static propTypes = {
    objects: React.PropTypes.array,
  };

  render() {
    const { objects, ...rest } = this.props;
    return (
      <div>
        {objects.map((object, index) => <Item key={index} index={index} object={object} {...rest} />)}
      </div>
    );
  }
}

class Item extends Component {
  static propTypes = {
    object: React.PropTypes.object,
    onMouseDown: React.PropTypes.func,
  };

  // renderIcon(cell) {
  //   const Type = DT(Cell);
  //   const { id, styles, objects } = cell;
  //   styles.width = 50;
  //   styles.height = 50;
  //   styles.x = 0;
  //   styles.y = 0;

  //   return (
  //     <Icon icon={"cell"} size={25}>
  //       <Type id={id} styles={styles} objects={objects} />
  //     </Icon>);
  // }

  render() {
    const { object, onMouseDown, index } = this.props;
    return (
      <div className="menuItem" onClick={onMouseDown.bind(this, object)}>
        <div className="showIcon">
          {renderIcon(object.data, 25, index)}
        </div>
        <div className="desc">
          {object.name}
        </div>
      </div>
    );
  }
}

const renderIcon = (cell, size, index) => {
  const { styles, objects } = cell;

  if (objects.length === 1) {
    const icon = objectTypes[objects[0].tag].icon;
    if (icon) {
      return <Icon icon={icon} size={size} />;
    }
  }

  const Type = DT(Cell);

  styles.width = 50;
  styles.height = 50;
  styles.x = 0;
  styles.y = 0;

  return (
    <Icon icon={"cell"} size={size}>
      <Type id={`M${index}`} styles={styles} objects={objects} />
    </Icon>
  );
};

export default radium(Menu);

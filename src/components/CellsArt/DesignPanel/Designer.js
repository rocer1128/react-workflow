import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { HotKeys } from "react-hotkeys";
import Radium from "radium";
import Icon from "./Icon";
import * as objectTypes from "../../ComGroup/coms/types";
import InsertMenu from "./panels/InsertMenu";
import SVGRenderer from "./SVGRenderer";
import Handler from "./Handler";
import { modes } from "./constants";
import * as actions from "./actions";
import { Text, Rect, Circle } from "./objects";
import PanelList from "./panels/PanelList";

class Designer extends Component {
  static defaultProps = {
    objectTypes: {
      text: Text,
      rectangle: Rect,
      circle: Circle,
    },
    snapToGrid: 1,
    svgStyle: {},
    insertMenu: InsertMenu,
  };

  state = {
    mode: modes.FREE,
    handler: {
      top: 200,
      left: 200,
      width: 50,
      height: 50,
      rotate: 0,
    },
    currentObjectIndex: null,
    selectedObjectIndex: null,
    selectedTool: false,
    cellObject: null,
  };

  keyMap = {
    removeObject: ["del", "backspace"],
    moveLeft: ["left", "shift+left"],
    moveRight: ["right", "shift+right"],
    moveUp: ["up", "shift+up"],
    moveDown: ["down", "shift+down"],
    closePath: ["enter"],
  };

  componentWillMount() {
    this.objectRefs = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPageId !== nextProps.currentPageId) {
      this.setState(
        {
          currentObjectIndex: null,
          selectedObjectIndex: null,
          showHandler: false,
          handler: null,
        },
        () => {
          this.objectRefs = {};
          this.props.onUpdate(nextProps.objects);
        },
      );
    }
  }

  showHandler(index) {
    const { mode } = this.state;
    const { objects } = this.props;
    const object = objects[index];

    if (mode !== modes.FREE) {
      return;
    }

    this.updateHandler(index, object);
    this.setState({
      currentObjectIndex: index,
      showHandler: true,
    });
  }

  hideHandler() {
    const { mode } = this.state;
    if (mode === modes.FREE) {
      this.setState({
        showHandler: false,
      });
    }
  }

  getStartPointBundle(event, object) {
    const { currentObjectIndex } = this.state;
    const { objects } = this.props;
    const mouse = this.getMouseCoords(event);
    object = object || objects[currentObjectIndex];
    return {
      clientX: mouse.x,
      clientY: mouse.y,
      objectX: object.styles.x,
      objectY: object.styles.y,
      width: object.styles.width,
      height: object.styles.height,
      rotate: object.styles.rotate,
    };
  }

  startDrag(mode, event) {
    const { currentObjectIndex } = this.state;
    this.setState({
      mode,
      startPoint: this.getStartPointBundle(event),
      selectedObjectIndex: currentObjectIndex,
    });
  }

  resetSelection() {
    this.setState({
      selectedObjectIndex: null,
    });
  }

  newObject(event) {
    const { mode, cellObject, selectedTool } = this.state;

    this.resetSelection(event);

    if (mode !== modes.DRAW) {
      return;
    }

    const mouse = this.getMouseCoords(event);

    const { objects, onUpdate } = this.props;

    let selectedObject = cellObject.data;

    if (selectedObject.tag === "Cell" && selectedObject.objects.length === 1) {
      selectedObject = selectedObject.objects[0];
    }

    const object = _.cloneDeep(selectedObject);

    console.log(object);
    object.styles.x = mouse.x;
    object.styles.y = mouse.y;

    onUpdate([...objects], object);

    this.setState({
      currentObjectIndex: objects.length,
      selectedObjectIndex: objects.length,
      startPoint: this.getStartPointBundle(event, object),
      mode: modes.SCALE,
      selectedTool: false,
      cellObject: null,
    });
  }

  updateObject(objectIndex, changes) {
    const { objects, onUpdate } = this.props;
    onUpdate(
      objects.map((object, index) => {
        if (index === objectIndex) {
          return _.defaultsDeep(changes, object);
        }
        return object;
      }),
    );
  }

  getOffset() {
    const parent = this.svgElement.getBoundingClientRect();
    const { canvasWidth, canvasHeight } = this.getCanvas();
    return {
      x: parent.left,
      y: parent.top,
      width: canvasWidth,
      height: canvasHeight,
    };
  }

  applyOffset(bundle) {
    const offset = this.getOffset();
    return {
      ...bundle,
      x: bundle.x - offset.x,
      y: bundle.y - offset.y,
    };
  }

  updateHandler(index, object) {
    const target = this.objectRefs[index];
    const bbox = target.getBoundingClientRect();
    const { canvasOffsetX, canvasOffsetY } = this.getCanvas();

    let handler = {
      ...this.state.handler,
      width: object.styles.width || bbox.width,
      height: object.styles.height || bbox.height,
      top: object.styles.y + canvasOffsetY,
      left: object.styles.x + canvasOffsetX,
      rotate: object.styles.rotate,
    };

    if (!object.width) {
      const offset = this.getOffset();
      handler = {
        ...handler,
        left: bbox.left - offset.x,
        top: bbox.top - offset.y,
      };
    }

    this.setState({
      handler,
    });
  }

  snapCoordinates({ x, y }) {
    const { snapToGrid } = this.props;
    return {
      x: x - x % snapToGrid,
      y: y - y % snapToGrid,
    };
  }

  getMouseCoords({ clientX, clientY }) {
    const coords = this.applyOffset({
      x: clientX,
      y: clientY,
    });

    return this.snapCoordinates(coords);
  }

  onDrag(event) {
    const { currentObjectIndex, startPoint, mode } = this.state;
    const { objects } = this.props;
    const object = objects[currentObjectIndex];
    const mouse = this.getMouseCoords(event);

    const { scale, rotate, drag } = actions;

    const map = {
      [modes.SCALE]: scale,
      [modes.ROTATE]: rotate,
      [modes.DRAG]: drag,
    };

    const action = map[mode];

    if (action) {
      const newObject = action({
        object,
        startPoint,
        mouse,
        objectIndex: currentObjectIndex,
        objectRefs: this.objectRefs,
      });

      this.updateObject(currentObjectIndex, newObject);
      this.updateHandler(currentObjectIndex, newObject);
    }

    if (currentObjectIndex !== null) {
      this.detectOverlappedObjects(event);
    }
  }

  detectOverlappedObjects(event) {
    const { currentObjectIndex } = this.state;
    const { objects } = this.props;
    const mouse = this.getMouseCoords(event);

    let refs = this.objectRefs,
      keys = Object.keys(refs),
      offset = this.getOffset();

    const currentRect = refs[currentObjectIndex].getBoundingClientRect();

    keys.filter((object, index) => index !== currentObjectIndex).forEach((key) => {
      const rect = refs[key].getBoundingClientRect();
      let { left, top, width, height } = rect;

      left -= offset.x;
      top -= offset.y;

      const isOverlapped = mouse.x > left && mouse.x < left + width && mouse.y > top && mouse.y < top + height && currentRect.width > width && currentRect.height > height;

      if (isOverlapped) {
        this.showHandler(Number(key));
      }
    });
  }

  stopDrag() {
    const { mode } = this.state;

    if (_.includes([modes.DRAG, modes.ROTATE, modes.SCALE], mode)) {
      this.setState({
        mode: modes.FREE,
      });
    }
  }

  getCanvas() {
    const { width, height } = this.props;
    const { canvasWidth = width, canvasHeight = height } = this.props;
    return {
      width,
      height,
      canvasWidth,
      canvasHeight,
      canvasOffsetX: (canvasWidth - width) / 2,
      canvasOffsetY: (canvasHeight - height) / 2,
    };
  }

  renderSVG() {
    const canvas = this.getCanvas();
    const { width, height, canvasOffsetX, canvasOffsetY } = canvas;
    const { background, objects, svgStyle } = this.props;

    return (
      <SVGRenderer
        background={background}
        width={width}
        canvas={canvas}
        height={height}
        objects={objects}
        onMouseOver={this.showHandler.bind(this)}
        objectRefs={this.objectRefs}
        onRender={ref => (this.svgElement = ref)}
        onMouseDown={this.newObject.bind(this)}
      />
    );
  }

  selectTool(object) {
    this.setState({
      selectedTool: true,
      mode: modes.DRAW,
      currentObjectIndex: null,
      showHandler: false,
      handler: null,
      cellObject: object,
    });
  }

  handleObjectChange(key, type, value) {
    const { selectedObjectIndex } = this.state;
    if (type === "bind") {
      let newvalue = "";
      switch (key) {
        case "isSelected":
          newvalue = "this.isSelected()?'rotate':''";
          break;
        case "readDataNode":
          newvalue = `this.data(${value})===1?'open':'default'`;
          break;
          case "alert":
          newvalue = `this.alert(${value})>0?'flash':''`;
          break;
          case "isBindedDN":
          newvalue = "this.isBindedDN()?'show':''";
          break;
        default:
          break;
      }
      this.updateOtherObject(selectedObjectIndex, newvalue);
    } else if (type === "event") {
      let newvalue = "";
      switch (key) {
        case "onClick":
          newvalue = `this.setSelected();this.bindDataNode(${value})`;
          break;
        default:
          break;
      }
      const changes = {};
      const newkey = `events.${key}`;
      _.set(changes, newkey, newvalue);
      console.log(changes);
      this.updateObject(selectedObjectIndex, changes);
    } else if (type === "object") {
      const changes = {};
      _.set(changes, key, value);
      this.updateObjObject(selectedObjectIndex, changes);
    } else {
      if (type === "number") {
        const numValue = _.toNumber(value);
        value = Number.isNaN(numValue) ? value : numValue;
      }

      if (type === "bool") {
        value = Boolean(value);
      }
      const changes = {};
      _.set(changes, key, value);
      console.log(changes);
      this.updateObject(selectedObjectIndex, changes);
    }
  }

  updateOtherObject(objectIndex, changes) {
    const { objects, onUpdate } = this.props;
    onUpdate(
      objects.map((object, index) => {
        if (index === objectIndex) {
          object.binds.condition.push(changes);
          return object;
        }
        return object;
      }),
    );
  }

  updateObjObject(objectIndex, changes) {
    const { objects, onUpdate } = this.props;
    onUpdate(
      objects.map((object, index) => {
        if (index === objectIndex) {
          return Object.assign(object, changes);
        }
        return object;
      }),
    );
  }

  handleArrange(arrange) {
    const { selectedObjectIndex } = this.state;
    const { objects } = this.props;
    const object = objects[selectedObjectIndex];

    const arrangers = {
      front: (rest, object) => [[...rest, object], rest.length],
      back: (rest, object) => [[object, ...rest], 0],
    };

    const rest = objects.filter((object, index) => selectedObjectIndex !== index);

    this.setState(
      {
        selectedObjectIndex: null,
      },
      () => {
        const arranger = arrangers[arrange];
        const [arranged, newIndex] = arranger(rest, object);
        this.props.onUpdate(arranged);
        this.setState({
          selectedObjectIndex: newIndex,
        });
      },
    );
  }

  removeCurrent() {
    const { selectedObjectIndex } = this.state;
    const { objects } = this.props;

    const rest = objects.filter((object, index) => selectedObjectIndex !== index);

    this.setState(
      {
        currentObjectIndex: null,
        selectedObjectIndex: null,
        showHandler: false,
        handler: null,
      },
      () => {
        this.objectRefs = {};
        this.props.onUpdate(rest);
      },
    );
  }

  removeAll() {
    this.setState(
      {
        currentObjectIndex: null,
        selectedObjectIndex: null,
        showHandler: false,
        handler: null,
      },
      () => {
        this.objectRefs = {};
        this.props.onUpdate([]);
      },
    );
  }

  moveSelectedObject(attr, points, event, key) {
    const { selectedObjectIndex } = this.state;
    const { objects } = this.props;
    const object = objects[selectedObjectIndex];

    if (key.startsWith("shift")) {
      points *= 10;
    }

    const changes = {
      ...object,
      [attr]: object[attr] + points,
    };

    this.updateObject(selectedObjectIndex, changes);
    this.updateHandler(selectedObjectIndex, changes);
  }

  getKeymapHandlers() {
    const handlers = {
      removeObject: this.removeCurrent.bind(this),
      moveLeft: this.moveSelectedObject.bind(this, "x", -1),
      moveRight: this.moveSelectedObject.bind(this, "x", 1),
      moveUp: this.moveSelectedObject.bind(this, "y", -1),
      moveDown: this.moveSelectedObject.bind(this, "y", 1),
      closePath: () =>
        this.setState({
          mode: modes.FREE,
        }),
    };

    return _.mapValues(handlers, handler => (event, key) => {
      if (event.target.tagName !== "INPUT") {
        event.preventDefault();
        handler(event, key);
      }
    });
  }

  render() {
    const { showHandler, handler, mode, selectedObjectIndex, selectedTool, cellObject } = this.state;

    const { objects, insertMenu: InsertMenuComponent, widgets } = this.props;

    let currentObject = objects[selectedObjectIndex],
      showPropertyPanel = selectedObjectIndex !== null;

    const { width, height, canvasWidth, canvasHeight } = this.getCanvas();

    let objectComponent,
objectWithInitial,
objectStyle;

    if (currentObject) {
      // objectComponent = objectTypes[currentObject.tag];
      objectComponent = objectTypes[currentObject.tag];
      objectStyle = currentObject.styles;
      // objectCopy = _.defaultsDeep(currentObject, objectComponent.meta.initial);
    }

    return (
      <HotKeys keyMap={this.keyMap} style={styles.keyboardManager} handlers={this.getKeymapHandlers()}>
        <div
          className={"container"}
          style={{ ...styles.container, ...this.props.style, width: canvasWidth, height: canvasHeight }}
          onMouseMove={this.onDrag.bind(this)}
          onMouseUp={this.stopDrag.bind(this)}
        >
          {showHandler && (
            <Handler
              boundingBox={handler}
              canResize={_.has(objectStyle, "width") || _.has(objectStyle, "height")}
              canRotate={_.has(objectStyle, "rotate")}
              onMouseLeave={this.hideHandler.bind(this)}
              onDrag={this.startDrag.bind(this, modes.DRAG)}
              onResize={this.startDrag.bind(this, modes.SCALE)}
              onRotate={this.startDrag.bind(this, modes.ROTATE)}
            />
          )}
          {InsertMenuComponent && <InsertMenuComponent currentTool={selectedTool} onSelect={this.selectTool.bind(this)} widgets={widgets} iconObject={cellObject} />}
          {this.renderSVG()}
          {showPropertyPanel && (
            <PanelList offset={this.getOffset()} object={currentObject} onArrange={this.handleArrange.bind(this)} onChange={this.handleObjectChange.bind(this)} objectComponent={objectComponent} />
          )}
        </div>
      </HotKeys>
    );
  }
}

export const styles = {
  container: {
    position: "relative",
    marginLeft: "120px",
  },
  keyboardManager: {
    outline: "none",
  },
};

export default Radium(Designer);

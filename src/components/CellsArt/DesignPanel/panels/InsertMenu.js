import React from "react";
import Radium from "radium";
import Icon from "../Icon";

const InsertMenu = ({ ...props }) => {
  const style = {
    insertMenu: {
      position: "absolute",
      marginTop: 0,
      marginLeft: -40,
      height: 40,
      width: 40,
      overflow: "hidden",
      ":hover": {
        background: "#eeeff5",
        height: "auto",
      },
    },
    toolBox: {
      margin: 0,
      padding: 0,
    },
    toolBoxItem: {
      listStyle: "none",
      padding: "5px 5px",
      ":hover": {
        background: "#ebebeb",
      },
    },
    currentToolboxItem: {
      background: "#ebebeb",
    },
    mainIcon: {
      padding: "10px 5px",
      borderBottom: "1px solid #e0e0e0",
    },

  };
  const { currentTool, tools } = this.props;
  const keys = Object.keys(tools);
  return (
    <div style={style.insertMenu}>
      <div style={style.mainIcon}>
        {currentTool
         ? tools[currentTool].meta.icon
         : <Icon icon={"add"} size={30} />}
      </div>
      <ul style={style.toolBox}>
        {keys.map((type, i) => (
           <li style={[style.toolBoxItem, currentTool === type && style.currentToolboxItem]} onMouseDown={props.onSelect.bind(this, type)} key={i}>
             {tools[type].meta.icon}
           </li>
         ))}
      </ul>
    </div>
    );

};

export default Radium(InsertMenu);

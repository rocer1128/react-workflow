import React, { Component, PropTypes } from "react";

export default class SvgCheckBox extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    checked: PropTypes.bool,
    checkedValue: PropTypes.any,
    value: PropTypes.any,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    value: 0,
    checkedVlaue: 0,
    checked: false,
    hidden: false,
    refHandler: {},
  };

  // state = {
  //   checkValue: [],
  // };
  state = {
    checkValue: null,
  };
  getValue = () => this.state.checkValue;

  // handleChange = (e) => {
  //   const { checked, value } = e.target;
  //   let { checkValue } = this.state;
  //   if (checked && checkValue.indexOf(value) === -1) {
  //     checkValue.push(value);
  //   } else {
  //     checkValue = checkValue.filter(i => i !== value);
  //   }
  //   this.setState({
  //     checkValue,
  //   });
  // }

  handleChange = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    const { checkValue } = this.state;
    if (checked) {
      // checkValue = value;
      this.setState({
        checkValue: value,
      });
    } else {
      this.setState({
        checkValue: null,
      });
    }
    // this.setState({
    //   checkValue,
    // });
  };

  render() {
    const { x, y, width, height, cursor, hidden, value, checked, checkedValue, refHandler } = this.props;
    const { checkValue } = this.state;
    let attrName = "";
    let newChecked = true;
    if (checkedValue === value) {
      newChecked = true;
      // newChecked = (checkValue.indexOf(value) !== -1);
    } else {
      newChecked = checkValue === value;
    }
    if (!hidden) {
      attrName = value;
    }
    return (
      <g {...refHandler}>
        <foreignObject x={x} y={y} width={width} height={height}>
          <label>
            {attrName}
            <input type="checkbox" style={{ width, height }} value={value} checked={newChecked} onChange={this.handleChange} />
          </label>
        </foreignObject>
      </g>
    );
    //   return (
    //     <g {...refHandler}>
    //       {menus.map((menu, i) => {
    //          return (
    //            <g key={i}>
    //              {vertical &&
    //               <foreignObject x={x} y={y + space * i} width={width} height={height}>
    //                 <label>
    //                   {menu.styles.attrName}
    //                   <input type="checkbox" style={{ width, height }} value={menu.styles.value} checked={checkValue.indexOf(menu.styles.value) !== -1} onChange={this.handleChange} />
    //                 </label>
    //               </foreignObject>}
    //              {!vertical &&
    //               <foreignObject x={x + space * i} y={y} width={width} height={height}>
    //                 <label>
    //                   {menu.styles.attrName}
    //                   <input type="checkbox" style={{ width, height }} value={menu.styles.value} checked={checkValue.indexOf(menu.styles.value) !== -1} onChange={this.handleChange} />
    //                 </label>
    //               </foreignObject>}
    //            </g>
    //          )
    //        }
    //        )}
    //     </g>
    //   )
  }
}

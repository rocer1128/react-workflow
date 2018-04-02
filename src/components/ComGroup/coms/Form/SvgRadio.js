import React, { Component, PropTypes } from "react";

export default class SvgRadio extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    space: PropTypes.number,
    vertical: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.any,
    hidden: PropTypes.bool,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    hidden: false,
    value: "",
    space: 20,
    vertical: false,
    options: [],
    refHandler: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      radioValue: this.props.value,
      value: this.props.value,
    };
  }
  getValue = () => this.state.radioValue;

  handleChange = (value, e) => {
    this.setState({
      radioValue: e.target.value,
      value: "",
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      radioValue: nextProps.value,
      value: nextProps.value,
    });
  }

  render() {
    const { x, y, width, height, value, options, cursor, vertical, space, hidden, refHandler } = this.props;

    let attrName = "";
    return (
      <g {...refHandler}>
        {options.map((option, i) => {
          let checked = false;
          const key = Object.keys(option);
          if (this.state.value === option[key]) {
            checked = true;
          } else {
            checked = this.state.radioValue === option[key];
          }
          if (!hidden) {
            attrName = key[0];
          }
          return (
            <g key={i}>
              {vertical && (
                <foreignObject x={x} y={y + space * i} width={width} height={height}>
                  <label>
                    {attrName}
                    <input type="radio" style={{ width, height }} value={option[key]} checked={checked} onChange={this.handleChange.bind(this, value)} />
                  </label>
                </foreignObject>
              )}
              {!vertical && (
                <foreignObject x={x + space * i} y={y} width={width} height={height}>
                  <label>
                    {attrName}
                    <input type="radio" style={{ width, height }} value={option[key]} checked={checked} onChange={this.handleChange.bind(this, value)} />
                  </label>
                </foreignObject>
              )}
            </g>
          );
        })}
      </g>
    );
  }
}

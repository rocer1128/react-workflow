import React, { Component, PropTypes } from "react";

export default class SvgSelect extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cursor: PropTypes.string.isRequired,
    options: PropTypes.array,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    options: [],
    refHandler: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      area: this.props.value,
    };
  }

  getValue = () => this.state.area;

  handleChange = (e) => {
    this.setState({
      area: e.target.value,
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      area: nextProps.value,
    });
  }

  render() {
    const { x, y, width, value, options, height, cursor, vertical, space, refHandler } = this.props;

    const { area } = this.state;
    return (
      <g {...refHandler}>
        <foreignObject x={x} y={y} width={width} height={height}>
          <select style={{ width, height }} value={area} onChange={this.handleChange}>
            {options.map((option, i) => {
              const key = Object.keys(option);
              return (
                <option style={{ width, height }} key={i} value={option[key]}>
                  {key[0]}
                </option>
              );
            })}
          </select>
        </foreignObject>
      </g>
    );
  }
}

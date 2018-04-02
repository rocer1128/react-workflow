import React, { Component, PropTypes } from "react";

export default class SvgInputText extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel"];

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    name: PropTypes.string,
    cursor: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    refHandler: PropTypes.object,
  };

  static defaultProps = {
    name: "input",
    cursor: "",
    defaultValue: "",
    placeholder: "placeholder",
    disabled: false,
    refHandler: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        inputValue: nextProps.defaultValue,
      });
    }
  }

  getValue = () => this.state.inputValue;

  changeInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { x, y, width, height, cursor, disabled, name, placeholder, refHandler } = this.props;
    return (
      <g {...refHandler} style={{ cursor }}>
        <foreignObject x={x} y={y} width={width} height={height}>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={this.state.inputValue}
            style={{ width, height, padding: "5px 10px", borderRadius: "5px", border: " 1px solid #ccc" }}
            onChange={e => this.changeInputValue(e.target.value)}
          />
        </foreignObject>
      </g>
    );
  }
}

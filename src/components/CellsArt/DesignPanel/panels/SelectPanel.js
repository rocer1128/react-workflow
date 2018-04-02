import React, { Component, PropTypes } from "react";
import Radium from "radium";
import style from "./styles";

class SelectPanel extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({
      show: !this.state.show,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <button style={{ marginLeft: "5px" }} onClick={this.toggleVisibility}>
          {this.props.name}
        </button>
        {this.state.show ? <div style={[style.div]}>
                             {this.props.children}
                           </div> : null}
      </div>
      );
  }
}

export default Radium(SelectPanel);

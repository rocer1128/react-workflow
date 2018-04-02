import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import Test from "../components/Test";
import Oscilloscope from "../components/Oscilloscope";


const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps, mapDispatchToProps)(Oscilloscope);

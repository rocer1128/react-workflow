import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sign } from "../modules/repair";
import Repair from "../components/Repair";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sign,
    },
    dispatch,
  );
}

const mapStateToProps = state => ({
  repair: state.repair,
  auth: state.home,
});

export default connect(mapStateToProps, mapDispatchToProps)(Repair);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/stoppage";
import Stoppage from "../components/Stoppage";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchInfo,
      submitInfo,
      submitFinish,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  stoppage: state.stoppage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Stoppage);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish, submitWrong } from "../modules/message";
import Message from "../components/Message";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchInfo,
      submitInfo,
      submitFinish,
      submitWrong,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);

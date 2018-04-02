import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo, submitInfo, submitFinish } from "../modules/confirmdeviceInfo";
import ConfirmDeviceInfo from "../components/ConfirmDeviceInfo";

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
  confirmdeviceInfo: state.confirmdeviceInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeviceInfo);

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchInfo } from "../modules/deviceinfo";
import DeviceInfo from "../components/DeviceInfo";

const mapDispatchToProps = dispatch => bindActionCreators({
  searchInfo,
}, dispatch);

const mapStateToProps = state => ({
  deviceinfo: state.deviceinfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);

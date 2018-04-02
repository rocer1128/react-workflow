import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, logout, wechatLogin, loginFinish, QLogin } from "../modules/auth";
// import { wechatConnect } from "../../RepairLib/modules/repairlibrary";

import Home from "../components/Home";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
    logout,
    loginFinish,
    wechatLogin,
    QLogin,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);

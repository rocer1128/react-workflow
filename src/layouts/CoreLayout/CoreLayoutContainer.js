import { connect } from "react-redux";
import CoreLayout from "./CoreLayout";
import { logout } from "../../routes/Home/modules/auth";
import { clearCurrentObject } from "../../routes/Workbench/modules/workbench";

function mapStateToProps(state) {
  return {
    auth: state.home,
    workbench: state.workbench,
  };
}

const mapDispatchToProps = {
  logout,
  clearCurrentObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);

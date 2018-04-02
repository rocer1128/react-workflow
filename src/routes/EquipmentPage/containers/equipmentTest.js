import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EquipmentTest from "../components/Test";

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentTest);

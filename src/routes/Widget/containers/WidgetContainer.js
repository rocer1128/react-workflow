import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addWidget, deleteWidget, editWidget, searchWidget, getWidget, openWidget, operationFinish } from "../modules/widget";

import Widget from "../components/Widget";

const mapDispatchToProps = dispatch => bindActionCreators({
  addWidget,
  deleteWidget,
  editWidget,
  searchWidget,
  getWidget,
  openWidget,
  operationFinish,
}, dispatch);

const mapStateToProps = state => ({
  auth: state.home,
  widget: state.widget,
});

export default connect(mapStateToProps, mapDispatchToProps)(Widget);

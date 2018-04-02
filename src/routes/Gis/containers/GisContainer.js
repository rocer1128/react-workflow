import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initGisInfo, initProjectList, createGisInfo, delGisInfo, groupMarkers, setPosition, setOptions, searchPages, searchPageIds } from "../modules/gis";
import Gis from "../components/Gis";

const mapDispatchToProps = dispatch => bindActionCreators({
  initGisInfo,
  initProjectList,
  createGisInfo,
  delGisInfo,
  groupMarkers,
  setPosition,
  setOptions,
  searchPages,
  searchPageIds,
}, dispatch);

const mapStateToProps = state => ({
  auth: state.home.user,
  gis: state.gis,
});


export default connect(mapStateToProps, mapDispatchToProps)(Gis);

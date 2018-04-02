import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onloadDataSource, deleteDataSource, uploadDataSource, saveDataSource, onloadDataPoint, deleteDataPoint, uploadDataPoint, saveDataPoint, onloadDataSourcePoint, importDataSource, removeDataSource } from "../modules/dataSource";

import DataSource from "../components/DataSource";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onloadDataSource,
    deleteDataSource,
    uploadDataSource,
    saveDataSource,
    onloadDataPoint,
    deleteDataPoint,
    uploadDataPoint,
    saveDataPoint,
    onloadDataSourcePoint,
    importDataSource,
    removeDataSource,
  }, dispatch);
}

// const from = window.config.from;
// const id = window.config.projectId;
const mapStateToProps = state => ({
  auth: state.home,
  dataSource: state.dataSource,
  dataPoint: state.dataPoint,
// location: {
//   query: {
//     id: 1,
//     from: "datasource",
//   } 
// },
/*location: {
  query: {
    id: window.config.projectId,
    from: window.config.from,
  }
}*/
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSource);

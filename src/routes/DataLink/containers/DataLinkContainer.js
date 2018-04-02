import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onloadDataLink, deleteDataLink, uploadDataLink, saveDataLink, onloadDataSource } from "../modules/dataLink";
import DataLink from "../components/DataLink";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onloadDataLink,
    deleteDataLink,
    uploadDataLink,
    saveDataLink,
    onloadDataSource,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home,
  dataLink: state.dataLink,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataLink);

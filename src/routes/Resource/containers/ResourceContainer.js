import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchResource, deleteResource, uploadResource, searchResourceByName } from "../modules/resource";
import Resource from "../components/Resource";

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchResource,
    deleteResource,
    uploadResource,
    searchResourceByName,
  }, dispatch);
}

const mapStateToProps = state => ({
  auth: state.home,
  resource: state.resource,
});

export default connect(mapStateToProps, mapDispatchToProps)(Resource);

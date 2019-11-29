import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  asyncActions as jamsActions,
  getJams
} from "../../redux/modules/entities/jams";
import { getAuth } from "../../redux/modules/local/auth";
import CreateJamForm from "../../components/Forms/CreateJamForm";

function mapStateToProps(state) {
  return {
    auth: getAuth(state),
    jams: getJams(state)
  };
}

export default connect(mapStateToProps, {
  push,
  createJam: jamsActions.createJam
})(CreateJamForm);

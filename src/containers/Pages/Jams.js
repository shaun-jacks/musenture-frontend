import { connect } from "react-redux";
import { getAuth } from "../../redux/modules/local/auth";
import { getJams } from "../../redux/modules/entities/jams";
import { getUsers } from "../../redux/modules/entities/users";
import { asyncActions as jamsActions } from "../../redux/modules/entities/jams";
import Jams from "../../components/Pages/Jams";

function mapStateToProps(state) {
  return {
    auth: getAuth(state),
    jams: getJams(state)
  };
}

export default connect(mapStateToProps, {
  fetchJamsByUserId: jamsActions.fetchJamsByUserId,
  fetchJams: jamsActions.fetchJams
})(Jams);

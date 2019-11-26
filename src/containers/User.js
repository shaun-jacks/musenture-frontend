import { connect } from "react-redux";
import { getAuth } from "../redux/modules/local/auth";
import { getUserById } from "../redux/modules/entities/users";
import {
  getFollowersByUserId,
  getFollowingByUserId
} from "../redux/modules/entities/usersFollowers";
import {
  getJamsByUserId,
  getJamsUserIsGoing
} from "../redux/modules/entities/jams";

import { asyncActions as jamsActions } from "../redux/modules/entities/jams";
import User from "../components/User";

function mapStateToProps(state, { match }) {
  const { userId } = match.params;
  const auth = getAuth(state);
  return {
    auth,
    followers: getFollowersByUserId(userId, state),
    following: getFollowingByUserId(userId, state),
    user: getUserById(userId, state),
    jamsGoing: getJamsUserIsGoing(userId, state)
  };
}

export default connect(mapStateToProps, {
  fetchJamsByUserId: jamsActions.fetchJamsByUserId
})(User);

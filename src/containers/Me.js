import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import { getAuth } from "../redux/modules/local/auth";
import { getUserById } from "../redux/modules/entities/users";
import {
  getFollowersByUserId,
  getFollowingByUserId
} from "../redux/modules/entities/usersFollowers";
import Me from "../components/Me";

function mapStateToProps(state) {
  const auth = getAuth(state);
  return {
    auth,
    followers: getFollowersByUserId(auth.id, state),
    following: getFollowingByUserId(auth.id, state),
    user: getUserById(auth.id, state)
  };
}

export default connect(mapStateToProps, {
  // showMeModal,
  // closeMeModal,
  // showEditMeModal,
  // closeEditMeModal,
  logoutUser
  // push
})(Me);

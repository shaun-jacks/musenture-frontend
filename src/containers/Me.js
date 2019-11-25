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
  const authId = getAuth(state).id;
  return {
    auth: getAuth(state),
    followers: getFollowersByUserId(authId, state),
    following: getFollowingByUserId(authId, state),
    user: getUserById(authId, state)
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

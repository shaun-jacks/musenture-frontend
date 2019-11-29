import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getAuth, actions } from "../../redux/modules/local/auth";
import { getUserById } from "../../redux/modules/entities/users";
import {
  getFollowersByUserId,
  getFollowingByUserId
} from "../../redux/modules/entities/usersFollowers";
import { getJamsUserIsGoing } from "../../redux/modules/entities/jams";
import Me from "../../components/Pages/Me";

function mapStateToProps(state) {
  const auth = getAuth(state);
  return {
    auth,
    followers: getFollowersByUserId(auth.id, state),
    following: getFollowingByUserId(auth.id, state),
    user: getUserById(auth.id, state),
    jamsGoing: getJamsUserIsGoing(auth.id, state)
  };
}

export default connect(mapStateToProps, {
  logout: actions.logout,
  push
})(Me);

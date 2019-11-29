import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getAuth } from "../../redux/modules/local/auth";
import {
  getUsersList,
  asyncActions as userActions
} from "../../redux/modules/entities/users";
import Users from "../../components/Pages/Users";

function mapStateToProps(state) {
  return {
    auth: getAuth(state),
    users: getUsersList(state)
  };
}

export default connect(mapStateToProps, {
  fetchUsers: userActions.fetchUsers,
  push
})(Users);

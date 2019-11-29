import { push } from "connected-react-router";
import { connect } from "react-redux";
import { getUsers } from "../../redux/modules/entities/users";
import { asyncActions } from "../../redux/modules/entities/jams";
import { getAuth } from "../../redux/modules/local/auth";
import Jam from "../../components/Jams/Jam";

function mapStateToProps(state, ownProps) {
  const jam = ownProps.jam;
  const users = getUsers(state);
  const auth = getAuth(state);
  const going = jam.usersGoing.some(id => id === auth.id);
  return {
    auth,
    users,
    going
  };
}

export default connect(mapStateToProps, {
  push,
  joinJam: asyncActions.joinJam
})(Jam);

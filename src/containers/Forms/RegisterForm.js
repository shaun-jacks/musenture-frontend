import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getAuth, asyncActions } from "../../redux/modules/local/auth";
import RegisterForm from "../../components/Forms/RegisterForm";

function mapStateToProps(state) {
  return {
    auth: getAuth(state)
  };
}

export default connect(mapStateToProps, {
  push,
  registerUser: asyncActions.registerUser
})(RegisterForm);
